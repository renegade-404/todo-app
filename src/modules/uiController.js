function renderProjects(projectsArray) {

}

function renderTasks(tasksArray) {

}

function createInputPopup(popupType) {
    const bodyEl = document.body;

    const popupContainers = [
        { tag: "form", elClass: "popup-form", container: bodyEl},
        { tag: "div", elClass: "popup-top-container", container: "popup-form"},
        { tag: "div", elClass: "popup-bot-container", container: "popup-form"},
    ];

    const popupDomElements = [
        { tag: "input", type: "text", id: "name", name: "name", elClass: "popup-input", placeholder: `${popupType} name`, container: "popup-top-container" },
        { tag: "input", type: "date", id: "due", name: "due", elClass: "popup-input", container: "popup-bot-container" },
        { tag: "select", id: "priority", name: "priority", elClass: "popup-input", container: "popup-bot-container"},
        { tag: "button", type: "submit", text: `Add ${popupType}`, elClass: `${popupType}-input-btn`, container: "popup-bot-container"},
    ];

    const selectElementOptions = ["important", "semi-important", "normal"];

    createDomElements(popupContainers);

    createDomElements(popupDomElements);

    addSelectOption(selectElementOptions, "priority");
    
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

        if (elClass == "popup-form") {
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


export {renderProjects, renderTasks, createInputPopup}

