const   appRoot         = require('app-root-path'),
        secrets         = require(`${appRoot}/config/client_secrets.json`),
        { google }      = require('googleapis'),
        credentials     = secrets.credentials,
        calendarId      = secrets.calendar_id,
        SCOPES          = 'https://www.googleapis.com/auth/calendar',
        calendar        = google.calendar({version:"v3"}),
        auth            = new google.auth.JWT(
                                credentials.client_email,
                                null,
                                credentials.private_key,
                                SCOPES
                            );
    
module.exports = [
    calendarId,
    calendar,
    auth
]
  