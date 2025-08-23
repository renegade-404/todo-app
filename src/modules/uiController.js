function renderNewProject(projectObj, container) {
    const project = document.createElement("li");
    project.classList.add("project-li");
    project.id = projectObj.id;
    project.innerText = `#${projectObj.name}`;
    container.appendChild(project);

}

function renderNewTask(taskObj, container) {
    const task = document.createElement("li");
    task.classList.add("task-li");
    task.id = taskObj.id;
    task.innerText = `>${taskObj.name}`;
    container.appendChild(task);

}

function renderNewTodayProject(projectObj, container) {
    const today = getTodayDate();
    if (projectObj.due == today) {
        const project = document.createElement("li");
        project.id = projectObj.id;
        project.classList.add("project-li");
        project.innerText = `${projectObj.name}, ${projectObj.due}`;
        container.appendChild(project);

        createCheckbox(projectObj["id"], project)
    }

}

function renderNewTodayTask(taskObj, container) {
    const today = getTodayDate();
    if (taskObj.due == today) {
        const task = document.createElement("li");
        task.id = taskObj.id;
        task.classList.add("task-li");
        task.innerText = `${taskObj.name}, ${taskObj.due}`;
        container.appendChild(task);

        createCheckbox(taskObj["id"], task)
    }
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

function completeTaskOrProject(checkedInput, getFunction) {
    const inputId = checkedInput.id;
    const entriesArray = getFunction();
    console.log(inputId);
    const entriesListElements = document.querySelectorAll(`#${inputId}`);

    entriesArray.forEach((entry, index) => {
        if (inputId == entry.id) {
            entriesArray.splice(index, 1);
        }
    })
    entriesListElements.forEach(liEl => liEl.remove());
}



export {renderNewProject, renderNewTask, createInputPopup, createSelectInputPopup,
        renderNewTodayProject, renderNewTodayTask, completeTaskOrProject,}

