export const eventControl = (() => {
    const addSelectionBtn = document.querySelector(".add-with-select-btn");
    const addProjectBtn = document.querySelector(".add-project-btn");
    const addTaskBtn = document.querySelector(".add-task-btn");
    const inputsObj = {};

    function popupHandler() {
        const inputsObj = {};
        const inputs = document.querySelectorAll(".popup-input");

        inputs.forEach((item) => {
            inputsObj[item.id] = item.value;
        })
    }

    function mainPageHandler(e, fn) {
        const itemType = e.target.classList[0].split("-input-btn")[0];
    }




    return { inputsObj }

})()