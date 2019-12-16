const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
const svgCaptcha = require("svg-captcha")

app.get('/getCaptcha', (req, res) => {
    const captcha = svgCaptcha.create();
    res.json(captcha);
});

app.get('/login', (req, res) => {
    let status = 'Invalid Username or Password';
    if (req.query.username === 'admin' && req.query.password === 'admin') {
        status = 'Success';
    }
    const respObj = {
        username: req.query.username,
        password: req.query.password,
        status
    }
    return res.json(respObj)
});

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
});