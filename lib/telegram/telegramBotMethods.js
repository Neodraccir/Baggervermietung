const   appRoot             = require('app-root-path'),
        createTelegramBot   = require(`${appRoot}/lib/telegram/createTelegramBot.js`),
        telegramToken       = require(`${appRoot}/config/telegramBotData.json`).token;

module.exports = {

    createBotMessage          : require(`${appRoot}/lib/telegram/createBotMessage.js`),
    telegramChatID            : require(`${appRoot}/config/telegramBotData.json`).telegramChatID,
    bot                       : createTelegramBot(telegramToken)

}