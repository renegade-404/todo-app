import { renderNewProject, renderNewTask, renderNewTodayProject,
        renderNewTodayTask, completeTaskOrProject } from "./uiController";
import { dataManagement } from "./dataManager";

const dataManager = dataManagement();

export const domElements = {
    sidebarProjectsList: document.querySelector(".sidebar-projects-list"),
    sidebarTasksList: document.querySelector(".sidebar-tasks-list"),
    fieldProjectsList: document.querySelector(".field-projects-list"),
    fieldTasksList: document.querySelector(".field-tasks-list"),
}

export const functionsList = {
    rendTask: renderNewTask,
    rendTodayTask: renderNewTodayTask,
    rendProject: renderNewProject,
    rendTodayProject: renderNewTodayProject,
    getLastTask: dataManager.getLastTask,
    getLastProject: dataManager.getLastProject,
    addTaskToList: dataManager.addTaskToList,
    addProjectToList: dataManager.addProjectToList,
    getAllProjects: dataManager.getProjects,
    getAllTasks: dataManager.getTasks,
    completeTaskOrProject: completeTaskOrProject,
    getProperties: dataManager.getProperties,

}