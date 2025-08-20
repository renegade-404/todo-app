import "./style.css";
import { eventControl } from "./modules/eventController";
import { createInputPopup } from "./modules/uiController";

(() => {

    eventControl.arrOfBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            eventControl.mainPageHandler(e, createInputPopup);
        });
    });

    eventControl.ulField.forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            if (e.target.type === "checkbox" && e.target.checked) {
                eventControl.checkedInputHandler(e.target);
            }
        })
    })

})();