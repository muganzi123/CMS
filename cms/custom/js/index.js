// global the manage memeber table 
var manageMemberTable;

$(document).ready(function() {
	manageMemberTable = $("#manageMemberTable").DataTable({
		"ajax": "php_action/retrieve.php",
		"order": []
	});

	$("#addMemberModalBtn").on('click', function() {
		// reset the form 
		$("#createMemberForm")[0].reset();
		// remove the error 
		$(".form-group").removeClass('has-error').removeClass('has-success');
		$(".text-danger").remove();
		// empty the message div
		$(".messages").html("");

		// submit form
		$("#createMemberForm").unbind('submit').bind('submit', function() {

			$(".text-danger").remove();

			var form = $(this);

			// validation
			var name = $("#name").val();
			var address = $("#address").val();
			var contact = $("#contact").val();
			var item = $("#item").val();
			var price = $("#price").val();
			var active = $("#active").val();

			if(name == "") {
				$("#name").closest('.form-group').addClass('has-error');
				$("#name").after('<p class="text-danger">The Name field is required</p>');
			} else {
				$("#name").closest('.form-group').removeClass('has-error');
				$("#name").closest('.form-group').addClass('has-success');				
			}

			if(address == "") {
				$("#address").closest('.form-group').addClass('has-error');
				$("#address").after('<p class="text-danger">The Address field is required</p>');
			} else {
				$("#address").closest('.form-group').removeClass('has-error');
				$("#address").closest('.form-group').addClass('has-success');				
			}

			if(contact == "") {
				$("#contact").closest('.form-group').addClass('has-error');
				$("#contact").after('<p class="text-danger">The Contact field is required</p>');
			} else {
				$("#contact").closest('.form-group').removeClass('has-error');
				$("#contact").closest('.form-group').addClass('has-success');				
			}
			if(item == "") {
				$("#item").closest('.form-group').addClass('has-error');
				$("#item").after('<p class="text-danger">The Contact field is required</p>');
			} else {
				$("#item").closest('.form-group').removeClass('has-error');
				$("#item").closest('.form-group').addClass('has-success');				
			}
			if(price == "") {
				$("#price").closest('.form-group').addClass('has-error');
				$("#price").after('<p class="text-danger">The Contact field is required</p>');
			} else {
				$("#price").closest('.form-group').removeClass('has-error');
				$("#price").closest('.form-group').addClass('has-success');				
			}

			if(active == "") {
				$("#active").closest('.form-group').addClass('has-error');
				$("#active").after('<p class="text-danger">The Active field is required</p>');
			} else {
				$("#active").closest('.form-group').removeClass('has-error');
				$("#active").closest('.form-group').addClass('has-success');				
			}

			if(name && address && contact && item && price && active) {
				//submi the form to server
				$.ajax({
					url : form.attr('action'),
					type : form.attr('method'),
					data : form.serialize(),
					dataType : 'json',
					success:function(response) {

						// remove the error 
						$(".form-group").removeClass('has-error').removeClass('has-success');

						if(response.success == true) {
							$(".messages").html('<div class="alert alert-success alert-dismissible" role="alert">'+
							  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
							  '<strong> <span class="glyphicon glyphicon-ok-sign"></span> </strong>'+response.messages+
							'</div>');

							// reset the form
							$("#createMemberForm")[0].reset();		

							// reload the datatables
							manageMemberTable.ajax.reload(null, false);
							// this function is built in function of datatables;

						} else {
							$(".messages").html('<div class="alert alert-warning alert-dismissible" role="alert">'+
							  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
							  '<strong> <span class="glyphicon glyphicon-exclamation-sign"></span> </strong>'+response.messages+
							'</div>');
						}  // /else
					} // success  
				}); // ajax subit 				
			} /// if


			return false;
		}); // /submit form for create member
	}); // /add modal

});

function removeMember(id = null) {
	if(id) {
		// click on remove button
		$("#removeBtn").unbind('click').bind('click', function() {
			$.ajax({
				url: 'php_action/remove.php',
				type: 'post',
				data: {member_id : id},
				dataType: 'json',
				success:function(response) {
					if(response.success == true) {						
						$(".removeMessages").html('<div class="alert alert-success alert-dismissible" role="alert">'+
							  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
							  '<strong> <span class="glyphicon glyphicon-ok-sign"></span> </strong>'+response.messages+
							'</div>');

						// refresh the table
						manageMemberTable.ajax.reload(null, false);

						// close the modal
						$("#removeMemberModal").modal('hide');

					} else {
						$(".removeMessages").html('<div class="alert alert-warning alert-dismissible" role="alert">'+
							  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
							  '<strong> <span class="glyphicon glyphicon-exclamation-sign"></span> </strong>'+response.messages+
							'</div>');
					}
				}
			});
		}); // click remove btn
	} else {
		alert('Error: Refresh the page again');
	}
}

