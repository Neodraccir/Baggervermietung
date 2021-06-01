module.exports = (app) =>{

    const   express     = require('express'),
            appRoot = require('app-root-path');

    app.use('/s/', express.static(`${appRoot}/public/css/`));
    app.use('/sc/', express.static(`${appRoot}/public/js/`));
    app.use('/bg', express.static(`${appRoot}/public/img/background-image.jpg`));
    app.use('/loader', express.static(`${appRoot}/public/img/loader.gif`));
    app.use('/index', express.static(`${appRoot}/public/js/index.js`));
    app.use('/hw', express.static(`${appRoot}/public/js/helloWorld.js`));
    app.use('/formContent', express.static(`${appRoot}/config/public/formContent.json`));

}
