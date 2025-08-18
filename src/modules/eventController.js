import { domElements, functionsList } from "./elementsManager";

export const eventControl = (() => {
    const addSelectionBtn = document.querySelector(".add-select-btn");
    const addProjectBtn = document.querySelector(".add-project-btn");
    const addTaskBtn = document.querySelector(".add-task-btn");
    const arrOfBtns = [addSelectionBtn, addProjectBtn, addTaskBtn];

    const inputsObj = {};


    function objCreationHandler(e, lastAddedEntry, renderEntryFn, sidebarContainer, renderTodayEntryFn, fieldContainer) { // creates task or project object
        try {
            for (let key in inputsObj) {
                delete inputsObj[key];
            }

            const inputs = document.querySelectorAll(".popup-input");
            const inputsForm = document.querySelector(".popup-form");
            const itmType = e.target.classList[0].split("-")[0];
            const typeAsArg = itmType[0].toUpperCase() + itmType.slice(1, itmType.length);

            inputs.forEach((item) => {
                inputsObj[item.id] = item.value;
                inputsObj.id = crypto.randomUUID();
            })

            console.log(inputsObj);

            document.body.removeChild(inputsForm);

            functionsList[`add${typeAsArg}ToList`](inputsObj);
            renderEntryFn(lastAddedEntry(), sidebarContainer);
            
            renderTodayEntryFn(lastAddedEntry(), fieldContainer);
            
        } catch (er) {
            throw er;
        }
    
    }

    function mainPageHandler(e, createInputPopFn) {
        const itemType = e.target.classList[0].split("-")[1];
        const typeAsArg = itemType[0].toUpperCase() + itemType.slice(1, itemType.length);
        const lastAddedEntry = functionsList[`getLast${typeAsArg}`];

        const renderEntryFn = functionsList[`rend${typeAsArg}`];
        const sidebarContainer = domElements[`sidebar${typeAsArg}sList`];
        
        const renderTodayEntryFn = functionsList[`rendToday${typeAsArg}`];
        const fieldContainer = domElements[`field${typeAsArg}sList`];

        createInputPopFn(itemType);

        const inputBtn = document.querySelector(`.${itemType}-input-btn`);
        inputBtn.addEventListener("click", (e) => objCreationHandler(e, lastAddedEntry, renderEntryFn, sidebarContainer, renderTodayEntryFn, fieldContainer));

    }

    return { inputsObj, arrOfBtns, mainPageHandler }

})();