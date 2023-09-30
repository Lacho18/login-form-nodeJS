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
        userName : username,
        passWord : password
    };

    if(await CheckForExistance(username, password) == false) {
        userDB.users.push(newUser);
        await fsPromises.writeFile(path.join(__dirname, "..", "data", "users.json"), JSON.stringify(userDB.users));
    }
    else {
        console.log('User with these username and password already exists');
    }
   
}

const CheckForExistance = async (username, password) => {
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

module.exports = {AddUser, CheckForExistance};