import { isToday } from "date-fns";
import { domElements, functionsList } from "./elementsManager";
import { updateEntry } from "./uiController";

export const eventControl = (() => {
    const addSelectionBtn = document.querySelector(".add-select-btn");
    const addProjectBtn = document.querySelector(".add-project-btn");
    const addTaskBtn = document.querySelector(".add-task-btn");
    const arrOfBtns = [addSelectionBtn, addProjectBtn, addTaskBtn];

    const ulField = document.querySelectorAll(".ul-field");

    const handlerPropertiesNames = ["getLast Placeholder", "rend Placeholder",
              "sidebar Placeholder sList", "rendToday Placeholder",
              "field Placeholder sList", "add Placeholder ToList"];

    const inputsObj = {};


    function objCreationHandler(propList) { // creates task or project object
        try {
            for (let key in inputsObj) {
                delete inputsObj[key];
            }

            const inputs = document.querySelectorAll(".popup-input");
            const inputsForm = document.querySelector(".popup-form");

            const lastAddedEntry = functionsList[propList["getLastPlaceholder"]];
            const renderEntryFn = functionsList[propList["rendPlaceholder"]];
            const sidebarContainer = domElements[propList["sidebarPlaceholdersList"]];
            const renderTodayEntryFn = functionsList[propList["rendTodayPlaceholder"]];
            const fieldContainer = domElements[propList["fieldPlaceholdersList"]];
            const addObjToList = functionsList[propList["addPlaceholderToList"]];


            inputs.forEach((item) => {
                inputsObj[item.id] = item.value;
                inputsObj.id = crypto.randomUUID();
            })

            console.log(inputsObj);

            document.body.removeChild(inputsForm);

            addObjToList(inputsObj);
            renderEntryFn(lastAddedEntry(), sidebarContainer, editWindEventLis);
            
            renderTodayEntryFn(lastAddedEntry(), fieldContainer);
            
        } catch (er) {
            throw er;
        }
    
    }

    function noSelectPopupHandler(e, createInputPopFn) {
        const entryType = e.target.classList[0].split("-")[1]; // write a function that automates this
        
        const propList = generateFncVariables(entryType, handlerPropertiesNames);

        createInputPopFn(entryType);

        const exitPopupBtn = document.querySelector(".exit-popup-button");
        const popupForm = document.querySelector(".popup-form");
        exitPopupBtn.addEventListener("click", () => popupForm.remove());
        
        const inputBtn = document.querySelector(`.${entryType}-input-btn`); // put button inside domElements?
        inputBtn.addEventListener("click", () => objCreationHandler(propList));

    }

    function checkedInputHandler(input) {
        const entryType = input.parentNode.classList[0].split("-")[0];
        const entryTypeAsArg = entryType[0].toUpperCase() + entryType.slice(1, entryType.length);
        const getFn = functionsList[`getAll${entryTypeAsArg}s`];
        if (input.checked) functionsList.completeTaskOrProject(input, getFn);
    }

    function selectPopupHandler(createSelectPopup, createInputPopFn) {
        createSelectPopup();
        const exitSelectBtn = document.querySelector(".exit-select-button");
        const selectPopup = document.querySelector(".select-popup-container");
        const taskBtn = document.querySelector(".select-task-btn");
        const projectBtn = document.querySelector(".select-project-btn");
        const btnsArr = [taskBtn, projectBtn, exitSelectBtn];

        btnsArr.forEach(button => {
            button.addEventListener("click", (e) => {
                if (e.target.classList == "exit-select-button") selectPopup.remove();
                else {
                    selectPopup.remove();
                    const entryType = e.target.classList[0].split("-")[1];
                    const propList = generateFncVariables(entryType, handlerPropertiesNames);

                    createInputPopFn(entryType);

                    const inputBtn = document.querySelector(`.${entryType}-input-btn`);
                    const exitPopupBtn = document.querySelector(".exit-popup-button");
                    const popupForm = document.querySelector(".popup-form");

                    exitPopupBtn.addEventListener("click", () => popupForm.remove());
                    inputBtn.addEventListener("click", () => objCreationHandler(propList));
                }
                
                
            })
        })
    }

    function generateFncVariables(entryType, arr) {
        const typeAsArg = entryType[0].toUpperCase() + entryType.slice(1, entryType.length);

        const newArr = arr.map(func => {
            const newString = func.replace("Placeholder", typeAsArg).split(" ").join("");
            return newString;
        })

        const newObj = {};
        newArr.forEach(func => {
            newObj[func.replace(typeAsArg, "Placeholder")] = func;
        })

        return newObj;
    }

    function editWindowHandler(e, createEditWind) {
        createEditWind(e.target, functionsList.getProperties);

        editWindowButtonsEvent(e.target);
        
    }

    function editWindEventLis(btn, createWindFn) {
        btn.addEventListener("click", (e) => {
            editWindowHandler(e, createWindFn)
        })
    }

    function editWindowButtonsEvent(entry) {
        const entryId = entry.parentNode.id;
        const type = entry.parentNode.classList[0].split("-")[0];
        const window = document.querySelector(".edit-window-container");
        const liEntries = [...document.querySelectorAll("li")]
          .filter(li => li.id.includes(entryId));

        const exitBtn = document.querySelector(".edit-window-exit-btn");
        const saveBtn = document.querySelector(".edit-window-save-btn");

        function saveHandler() {
            updateEntry(type, entryId, functionsList.editProperties);
            const newProp = functionsList.getProperties(type, entryId);
            const today = functionsList.getTodayDate();

            liEntries.forEach(entry => {
                if (entry.parentNode.classList.contains("ul-field")) {
                    if (newProp.due !== today) entry.remove();
                    else {
                        if (type == "task") entry.innerText = `>${newProp.name}, ${newProp.due}`;
                        else entry.innerText = `#${newProp.name}, ${newProp.due}`;
                    }
                    
                    
                } else {
                    if (type == "task") entry.children[0].innerText = `>${newProp.name}`;
                    else entry.children[0].innerText = `#${newProp.name}`;
                    
                }
            })
            
            window.remove();
        }

        exitBtn.addEventListener("click", () => window.remove());
        saveBtn.addEventListener("click", () => saveHandler())
    }

    return { inputsObj, arrOfBtns, noSelectPopupHandler,
            checkedInputHandler, ulField, selectPopupHandler,
            editWindowHandler }

})();