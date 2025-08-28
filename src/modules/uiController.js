function renderNewProject(projectObj, container, editButtonEvent, saveInStorage) {
    const project = document.createElement("li");
    project.classList.add("project-li");
    project.id = projectObj.id;

    const button = document.createElement("button");
    button.classList.add("sidebar-li-btn");
    button.innerText = `#${projectObj.name}`;

    project.appendChild(button);
    container.appendChild(project);

    editButtonEvent(button, createEditWindow);
    if (saveInStorage) saveInStorage("projects", projectObj);
}

function renderNewTask(taskObj, container, editButtonEvent, saveInStorage) {
    const task = document.createElement("li");
    task.classList.add("task-li");
    task.id = taskObj.id;

    const button = document.createElement("button");
    button.classList.add("sidebar-li-btn");
    button.innerText = `#${taskObj.name}`;

    task.appendChild(button);
    container.appendChild(task);

    editButtonEvent(button, createEditWindow);
    if (saveInStorage) saveInStorage("tasks", taskObj);
}

function renderNewTodayProject(projectObj, container, updateId) {
    const today = getTodayDate();

    if (projectObj.due == today) {
        const project = document.createElement("li");
        project.id = projectObj.id;
        project.classList.add("project-li");
        project.innerText = `${projectObj.name}, ${projectObj.due}`;

        container.appendChild(project);

        if (updateId) {
            project.id = updateId;
            createCheckbox(updateId, project);
        } else createCheckbox(projectObj["id"], project);

    }

}

function renderNewTodayTask(taskObj, container, updateId) {
    const today = getTodayDate();

    if (taskObj.due == today) {
        const task = document.createElement("li");
        task.id = taskObj.id;
        task.classList.add("task-li");
        task.innerText = `${taskObj.name}, ${taskObj.due}`;

        container.appendChild(task);

        if (updateId) {
            task.id = updateId;
            createCheckbox(updateId, task);
        } else createCheckbox(updateId, task);
    }
}

function updateEntry(type, id, editPropFn) {
    const editInputs = document.querySelectorAll(".edit-window-input");
    const updatedValues = {};

    editInputs.forEach(input => {
        if (input.name == "name") updatedValues.name = input.value;
        if (input.name == "due") updatedValues.due = input.value;
        if (input.name == "priority") updatedValues.priority = input.value;
    })

    editPropFn(type, id, updatedValues);

}


function createInputPopup(popupType) {
    const bodyEl = document.body;

    const popupContainers = [
        { tag: "div", elClass: "popup-form", container: bodyEl},
        { tag: "div", elClass: "popup-top-container", container: "popup-form"},
        { tag: "div", elClass: "popup-bot-container", container: "popup-form"},
    ];

    const popupDomElements = [
        { tag: "input", type: "text", id: "name", name: "name", elClass: "popup-input", placeholder: `${popupType} name`, container: "popup-top-container" },
        { tag: "input", type: "date", id: "due", name: "due", elClass: "popup-input", container: "popup-bot-container" },
        { tag: "select", id: "priority", name: "priority", elClass: "popup-input", container: "popup-bot-container"},
        { tag: "button", text: `Add ${popupType}`, elClass: `${popupType}-input-btn`, container: "popup-bot-container"},
        { tag: "button", text: "x", elClass: "exit-popup-button", container: "popup-top-container"},

    ];

    const selectElementOptions = ["important", "semi-important", "normal"];

    createDomElements(popupContainers);

    createDomElements(popupDomElements);

    addSelectOption(selectElementOptions, "priority");
    
}

function createSelectInputPopup() {
    const bodyEl = document.body;

    const selectPopupContainer = [{ tag: "div", elClass: "select-popup-container", container: bodyEl},];
    const selectButtons = [
        { tag: "button", text: "Add Project", elClass: "select-project-btn", container: "select-popup-container"},
        { tag: "button", text: "Add Task", elClass: "select-task-btn", container: "select-popup-container"},
        { tag: "button", text: "x", elClass: "exit-select-button", container: "select-popup-container"},

    ];

    createDomElements(selectPopupContainer);
    createDomElements(selectButtons);
}

