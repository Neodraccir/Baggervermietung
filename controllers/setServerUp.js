module.exports = (app)=>{

    const   express = require('express'),
            favicon = require('serve-favicon'),
            appRoot = require('app-root-path');

    app .use(express.json());
    app .use(favicon(`${appRoot}/public/favicon.ico`));

} 