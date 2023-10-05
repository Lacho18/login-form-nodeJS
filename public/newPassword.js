let inputForUsername = document.getElementById("inputForUsername");
let inputForNewPassword = document.getElementById("inputForNewPassword");
let inputForConfirmPassword = document.getElementById("inputForConfirmPassword");
let submitButtonNewPassword = document.getElementById("submitButtonNewPassword");

let paragrafOfError = document.getElementById("errorMessage");

let form = document.getElementById("newPasswordForm");

window.onload = () => {
    submitButtonNewPassword.disabled = true;
}

function validInfo(user, password, confirm) {
    if(user !== "" && password !== "" && confirm !== "") {
        submitButtonNewPassword.disabled = false;
    }
}

function changeHandler() {
    validInfo(inputForUsername.value, inputForNewPassword.value, inputForConfirmPassword.value);
}

function validDataCheck() {
    if(inputForNewPassword.value.length < 7) {
        return "This password is too small. It should be at least 7 symbols!";
    }

    let symbolDigits = /[^0-9]/;
    if(!symbolDigits.test(inputForNewPassword.value)) {
        return "Password that have only digits is not recommended!";
    }

    if(inputForNewPassword.value.indexOf('@') === -1) {
        return "The new password should have the '@' symbol in it!";
    }

    return "success";
}

inputForUsername.addEventListener("input", changeHandler);
inputForNewPassword.addEventListener("input", changeHandler);
inputForConfirmPassword.addEventListener("input", changeHandler);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let errorMessage = validDataCheck();
    if(errorMessage === "success") {
        form.submit();
    }
    else {
        paragrafOfError.innerHTML = `Error : ${errorMessage}`;
    }
})