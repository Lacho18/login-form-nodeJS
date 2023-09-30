let loginSection = document.getElementById('Loginform');
let newAccountSection = document.getElementById('newAccount');
let newAcountButton = document.getElementById('newAccountButton');
let submitButton = document.getElementById('submitButton');
let submitButtonLoginForm = document.getElementById('submitButtonLoginForm');

let userNameInput = document.getElementById("username");
let passWordInput = document.getElementById("password");
let labelHint = document.getElementById('passwordHint');

newAccountSection.style.display = 'none';
labelHint.style.display = 'none';

newAcountButton.addEventListener('click', () => {
    newAccountSection.style.display = 'inline';
    loginSection.style.display = 'none';
});

submitButton.addEventListener('click', () => {
    newAccountSection.style.display = 'none';
    loginSection.style.display = 'inline';
});

submitButtonLoginForm.disabled = true;

function checkForNullValues(userValue, passwordValue) {
    console.log(userValue);
    console.log(passwordValue);

    if((userValue !== null && passwordValue !== null) && (userValue !== "" && passwordValue !== "")) {
        if(passwordValue.length >= 7) {
            submitButtonLoginForm.disabled = false;
        }
    }
    else {
        submitButtonLoginForm.disabled = true;
    }
}

userNameInput.addEventListener('input', () => {
    checkForNullValues(userNameInput.value, passWordInput.value);
});

passWordInput.addEventListener('input', () => {
    labelHint.style.display = 'block';
    checkForNullValues(userNameInput.value, passWordInput.value);
});


