import { functionsList } from "./elementsManager";
import { eventControl } from "./eventController";

export function storageControl() {

    function initStorage() { //split into two
        if (!localStorage.getItem("projects")) {
            localStorage.setItem("projects", JSON.stringify([]));
        } else {
            updateProjects(
            functionsList.rendProject,
            functionsList.rendTodayProject,
            eventControl.editWindEventLis);
            updateProjectsList();
        }
        

        if (!localStorage.getItem("tasks")) {
            localStorage.setItem("tasks", JSON.stringify([]));
        } else {
            updateTasks(
            functionsList.rendTask,
            functionsList.rendTodayTask,
            eventControl.editWindEventLis);
            updateTasksList();
        }
    }

    function updateProjects(rendProjFn, rendProjTdFn, editBtnEvent) { //remove argument functions
        const projects = JSON.parse(localStorage.getItem("projects"));
        if (projects.length == 0) return;

        const sidebarUl = document.querySelector(".sidebar-projects-list");
        const fieldUl = document.querySelector(".field-projects-list");

        projects.forEach(project => {
            rendProjFn(project, sidebarUl, editBtnEvent);
            rendProjTdFn(project, fieldUl);
        })

    }

    function updateTasks(rendTaskFn, rendTaskTdFn, editBtnEvent) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks.length == 0) return;

        const sidebarUl = document.querySelector(".sidebar-tasks-list");
        const fieldUl = document.querySelector(".field-tasks-list");

        tasks.forEach(task => {
            rendTaskFn(task, sidebarUl, editBtnEvent);
            rendTaskTdFn(task, fieldUl);
        })

    }

    function removeFromStorage(type, entryId) {
        let storageList = JSON.parse(localStorage.getItem(`${type}s`)) || [];

        storageList = storageList.filter(storageEntry => storageEntry.id !== entryId);
        localStorage.setItem(`${type}s`, JSON.stringify(storageList));
    }

    function updateProjectsList() {
        const projectList = JSON.parse(localStorage.getItem("projects"));

        projectList.forEach(project => {
            functionsList.addProjectToList(project);
        });
    }

    function updateTasksList() {
        const taskList = JSON.parse(localStorage.getItem("tasks"));

        taskList.forEach(task => {
            functionsList.addTaskToList(task);
        });
    }

    return { initStorage, removeFromStorage }
}