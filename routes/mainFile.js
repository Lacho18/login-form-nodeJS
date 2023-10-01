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
    //console.log(addingProcess);
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