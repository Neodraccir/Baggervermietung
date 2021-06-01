class Event {
    constructor(summary, start, end, description){
            this.summary        = summary,
            this.description    = description,
            this.start          = {
                date: start,
                timeZone: "Europe/Berlin"
            },
            this.end            = {
                date: end,
                timeZone: "Europe/Berlin"
            }
    }}; 


module.exports = (summary, start, end, description)=> new Event(summary, start, end, description)