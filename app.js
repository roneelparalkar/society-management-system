const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
const svgCaptcha = require("svg-captcha");
const session = require('express-session')


app.use(session({ secret: 'test' }));

app.get('/getCaptcha', (req, res) => {
    const captcha = svgCaptcha.create();
    // req.session = {};    
    // res.type('html')
    // res.send(captcha.data)
    // res.json(captcha.data);
    req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});

app.get('/login', (req, res) => {
    console.log(req.session)
    let status = 'Invalid Username or Password';
    let menus = [];
    if (req.query.username === 'admin' && req.query.password === 'admin') {
        status = 'Success';
        menus = [{ id: '123', displayName: 'Dashboard', subMenu: [{ id: '456', displayName: 'Secretary Dashboard' }] }]
    }
    const respObj = {
        username: req.query.username,
        password: req.query.password,
        status,
        menuMaster: menus
    }
    return res.json(respObj)
});

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
});