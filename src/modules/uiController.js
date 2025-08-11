function renderProjects(projectsArray) {

}

function renderTasks(tasksArray) {

}

function createInputPopup(popupType) {
    const bodyEl = document.body;

    const popupContainers = [
        { tag: "div", elClass: "popup-main-cont", container: bodyEl},
        { tag: "div", elClass: "popup-sub-top-cont", container: "popup-main-cont"},
        { tag: "div", elClass: "popup-sub-bot-cont", container: "popup-main-cont"},
    ];

    const popupDomElements = [
        { tag: "input", type: "text", id: "name", name: "name", placeholder: `${popupType} name`, container: "popup-sub-top-cont" },
        { tag: "input", type: "date", id: "due", name: "due", container: "popup-sub-bot-cont" },
        { tag: "section", id: "priority", name: "priority", container: "popup-sub-bot-cont"},
        { tag: "button", text: `Add ${popupType}`, elClass: `${popupType}-input-btn`, container: "popup-sub-bot-cont"},
    ];

    createDomElements(popupContainers);

    createDomElements(popupDomElements);
    
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

        if (elClass == "popup-main-cont") {
            container.appendChild(element);
        } else {
            const targetContainer = document.querySelector(`.${container}`);
            targetContainer.appendChild(element);
        }
        
    })
}


export {renderProjects, renderTasks, createInputPopup}

