// store html button element in variable
var generateBtnEl = document.querySelector("#generateBtn");

// store html checkbox elements in variable
var checkboxesEl = document.querySelectorAll(".form-check-input");

// store html textarea in variable
var passwordOutEl = document.querySelector("passwordOut");

// store html password length element in variable
var passwordLengthEl = document.querySelector("#passwordLength");

// GLOBAL VARIABLES
var passwordLength = 0;
var MIN = 8;
var MAX = 128;


/* function to display generated password into textarea */
function writePassword() {
    
    event.preventDefault();

    var passwordText = document.querySelector("#passwordOut");

    // generate password
    var password = generatePassword();

    // clear current password value
    passwordText.value = "";

    // dispay output
    if (password !== false) {
        // local index for looping through interval
        var i = 0;

        var populatePassword = setInterval(function() {

            passwordText.value += password[i];
            i++;

            // exit interval if password length has been met
            if (i === password.length) {
                clearInterval(populatePassword);
            }
        }, 37);
    }
}

/* function to generate random password based on user-selected criteria */
function generatePassword() {

    /* LOCAL VARIABLES */
    var password = "";
    var criteriaMet = false;
    var chosenChars = "";           // will contain all chosen characters
    
    // nested array of possible characters
    var possibleChars = 
        [
            ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
            ["abcdefghijklmnopqrstuvwxyz"],
            ["0123456789"],
            ["!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]
        ];         

    // fill chosenChars array with selected character values
    for (var i = 0; i < possibleChars.length; i++) {

        // true if checkbox value is checked
        var isChecked = checkboxesEl[i].checked;
        
        if (isChecked) {

            for (var j = 0; j < possibleChars[i].length; j++) {
                chosenChars += possibleChars[i][j];
            }

            // criteria was met
            criteriaMet = true;
        } 
    }

    // display error message if criteria are not met, then exit funcion if they are not met
    displayValidity(criteriaMet);

    if (criteriaMet === false) {
        return false;
    }
    
    // generate the password
    for (var i = 0; i < passwordLength; i++) {

        var randomInt = Math.floor(Math.random() * chosenChars.length);
        var randomChar = chosenChars[randomInt];

        password += randomChar;
    }

    return password;
}

// function sets length of password, triggered when change event occurs on passwordLengthEl
function setPasswordLength(event) {

    var length = event.target.value;

    passwordLength = length;
}

// function to display if input was not valid
function displayValidity(criteriaMet) {

    // the div element containing invalid content, only to be dispayed if input is invalid
    var invalidTextEl = document.querySelector(".checkbox-invalid");

    // show if criteria not met, otherwise hide
    if (criteriaMet === false) {
        invalidTextEl.classList.remove("d-none");
    } else {
        invalidTextEl.classList.add("d-none");
    }
}

// function to add values to dropdown element
function populateOptions(min, max) {

    // exit function if min isn't less than max
    if (min > max) {
        return false
    } 

    // populate options from min value to max value
    for (var i = min; i <= max; i++) {

        // create option element
        var optionEl = document.createElement("option");

        optionEl.textContent = i.toString();
        passwordLengthEl.appendChild(optionEl);

        // make lowest value selected automatically
        if (i === min) {
            optionEl.classList.add("selected");
        }
    }

    // set password length
    passwordLength = passwordLengthEl.firstElementChild.textContent;
}

// add event listener to generate button element
generateBtnEl.addEventListener("click", writePassword);

// add event listener to password length element
passwordLengthEl.addEventListener("change", setPasswordLength);

// run code to populate options in dropdown
populateOptions(MIN, MAX);