function editMember(id = null) {
	if(id) {

		// remove the error 
		$(".form-group").removeClass('has-error').removeClass('has-success');
		$(".text-danger").remove();
		// empty the message div
		$(".edit-messages").html("");

		// remove the id
		$("#member_id").remove();

		// fetch the member data
		$.ajax({
			url: 'php_action/getSelectedMember.php',
			type: 'post',
			data: {member_id : id},
			dataType: 'json',
			success:function(response) {
				$("#editName").val(response.name);

				$("#editAddress").val(response.address);

				$("#editContact").val(response.contact);
				
				$("#editItems").val(response.item);

				$("#editPrice").val(response.price);

				$("#editActive").val(response.active);	

				// mmeber id 
				$(".editMemberModal").append('<input type="hidden" name="member_id" id="member_id" value="'+response.id+'"/>');

				// here update the member data
				$("#updateMemberForm").unbind('submit').bind('submit', function() {
					// remove error messages
					$(".text-danger").remove();

					var form = $(this);

					// validation
					var editName = $("#editName").val();
					var editAddress = $("#editAddress").val();
					var editContact = $("#editContact").val();
					var editItems = $("#editItems").val();
					var editPrice = $("#editPrice").val();
					var editActive = $("#editActive").val();

					if(editName == "") {
						$("#editName").closest('.form-group').addClass('has-error');
						$("#editName").after('<p class="text-danger">The Name field is required</p>');
					} else {
						$("#editName").closest('.form-group').removeClass('has-error');
						$("#editName").closest('.form-group').addClass('has-success');				
					}

					if(editAddress == "") {
						$("#editAddress").closest('.form-group').addClass('has-error');
						$("#editAddress").after('<p class="text-danger">The Address field is required</p>');
					} else {
						$("#editAddress").closest('.form-group').removeClass('has-error');
						$("#editAddress").closest('.form-group').addClass('has-success');				
					}

					if(editContact == "") {
						$("#editContact").closest('.form-group').addClass('has-error');
						$("#editContact").after('<p class="text-danger">The Contact field is required</p>');
					} else {
						$("#editContact").closest('.form-group').removeClass('has-error');
						$("#editContact").closest('.form-group').addClass('has-success');				
					}
					if(editItems == "") {
						$("#editItems").closest('.form-group').addClass('has-error');
						$("#editItems").after('<p class="text-danger">The Contact field is required</p>');
					} else {
						$("#editItems").closest('.form-group').removeClass('has-error');
						$("#editItems").closest('.form-group').addClass('has-success');				
					}
					if(editPrice == "") {
						$("#editPrice").closest('.form-group').addClass('has-error');
						$("#editPrice").after('<p class="text-danger">The Contact field is required</p>');
					} else {
						$("#editPrice").closest('.form-group').removeClass('has-error');
						$("#editPrice").closest('.form-group').addClass('has-success');				
					}

					if(editActive == "") {
						$("#editActive").closest('.form-group').addClass('has-error');
						$("#editActive").after('<p class="text-danger">The Active field is required</p>');
					} else {
						$("#editActive").closest('.form-group').removeClass('has-error');
						$("#editActive").closest('.form-group').addClass('has-success');				
					}

					if(editName && editAddress && editContact && editItems && editPrice && editActive) {
						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),
							dataType: 'json',
							success:function(response) {
								if(response.success == true) {
									$(".edit-messages").html('<div class="alert alert-success alert-dismissible" role="alert">'+
									  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
									  '<strong> <span class="glyphicon glyphicon-ok-sign"></span> </strong>'+response.messages+
									'</div>');

									// reload the datatables
									manageMemberTable.ajax.reload(null, false);
									// this function is built in function of datatables;

									// remove the error 
									$(".form-group").removeClass('has-success').removeClass('has-error');
									$(".text-danger").remove();
								} else {
									$(".edit-messages").html('<div class="alert alert-warning alert-dismissible" role="alert">'+
									  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
									  '<strong> <span class="glyphicon glyphicon-exclamation-sign"></span> </strong>'+response.messages+
									'</div>')
								}
							} // /success
						}); // /ajax
					} // /if

					return false;
				});

			} // /success
		}); // /fetch selected member info

	} else {
		alert("Error : Refresh the page again");
	}
}