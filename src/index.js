import "./style.css";
import { dataManager } from "./modules/dataManager";
import { domElements } from "./modules/elementsManager";
import { eventControl } from "./modules/eventController";
import { createInputPopup, renderProjects, renderTasks } from "./modules/uiController";


(() => {

    eventControl.arrOfBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            eventControl.mainPageHandler(e, createInputPopup);
        });
    });



})();