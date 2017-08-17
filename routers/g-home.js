'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/g-home', function (req, res) {
    let action = req.body.result.action;
    let path = __dirname + '/../public/data.json';
    let data = JSON.parse(fs.readFileSync(path));
    switch (action) {
        case 'input.open.curtain': data.curtain = 1; break;
        case 'input.close.curtain': data.curtain = 0; break;
        case 'input.turn.on.light': data.light = 1; break;
        case 'input.turn.off.light': data.light = 0; break;
        default:
            console.log(`Unexpected action: [${action}] / body: ${JSON.stringify(req.body)}`);
    }
    fs.writeFileSync(path, JSON.stringify(data));
    res.json({
        result: 'ok',
        data,
    });
});

module.exports = router;