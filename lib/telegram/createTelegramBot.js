module.exports = (token)=>{

    process.env.NTBA_FIX_319 = 1;


    let   TelegramBot         = require('node-telegram-bot-api');


    return new TelegramBot(token, {polling:true})

}