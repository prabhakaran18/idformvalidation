var value;
function adddata() {
    console.log('submit button clicked');
    // Check if user has entered all required data
    // If not show error message
    // Else post it
    if (validateFirstName()) {
        $('#errForFirstName').hide();
        if (validateFullName()) {
            $('#errForFullName').hide();
            if (validateDOE()) {
                $('#errForDOE').hide();
                if (validatebutton()) {
                    $('#errForButton').hide();
                    if (validateemail()) {
                        $('#errForemail').hide();
                        if (validatemobile()) {
                            $('#errFormobile').hide();
                            postData();
                        }
                        else {
                            displayErrorMessageForMobile();
                        }
                    }
                    else {
                        displayErrorMessageForemail();
                    }
                }
                else {
                    displayErrorMessageForButton();
                }
            }
            else {
                // Display error message for DOB
                displayErrorMessageForDOE();
            }
        }
        else {
            // Display error message for full Name
            displayErrorMessageForFullName();
        }
    } else {
        // Display error message for first Name
        displayErrorMessageForFirstName();
    }

}

function displayErrorMessageForFirstName() {
    $('#errForFirstName').show();
}

function displayErrorMessageForFullName() {
    $('#errForFullName').show();
}
function displayErrorMessageForDOE() {
    $('#errForDOE').show();
}
function displayErrorMessageForButton() {
    $('#errForButton').show();
}
function displayErrorMessageForemail() {
    $('#errForemail').show();
}
function displayErrorMessageForMobile() {
    $('#errFormobile').show();
}
function validateFirstName() {
    const firstName = $('#firstname').val();

    if (firstName === '') {
        return false;
    }
    return true;
}

function validateFullName() {
    const fullName = $('#fullname').val();
    if (fullName === '') {
        return false;
    }
    return true;
}

function validateDOE() {
    const DOB = $('#DOE').val();
    var datetext = document.getElementById('DOE').value;
    var selectedDate = new Date(datetext);
    var now = new Date();
    if (selectedDate > now || !datetext ) {
        return false;
    }
    return true;
}
function validatebutton() {
    if ($('input[name=choice]:checked').length > 0) {

        var radios = document.getElementsByName("choice");

        for (var i = 0; i < radios.length; i++) {
            if (radios[i].type === 'radio' && radios[i].checked) {
                // get value, set checked flag or do whatever you need to
                value = radios[i].value;
            }
        }

        return true;
    }
    else {
        return false;
    }
}
function validateemail() {
    //const email = $('#email').val();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email').val())) {
        return true;
    }
    return false;
}
function validatemobile() {
    const mobile = $('#mobile').val();
    if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test($('#mobile').val())) {
        return true;
    }
    return false;
}
function postData() {
    const data = {
        firstName: $('#firstname').val(),
        fullName: $('#fullname').val(),
        DOB: $('#DOE').val(),
        vals: value,
        email: $('#email').val(),
        mobile:$('#mobile').val()
    };
    $.ajax({
        type: "POST",
        url: 'https://idformvalidation.firebaseio.com/.json',
        data: JSON.stringify(data),
        success: onPostSuccess,
        // dataType: dataType
    });
}

const onPostSuccess = (data) => {
    console.log('Posting to firebase success');
    console.log(data);
}

$('document').ready(() => {
    // Initialize
    $('.span-for-errors').hide();
});