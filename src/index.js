import "./style.css";
import { eventControl } from "./modules/eventController";
import { createInputPopup, createSelectInputPopup } from "./modules/uiController";

(() => {

    eventControl.arrOfBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (e.target.classList == "add-select-btn") {
                eventControl.selectPopupHandler(createSelectInputPopup, createInputPopup);
            } else eventControl.noSelectPopupHandler(e, createInputPopup);
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