const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/mainFile'));
app.use('/submit', require('./routes/submit'));

app.all('/*', (req, res) => {
    let data = fs.readFileSync('./htmlDocs/404file.html', 'utf-8');
    res.send(data);
    //res.sendFile(path.join(__dirname, 'htmlDocs', '404file.html'));
    res.end();
})

app.listen(PORT, () => {console.log("Server running on port " + PORT);})