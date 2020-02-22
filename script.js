// store html button element in variable
var generateBtnEl = document.querySelector("#generateBtn");

// store html checkbox elements in variable
var checkboxesEl = document.querySelectorAll(".form-check-input");

// store html textarea in variable
var passwordOutEl = document.querySelector("passwordOut");

// store html password length element in variable
var passwordLengthEl = document.querySelector("#passwordLength");
var passwordLength = passwordLengthEl.firstElementChild.textContent;


/* function to display generated password into textarea */
function writePassword() {
    
    event.preventDefault();

    var passwordText = document.querySelector("#passwordOut");

    // generate password
    var password = generatePassword();

    // display output 
    if (password !== false) {
        passwordText.value = password;
    } else {
        passwordText.value = "";
    }
}

/* function to generate random password based on user-selected criteria */
function generatePassword() {

    /* LOCAL VARIABLES */
    var password = "";
    var criteriaMet = false;
    
    // nested array of possible characters
    var possibleChars = 
        [
            ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
            ["abcdefghijklmnopqrstuvwxyz"],
            ["0123456789"],
            ["!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]
        ];     

    // will contain all chosen characters
    var chosenChars = "";      

    // get password length
    var passwordLength = 9;

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

    console.log("before function");
    
    // exit functoin if no checkboxes are checked
    if (criteriaMet === false) {
        
        console.log("inside false");
        // run function to make user aware
        displayValidity(criteriaMet);

        return false;
    } else {
        console.log("inside true");
        displayValidity(criteriaMet);
    }
    
    // generate the password
    for (var i = 0; i < passwordLength; i++) {

        var randomInt = Math.floor(Math.random() * chosenChars.length);
        var randomChar = chosenChars[randomInt];

        password += randomChar;
    }

    return password;
}

// function sets length of password
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

// add event listener to generate button
generateBtnEl.addEventListener("click", writePassword);

// add event listener to password length options
passwordLengthEl.addEventListener("change", setPasswordLength);