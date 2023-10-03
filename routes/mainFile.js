const express = require('express');
const router = express.Router();
const path = require('path');
const functions = require('../controllers/usersLoginFunctions');

router.get("/" , (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'htmlDocs', 'index.html'));
});

router.get("/about(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'htmlDocs', 'about.html'));
});

router.post('/submit', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let addingProcess = await functions.AddUser(username, password);
    const response = {
        message : addingProcess
    }

    if(addingProcess === "success") {
        res.sendFile(path.join(__dirname, '..', 'htmlDocs', 'index.html'));
    }
    else {
        console.log("Here!");
        res.render('submitSection', {response});
    }
});

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    check(res, username, password);
});

router.get('/forgot', (req, res) => {
    res.render('newPassword', {});
});

router.post('/newPassword', (req, res) => {
    let currentUsername = req.body.usernameInput;
    let newPassword = req.body.newPassword;
    let confirmedPassword = req.body.confirmPassword;

    if(functions.checkForUserExistance(currentUsername)) {
        if(newPassword === confirmedPassword) {
            functions.changePassword(currentUsername, newPassword);
        }
    }
});

async function check(res, user, password) {
    if(await functions.CheckForExistance(user, password, res)) {
        const username = {usr : user};
        res.render('Welcome', {username});
    }
    else {
        res.send(`User not found`);
    }
}

module.exports = router;