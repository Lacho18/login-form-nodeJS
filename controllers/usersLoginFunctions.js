const { json } = require('express');
const path = require('path');
const fsPromises = require('fs').promises;

const userDB = {
    users : require(path.join(__dirname, "..", "data", "users.json")),
    setUser : function (data) {this.users, data}
}

const AddUser = async (username, password) => {
    if(username === "" || username === null) return;
    if(password === "" || password === null) return;

    let newPasswordCrypt = criptingPassword(password);

    let newUser = {
        userName : username,
        passWord : newPasswordCrypt
    };

    //if(await CheckForExistance(username, password) == false) {
        if(await checkForUserExistance(username) == true) {
            userDB.users.push(newUser);
            await fsPromises.writeFile(path.join(__dirname, "..", "data", "users.json"), JSON.stringify(userDB.users));

            //The new user is succsesfuly added to tha data base
            return "success";
        }
    //}
    else {
        //console.log('User with these username and password already exists');
        return `User with username - ${username} already exist. Please enter different username!`;
    }
}

const CheckForExistance = async (username, password, res) => {
    const userFound = userDB.users.find(indexValue => {
        if(indexValue.userName === username && indexValue.passWord === password) {
            return true;
        }
        return false;
    });

    //console.log(userFound);
    if(!userFound) return false;
    console.log(userFound);
    return true;
}

const checkForUserExistance = async (username) => {
    let lookingForUser = userDB.users.find(indexValue => {return indexValue.userName === username});

    if(!lookingForUser) {
        //console.log(lookingForUser);
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

module.exports = {AddUser, CheckForExistance};