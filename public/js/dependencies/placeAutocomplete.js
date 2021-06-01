import {sendRequestIfUserStoppedTyping} from '/sc/handlers/sendRequestIfUserStoppedTyping.js';


function initMap(window) {
    const map = new google.maps.Map(document.getElementById("map"));
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const biasInputElement = document.getElementById("use-location-bias");
    const strictBoundsInputElement = document.getElementById("use-strict-bounds");
    const options = {
      componentRestrictions: { country: "DE" },
      fields: ["formatted_address", "geometry", "name"],
      origin: map.getCenter(),
      strictBounds: false,
    };

    const autocomplete = new google.maps.places.Autocomplete(input, options);


    autocomplete.addListener("place_changed", () => {
      
      const place = autocomplete.getPlace();
  
      if (!place.geometry) {
        logThis(`No details available for input: "${place.name}"`);
        return;
      }
        

      place.formatted_address;

      sendRequestIfUserStoppedTyping();

    });

      // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
      const radioButton = document.getElementById(id);
    }
    
    setupClickListener("changetype-all", []);
    setupClickListener("changetype-address", ["address"]);
    setupClickListener("changetype-establishment", ["establishment"]);
    setupClickListener("changetype-geocode", ["geocode"]);

   
  }

  export{initMap}