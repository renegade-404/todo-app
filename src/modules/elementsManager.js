import { renderProjects, renderTasks } from "./uiController";
import { dataManagement } from "./dataManager";

const dataManager = dataManagement();

export const domElements = {
    sidebarProjectsList: document.querySelector(".sidebar-projects-list"),
    sidebarTasksList: document.querySelector(".sidebar-tasks-list"),
}

export const functionsList = {
    rendTasks: renderTasks,
    rendProjects: renderProjects,
    getTasks: dataManager.getTasks,
    getProjects: dataManager.getProjects,
    addTask: dataManager.addTask,
    addProject: dataManager.addProject,
}