<?php 

require_once 'db_connect.php';

//if form is submitted
if($_POST) {	

	$validator = array('success' => false, 'messages' => array());

     
	$name = $_POST['name'];
	$address = $_POST['address'];
	$contact = $_POST['contact'];
	$item = $_POST['item'];
	$price = $_POST['price'];
	$active = $_POST['active'];

	$sql = "INSERT INTO members (name, address, contact, item, price,  active) VALUES ('$name', '$address', '$contact', '$item', '$price', '$active')";
	$query = $connect->query($sql);

	if($query === TRUE) {			
		$validator['success'] = true;
		$validator['messages'] = "Successfully Added";		
	} else {		
		$validator['success'] = false;
		$validator['messages'] = "Error while adding the member information";
	}

	// close the database connection
	$connect->close();

	echo json_encode($validator);

}