function createDomElements(arr) {

    arr.forEach(({tag, type, id, name, placeholder, elClass, container, text}) => {
        const element = document.createElement(tag);
        if (type) element.type = type;
        if (id) element.id = id;
        if (name) element.name = name;
        if (placeholder) element.placeholder = placeholder;
        if (elClass) element.classList.add(elClass);
        if (text) element.textContent = text;

        if (container == document.body) { // changed from if elClass == "popup-form"
            container.appendChild(element);
        } else {
            const targetContainer = document.querySelector(`.${container}`);
            targetContainer.appendChild(element);
        }
        
    })
}

function addSelectOption(arr, selectId) {
    const selectEl = document.querySelector(`#${selectId}`)
    arr.forEach(item => {
        const optionEl = document.createElement("option");
        optionEl.innerText = item;
        selectEl.appendChild(optionEl);
    })
}

function getTodayDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth()+1).padStart(2, '0');
    const yyyy = String(today.getFullYear());

    return yyyy+'-'+mm+'-'+dd;

}

function createCheckbox(id, liContainer) {
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.id = id;
    liContainer.appendChild(checkBox);

}

function completeTaskOrProject(checkedInput, getFunction, removeFromStorageFn) {
    const inputId = checkedInput.id;
    const entryType = checkedInput.parentNode.classList[0].split("-")[0];
    const entriesArray = getFunction();
    const entriesListElements = [...document.querySelectorAll("li")]
          .filter(li => li.id.includes(inputId));

    entriesArray.forEach((entry, index) => {
        if (inputId == entry.id) {
            entriesArray.splice(index, 1);
        }
    })
    entriesListElements.forEach(liEl => liEl.remove());
    removeFromStorageFn(entryType, inputId);
}

function createEditWindow(entry, getEntry) {
    const bodyEl = document.body;
    const entryId = entry.parentNode.id;
    const type = entry.parentNode.classList[0].split("-")[0];
    console.log(type, entryId);
    const entryProperties = getEntry(type, entryId);


    const editWindowContainer = [{ tag: "div", elClass: "edit-window-container", container: bodyEl}];
    const editWindowInputs = [
        { tag: "input", type: "text", id: "name", name: "name", elClass: "edit-window-input", container: "edit-window-container" },
        { tag: "input", type: "date", id: "due", name: "due", elClass: "edit-window-input", container: "edit-window-container" },
        { tag: "select", id: "priority", name: "priority", elClass: "edit-window-input", container: "edit-window-container"},
        { tag: "button", text: "Delete", elClass: "edit-window-del-btn", container: "edit-window-container"},
        { tag: "button", text: "Save", elClass: "edit-window-save-btn", container: "edit-window-container"},
        { tag: "button", text: "x", elClass: "edit-window-exit-btn", container: "edit-window-container"},
    ];

    createDomElements(editWindowContainer);
    createDomElements(editWindowInputs);

    const selectElementOptions = ["important", "semi-important", "normal"];
    addSelectOption(selectElementOptions, "priority");

    const editInputs = document.querySelectorAll(".edit-window-input");

    editInputs.forEach(input => {
        if (input.name == "name") input.value = entryProperties.name;
        if (input.name == "due") input.value = entryProperties.due;
        if (input.name == "priority") input.value = entryProperties.priority;
    })

}

function editElements(arrOfElements, newPropObj, date, type, id) {
    const fieldUl = document.querySelector(`.field-${type}s-list`);

    arrOfElements.forEach(entry => {
        if (entry.parentNode.classList.contains("ul-field")) {
            if (newPropObj.due !== date) entry.remove();
            else {
                if (type == "task") entry.innerText = `>${newPropObj.name}, ${newPropObj.due}`;
                else entry.innerText = `#${newPropObj.name}, ${newPropObj.due}`;
            }

        } else {
            if (type == "task") {
                entry.children[0].innerText = `>${newPropObj.name}`;
                if (newPropObj.due == date) {
                    renderNewTodayTask(newPropObj, fieldUl, id);
                } 
            } 
            else if (type == "project") {
                entry.children[0].innerText = `#${newPropObj.name}`;
                if (newPropObj.due == date) {
                    renderNewTodayProject(newPropObj, fieldUl, id);
                } 
            } 

        }
    })

}

function deleteEntryFromDom(arrOfElements) {
    arrOfElements.forEach(element => element.remove());
}


export {renderNewProject, renderNewTask, createInputPopup, createSelectInputPopup,
        renderNewTodayProject, renderNewTodayTask, completeTaskOrProject,
        createEditWindow, updateEntry, getTodayDate, deleteEntryFromDom,
        editElements}

