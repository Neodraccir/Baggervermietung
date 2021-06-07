module.exports = (app)=>{

    const   appRoot     = require('app-root-path'),
            mapsAPIData = require(`${appRoot}/config/mapsAPIData.json`);


app.get('/getGMapsKey', function (req, res) {
    res.json(mapsAPIData);
});

}