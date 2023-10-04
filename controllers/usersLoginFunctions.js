const { json } = require('express');
const path = require('path');
const fsPromises = require('fs').promises;

const userDB = {
    users : require(path.join(__dirname, "..", "data", "users.json")),
    setUser : function (data) {this.users, data},
    deleteUser : function (userUsername) {this.users = this.users.filter(indexValue => {indexValue.userName !== userUsername})}
}

const AddUser = async (username, password) => {
    if(username === "" || username === null) return;
    if(password === "" || password === null) return;

    let newPasswordCrypt = criptingPassword(password);

    let newUser = {
        userName : username,
        passWord : newPasswordCrypt
    };

    let passwordResponse = goodPasswordCheck(password);
    let isPasswordValid = false;
    if(passwordResponse === "good") {
        isPasswordValid = true;
    }
    else {
        return passwordResponse;
    }

    if(await checkForUserExistance(username) == true && isPasswordValid) {
        userDB.users.push(newUser);
        await fsPromises.writeFile(path.join(__dirname, "..", "data", "users.json"), JSON.stringify(userDB.users));

        //The new user is succsesfuly added to tha data base
        return "success";
    }

    else {
        return `User with username - ${username} already exist. Please enter different username!`;
    }
}

const CheckForExistance = async (username, password, res) => {
    const validPassword = criptingPassword(password);
    const userFound = userDB.users.find(indexValue => {
        if(indexValue.userName === username && indexValue.passWord === validPassword) {
            return true;
        }
        return false;
    });

    if(!userFound) return false;
    console.log(userFound);
    return true;
}

const checkForUserExistance = async (username) => {
    let lookingForUser = userDB.users.find(indexValue => {return indexValue.userName === username});

    if(!lookingForUser) {
        return true;
    }
    return false;
}

const criptingPassword = (password) => {
    let cryptPassword = "";
    for(let i = 0; i < password.length; i++) {
        let byteCode = password.charCodeAt(i);
        let symbol = String.fromCharCode(byteCode * 3);
        cryptPassword += symbol;
    }

    return cryptPassword;
}

const goodPasswordCheck = (password) => {
    if(password.length < 7) {
        return "The password should be at least 7 symbols";
    }
    let symbolDigits = /[^0-9]/;
    if(!symbolDigits.test(password)) {
        return "Password that have only digits is not recommended";
    }
    let specialSymbol = "@";
    if(password.indexOf(specialSymbol) === -1) {
        return "Password is recommended to have symbol '@' in it";
    }

    return "good";
}

const changePassword = async (username, password) =>  {
    let usersOfDataArray = userDB.users;
    let user = usersOfDataArray.find(indexValue => indexValue.userName === username);
    //user.passWord = criptingPassword(password); //cpypting here

    usersOfDataArray = usersOfDataArray.filter(indexValue => indexValue.userName !== username);
    console.log(usersOfDataArray);
    await fsPromises.writeFile(path.join(__dirname, "..", "data", "users.json"), JSON.stringify(userDB.users));
}

module.exports = {AddUser, CheckForExistance, checkForUserExistance, changePassword};