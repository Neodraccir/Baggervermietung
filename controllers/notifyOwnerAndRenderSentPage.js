module.exports = (app)=>{

    const   appRoot                   = require('app-root-path'),
            bodyParser                = require('body-parser'),
            fs                        = require('fs'),
            urlencodedParser          = bodyParser.urlencoded({extended:false}),
            convertDateBack           = require(`${appRoot}/lib/converter/convertDateToInternationalFormat.js`),
            create_vCard              = require(`${appRoot}/lib/converter/create_vCard.js`),
            t                         = require(`${appRoot}/lib/telegram/telegramBotMethods.js`),
            newCalendarEvent          = require(`${appRoot}/lib/googleCalendar/handleNewCalendarEvent.js`);
    var     previousReceivedValue     = "mapEventOntoCalendar";

    
    app.post('/finalTMPOrder', urlencodedParser, function(req, res){

        let user_id         = req.body.user_id;
        delete require.cache[`${appRoot}/db/tmp/${user_id}.json`];
        let orderData       = require(`${appRoot}/db/tmp/${user_id}.json`),
 
            
            vCard             = create_vCard(orderData),
            botMsg            = t.createBotMessage(orderData);
            console.log(orderData)

     
    var notifyClientOfSuccess  = async function(){
        try{
            let sendMessage = await t.bot.sendMessage(t.telegramChatID, botMsg, {
                parse_mode: 'HTML',
                reply_markup: {inline_keyboard:[[{
                    text: "Termin im Kalender eintragen",
                    callback_data: "requestCalendar"
                }]]}
        })
            if (sendMessage){
                res.json({orderRequestMessageStatus:"sent"});
                console.log("Sent 'send' to client.");
            }
            if (!sendMessage){
                res.json({orderRequestMessageStatus:"failed"});
                console.log("Sent 'failed' to client.");
            }

        }catch(err){
            console.error(err)
            res.json({orderRequestMessageStatus:"failed"});
            console.log("Sent 'failed' to client.");
 
        }

        },
        sendContact = async function(){
            try{

                console.log(`Try sending Contact to Chat-ID: ${t.telegramChatID}`)
                await t.bot.sendContact(t.telegramChatID, orderData.phoneNr, orderData.firstName, {
                        last_name: orderData.lastName,
                        disable_notification: true, 
                        vcard : vCard
                    });

            }catch(err){
                console.error("Could not sent Contact!")
            }
        },
        respondIfEventCreationSuccessful = async function(summary, description, start, end, chatId, messageId, finalMsg){

            try{
                newCalendarEvent(summary, description, start, end).then(function(eventCreation){
 
                    if(eventCreation === "Success"){
        
                        let inlineKeyboard = JSON.stringify({
                            inline_keyboard:[[]]
                        });
    
                        t.bot.editMessageReplyMarkup(inlineKeyboard,{
                                chat_id:     chatId,
                                message_id:  messageId
                            });   
    
                        t.bot.sendMessage(chatId, finalMsg); 
                    }

                    if(eventCreation === "Date already exists!"){
                        t.bot.sendMessage(chatId, "Hoppla! Etwas lief schief...")
                        t.bot.sendMessage(chatId, "Datum bereits belegt.")
                    }

                })


            }catch(err){
                    t.bot.sendMessage(chatId, "Hoppla! Etwas lief schief...")
                    console.error(err)
            };
        };

    notifyClientOfSuccess();

    setTimeout(()=> {
        sendContact()
    },1000);



    t.bot.on('callback_query', (msg)=>{

        const   data        = msg?.data,
                chatId      = msg?.message?.chat?.id,
                messageId   = msg?.message?.message_id;
        
        delete require.cache[`${appRoot}/db/tmp/${user_id}.json`];
        let orderData       = require(`${appRoot}/db/tmp/${user_id}.json`);

        console.log("Got his request:");
        console.log(data)
        if(msg.data === "requestCalendar"){


            if(previousReceivedValue === "mapEventOntoCalendar"){

    
                let JSONinline = JSON.stringify({
                    inline_keyboard:[[{
                        text: "Sind sie sicher?",
                        callback_data: "mapEventOntoCalendar"
                    }]]
                })

                t.bot.editMessageReplyMarkup(JSONinline,{
                        chat_id:     chatId,
                        message_id:  messageId
                    }
                )

                previousReceivedValue = "requestCalendar";
            }
        }

        if(msg.data === "mapEventOntoCalendar"){


            if(previousReceivedValue === "requestCalendar"){

                const   summary         = `Bagger: ${orderData.firstName} ${orderData.lastName}`,
                description     = `${orderData.firstName} ${orderData.lastName} leiht den Bagger für die Baustelle: ${orderData.place}\nPlane ${orderData.travelTime} für die Fahrt ein.\nEr ist erreichbar unter: ${orderData.phoneNr}`,
                start           = convertDateBack(orderData.dateStart),
                end             = convertDateBack(orderData.dateEnd),
                finalMsg        = `Termin von ${orderData.firstName} ${orderData.lastName} für ${orderData.dateStart} bis ${orderData.dateEnd} eingetragen.`;
                
                respondIfEventCreationSuccessful(summary, description, start, end, chatId, messageId, finalMsg)
                previousReceivedValue = "mapEventOntoCalendar";
            }      
        } 

    })

    t.bot.on('polling_error',(err)=>console.log(err))
   

    });  
}; 



