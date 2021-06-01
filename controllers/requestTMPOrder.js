module.exports = (app)=>{


    const   appRoot= require('app-root-path');

    app.post('/requestTMPOrder',(req, res)=>{

        console.log("#rTMPO: temporary order requested...")
        let user_id  = req.body.user_id;
        delete require.cache[`${appRoot}/db/tmp/${user_id}.json`];
        let tmp_order = require(`${appRoot}/db/tmp/${user_id}.json`);

        console.log(`#rTMPO: sending >>> ${user_id}.json`)

        res.json(tmp_order)

    })


}