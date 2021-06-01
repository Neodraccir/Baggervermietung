import {litepickerModule} from '/sc/dependencies/litepicker.js';
import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';
import {placeAndTimeRequest} from '/sc/handlers/placeAndTimeRequest.js';
import {handleLocalStorage} from '/sc/handlers/handleLocalStorage.js';


function handleCalendar(window){
    litepickerModule(window);


        let today           = new Date().toISOString().slice(0,10),
            startObject     = document.getElementById("dateRangeStart"),
            endObject       = document.getElementById("dateRangeEnd"),
            dateRangeStart  = startObject.value,
            dateRangeEnd    = endObject.value;

        startObject.addEventListener("keypress",(e)=>{
            e.preventDefault();
            });
        endObject.addEventListener("keypress",(e)=>{
            e.preventDefault();
            });
        startObject.autocomplete = "qewdfce";
        endObject.autocomplete = "jfvnerpiuv";

        dateRangeStart = today;
        dateRangeEnd   = today;

    var picker = addGlobalVar({
        picker : new Litepicker({
            element: document.getElementById('dateRangeStart'),
            elementEnd: document.getElementById('dateRangeEnd'),
            singleMode: false,
            allowRepick: true, 
            setup: function(picker){
                picker.on('hide', function(){
                
                    dateStart   = new Date(picker.getDate().dateInstance.toDateString());
                    dateEnd     = new Date(picker.getEndDate().dateInstance.toDateString());

                    handleLocalStorage.calendar();

                    placeAndTimeRequest();
                });

                }, 
            minDate: new Date().setUTCDate(new Date().getDate()),
            lockDays: [],
            disallowLockDaysInRange: true

        }) 
        }),
        setLockedDates  = addGlobalVar({setLockedDates:  async ()=>{
            try{
                const lockedDates = await fetch('/getLockedDates'),
                      data        = await lockedDates.json();
                picker.setLockDays(data);
                logThis("Locked Dates:")
                logThis(data)


            }catch(err){
                console.error(err)
            }
            
        }});


    setLockedDates();
}

export{handleCalendar}