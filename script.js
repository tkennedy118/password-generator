// store html button element in variable
var generateBtnEl = document.querySelector("#generateBtn");

// store html checkbox elements in variable
var checkboxesEl = document.querySelectorAll(".form-check-input");

// store html password length element in variable
var passwordLengthEl = document.querySelector("#inputNumChars");

// store html textarea in variable
var passwordOutEl = document.querySelector("passwordOut");

/* function to display generated password into textarea */
function writePassword() {
    
    event.preventDefault();

    // generate password
    var password = generatePassword();

    var passwordText = document.querySelector("#passwordOut");

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
    
    // exit functoin if no checkboxes are checked
    if (criteriaMet === false) {
        console.log("no checkboxes checked");
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

// add event listener to generate button
generateBtnEl.addEventListener("click", writePassword);

// add event listener to password length options
// passwordLengthEl.addEventListener("change", getPasswordLength(event));


