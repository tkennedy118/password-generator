// Assignment Code
var generateBtn = document.querySelector("#generateBtn");

// Write password to the #password input
function writePassword() {
    // var password = generatePassword();
    var password = "Hello";

    var passwordText = document.querySelector("#passwordOut");

    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);