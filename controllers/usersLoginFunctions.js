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

    let newUser = {
        id : userDB.users[userDB.users.length - 1].id + 1 || 1,
        userName : username,
        passWord : password
    };

    userDB.users.push(newUser);
    await fsPromises.writeFile(path.join(__dirname, "..", "data", "users.json"), JSON.stringify(userDB.users))
}

const CheckForExistance = async (username, password) => {
    const userFound = userDB.users.find(indexValue => {indexValue.userName === username && indexValue.passWord === password});

    if(!userFound) return false;
    console.log(userFound);
    return true;
}

module.exports = {AddUser, CheckForExistance};