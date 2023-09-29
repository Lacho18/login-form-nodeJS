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

router.post('/submit', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    res.send(`Data resieved : username ${username} and password ${password}`);
    functions.AddUser(username, password);
});

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if(functions.CheckForExistance(username, password)) {
        res.send(`This user exists`);
    }
    else {
        res.send(`User not found`);
    }
});

module.exports = router;