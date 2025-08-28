import { functionsList } from "./elementsManager";
import { eventControl } from "./eventController";

export function storageControl() {

    function initStorage() {
        if (!localStorage.getItem("projects")) {
            localStorage.setItem("projects", JSON.stringify([]));
        } else updateProjects(
            functionsList.rendProject,
            functionsList.rendTodayProject,
            eventControl.editWindEventLis
        )

        if (!localStorage.getItem("tasks")) {
            localStorage.setItem("tasks", JSON.stringify([]));
        } else updateTasks(
            functionsList.rendTask,
            functionsList.rendTodayTask,
            eventControl.editWindEventLis
        )
    }

    function updateProjects(rendProjFn, rendProjTdFn, editBtnEvent) {
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

    return { initStorage }
}