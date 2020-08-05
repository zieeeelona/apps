var passwordInput = document.getElementById("password");
var minimumCharsTick = document.getElementById("minimum-characters");
var uppercaseCharTick = document.getElementById("uppercase-character");
var numberCharTick = document.getElementById("number-character");
var specialCharTick = document.getElementById("special-character");
var valueInput = document.getElementById("value");

var lowerCaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperCaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "T", "D", "Y", "U", "V", "W", "X", "Y", "Z"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialCharacters = [" ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];

passwordInput.addEventListener("input", update);

var password;
var numberOfCharacters;
var numberOfTypes;
var strength;
var strengthArray;

function update() {
    password = passwordInput.value;
    numberOfCharacters = password.length;
    strengthArray = [false, false, false, false];
    strength = 0;
    charactersStrength = 0;

    if (numberOfCharacters == 0) {
        minimumCharsTick.innerText = "✗ Minimum 12 characters";
        uppercaseCharTick.innerText = "✗ Minimum 1 uppercase character";
        numberCharTick.innerText = "✗ Minimum 1 number";
        specialCharTick.innerText = "✗ Minimum 1 special character";
        uppercaseCharTick.style.color = "#999";
        minimumCharsTick.style.color = "#999";
        numberCharTick.style.color = "#999";
        specialCharTick.style.color = "#999";
    }

    var charactersStrength = numberOfCharacters / 2;
    if (charactersStrength >= 6) {
        charactersStrength = 6;
        minimumCharsTick.innerText = "✓ Minimum 12 characters";
        minimumCharsTick.style.color = "#000";
    } else {
        minimumCharsTick.innerText = "✗ Minimum 12 characters";
        minimumCharsTick.style.color = "#999";
    }
    strength = charactersStrength;

    for(var i = 0; i < password.length; i++) {
        if (strengthArray[0] == false) {
            if(lowerCaseLetters.includes(password[i])) {
                strengthArray[0] = true;
                strength++;
            }
        }
        if (strengthArray[1] == false) {
            if(upperCaseLetters.includes(password[i])) {
                strengthArray[1] = true;
                strength++;
                uppercaseCharTick.innerText = "✓ Minimum 1 uppercase character";
                uppercaseCharTick.style.color = "#000";
            } else {
                uppercaseCharTick.innerText = "✗ Minimum 1 uppercase character";
                uppercaseCharTick.style.color = "#999";
            }
        }
        if (strengthArray[2] == false) {
            if(numbers.includes(password[i])) {
                strengthArray[2] = true;
                strength++;
                numberCharTick.innerText = "✓ Minimum 1 number";
                numberCharTick.style.color = "#000";
            } else {
                numberCharTick.innerText = "✗ Minimum 1 number";
                numberCharTick.style.color = "#999";
            }
        }
        if (strengthArray[3] == false) {
            if(specialCharacters.includes(password[i])) {
                strengthArray[3] = true;
                strength++;
                specialCharTick.innerText = "✓ Minimum 1 special character";
                specialCharTick.style.color = "#000";
            } else {
                specialCharTick.innerText = "✗ Minimum 1 special character";
                specialCharTick.style.color = "#999";
            }
        }
    }

    if (strength >= 7.5) {
        valueInput.style.backgroundColor = "#72D51A";
    } else if(strength >= 5) {
        valueInput.style.backgroundColor = "#FFE338";
    } else if(strength >= 2.5) {
        valueInput.style.backgroundColor = "#F4BC1C";
    } else if(strength >= 0) {
        valueInput.style.backgroundColor = "red";
    }

    valueInput.style.width = strength * 10 + "%";
}