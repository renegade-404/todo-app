import "./style.css";
import { eventControl } from "./modules/eventController";
import { createInputPopup, createSelectInputPopup } from "./modules/uiController";
import { dataManagement } from "./modules/dataManager";

(() => {

    dataManagement().initStorage();

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

    window.addEventListener("storage", (e) => {
        eventControl.storageSaveEvent(e);
    })

})();