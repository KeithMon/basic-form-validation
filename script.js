// Set the focus to the Name input field on page load:
function onPageLoad(focusId) {

	// If the browser is Internet Explorer use explicit instructions instead of the HTML placholder attribute:
	var isMSIE = /*@cc_on!@*/0;
	if (isMSIE) {
		placeholder('textField', 'textFieldResult');
		placeholder('email', 'emailResult');
		document.getElementById("h1").focus();
	} else {
		document.getElementById(focusId).focus();
	}
}

// Given an element id, grab the placeholder text and put it into the result paragraph (for Internet Explorer fix).
function placeholder(input, result) {
	var text = document.getElementById(input).getAttribute('placeholder');
	var result = document.getElementById(result);
	result.innerHTML = text;
	result.className = 'instructionGray';
}

// Cancel page refresh on button submit (this is a work-around so the user can press ENTER to submit their guess):
function cancelDefaultAction(e) {
 var evt = e ? e:window.event;
 if (evt.preventDefault) evt.preventDefault();
 evt.returnValue = false;
 return false;
}

function notBlank(input, result) {
	var inputField = document.getElementById(input);
	var resultField = document.getElementById(result);
	var placeholder = inputField.getAttribute('placeholder');

	if( inputField.value ) {
		resultField.innerHTML = "";
		return true;
	} else {
		resultField.innerHTML = placeholder + " cannot be blank";
		resultField.className = "error";
		return false;
	}
}

function removeError(result) {
	document.getElementById(result).innerHTML = "";
}

function validateEmail(input, result) {
	var input = document.getElementById(input);
	var result = document.getElementById(result);
	var placeholder = input.getAttribute('placeholder');
	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	// regex from: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript

	if ( input.value ) {
		var emailValid = regex.test(input.value);
		if ( emailValid ) {
			result.innerHTML = "";
			return true; 
		} else {
			result.innerHTML = "Invalid Email Address";
			result.className = "error";
			return false;
		}
	} else {
		result.innerHTML = placeholder + " cannot be blank";
		result.className = "error";
		return false;
	}	
}

function formSubmit() {
	var textFieldAnswer = notBlank('textField', 'textFieldResult');
	var emailValid = validateEmail('email', 'emailResult');
	
	if ( textFieldAnswer && emailValid) {
		// Submit form. This is where we would submit the data to a database, PHP file, etc.
		alert('Woohoo! \n\nDo you feel validated?');
	}
}

// Future project: setup some code that is easily transportable to other websites. Declare text field IDs that cannot be blank inside of an array at the top of the code. The code should than use that array and loop through the elements to provide feedback.