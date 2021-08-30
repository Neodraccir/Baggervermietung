import { placeAndTimeRequest } from "/sc/handlers/placeAndTimeRequest.js";

function handleCheckboxes() {
  document.querySelectorAll("div.bucket").forEach((div) => {
    div.addEventListener("click", () => {
      if(div.classList.contains("unselected") ){
        div.classList.remove("unselected");
        div.classList.add("selected");
        div.querySelector("span").innerText += " (ausgewählt)";
      }else if(!div.classList.contains("unselected")){
        div.classList.remove("selected");
        div.classList.add("unselected");
        div.querySelector("span").innerText = div.querySelector("span").innerText.replace(/\s\(ausgewählt\)/,"")
      }
      placeAndTimeRequest();
    });
  });
}

export { handleCheckboxes };
