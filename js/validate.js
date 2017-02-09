$.validate({
	form: 'form',
    errorMessagePosition: 'top', // Instead of 'element' which is default
	addValidClassOnAll: true,
	validateOnBlur: false,
	scrollToTopOnError: true, // Set this property to true if you have a long form
    onError: function() {
		$('.sideDiv').affix({
			offset: {
				top: function () {
					return ($("form .scouting-container").position().top);
				}
			}
		});
    },
    onSuccess: function() {
		finalSubmit();
		alert("Match Submitted!");
		return false; // Will stop the submission of the form since we don't have a form action
    }
});
