function renderProjects(projectsArray) {

}

function renderTasks(tasksArray) {

}

function createInputPopup(popupType) {
    const popupDomElements = [
        { element: "input", type: "text", id: "name", name: "name", placeholder: `${popupType} name`, container: "popupTopContainer" },
        { element: "input", type: "date", id: "due", name: "due", container: "popupBottomContainer" },
        { element: "section", id: "priority", name: "priority", container: "popupBottomContainer"},
        { element: "button", text: `Add ${popupType}`, elClass: `${popupType}-input-btn`, container: "popupBottomContainer"},
    ];

    const popupContainer = document.createElement("div");
    popupContainer.classList.add("popup-container"); // todo: add position: absolute and position: relative
    document.body.appendChild("popup");

    const popupTopContainer = document.createElement("div");
    popupContainer.appendChild(popupTopContainer);

    const popupBottomContainer = document.createElement("div");
    popupContainer.appendChild(popupBottomContainer);

    createDomElements(popupDomElements);
    
}


function createDomElements(arr) {

    arr.forEach(({tag, type, id, name, placeholder, elClass, container}) => {
        const element = document.createElement(tag);
        if (type) element.type = type;
        if (id) element.id = id;
        if (name) element.name = name;
        if (placeholder) element.placeholder = placeholder;
        if (elClass) element.classList.add(elClass);
        if (text) el.textContent = text;

        const targetContainer = document.querySelector(`.${container}`);
        targetContainer.appendChild(element);
    })
}


export {renderProjects, renderTasks, createInputPopup}

