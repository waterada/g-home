'use strict';

const express = require('express');
const router = express.Router();
const { ApiAiApp } = require('actions-on-google');

router.get('/g-home', function (request, response) {
    const app = new ApiAiApp({ request, response });
    const actionMap = new Map();
    actionMap.set('input.open.curtain', app => app.ask(response, "ok."));
    actionMap.set('input.close.curtain', app => app.ask(response, "ok."));
    actionMap.set('input.turn.on.light', app => app.ask(response, "ok."));
    actionMap.set('input.turn.off.light', app => app.ask(response, "ok."));
    app.handleRequest(actionMap);
});

module.exports = router;