import "./style.css";
import { eventControl } from "./modules/eventController";
import { createInputPopup } from "./modules/uiController";

(() => {

    eventControl.arrOfBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            eventControl.mainPageHandler(e, createInputPopup);
        });
    });

})();