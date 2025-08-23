import { domElements, functionsList } from "./elementsManager";

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

            document.body.removeChild(inputsForm);

            addObjToList(inputsObj);
            renderEntryFn(lastAddedEntry(), sidebarContainer);
            
            renderTodayEntryFn(lastAddedEntry(), fieldContainer);
            
        } catch (er) {
            throw er;
        }
    
    }

    function mainPageHandler(e, createInputPopFn) {
        const entryType = e.target.classList[0].split("-")[1];
        
        const propList = generateFncVariables(entryType, handlerPropertiesNames);

        createInputPopFn(entryType);

        const inputBtn = document.querySelector(`.${entryType}-input-btn`); // put button inside domElements?
        inputBtn.addEventListener("click", () => objCreationHandler(propList));

    }

    function checkedInputHandler(input) {
        const entryType = input.parentNode.classList[0].split("-")[0];
        const entryTypeAsArg = entryType[0].toUpperCase() + entryType.slice(1, entryType.length);
        const getFn = functionsList[`getAll${entryTypeAsArg}s`];
        if (input.checked) functionsList.completeTaskOrProject(input, getFn);
    }

    function selectPopupHandler(createSelectPopup) {
        createSelectPopup();
        const taskBtn = document.querySelector(".select-task-button");
        const projectBtn = document.querySelector(".select-project-button");
        const btnsArr = [taskBtn, projectBtn];

        btnsArr.forEach(button => {
            button.addEventListener("click", (e) => {
                const entryType = e.target.classList.split("-")[1]; 

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


    return { inputsObj, arrOfBtns, mainPageHandler,
            checkedInputHandler, ulField }

})();