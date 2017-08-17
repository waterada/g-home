'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/g-home', function (req, res) {
    let curtain = req.query.c;
    let light   = req.query.l;
    let path = __dirname + '/../public/data.json';
    console.log(path);
    let current = JSON.parse(fs.readFileSync(path));
    if (curtain) current.curtain = (curtain === '1' ? 1 : 0);
    if (light) current.light = (light === '1' ? 1 : 0);
    fs.writeFileSync(path, JSON.stringify(current));
    res.json({
        result: 'ok',
        current,
    });
});

module.exports = router;