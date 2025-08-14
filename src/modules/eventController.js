export const eventControl = (() => {
    const addSelectionBtn = document.querySelector(".add-select-btn");
    const addProjectBtn = document.querySelector(".add-project-btn");
    const addTaskBtn = document.querySelector(".add-task-btn");
    const arrOfBtns = [addSelectionBtn, addProjectBtn, addTaskBtn];

    const inputsObj = {};


    function popupHandler() {
        for (let key in inputsObj) {
            delete inputsObj[key];
        }
        
        const inputs = document.querySelectorAll(".popup-input");
        const inputsForm = document.querySelector(".input-form");

        inputs.forEach((item) => {
            inputsObj[item.id] = item.value;
        })

        document.body.removeChild(inputsForm);
    }

    function mainPageHandler(e, fn) {
        const itemType = e.target.classList[0].split("-")[1];
        fn(itemType);

        const inputBtn = document.querySelector(`.${itemType}-input-btn`);
        inputBtn.addEventListener("click", popupHandler);


    }

    return { inputsObj, arrOfBtns, mainPageHandler }

})();