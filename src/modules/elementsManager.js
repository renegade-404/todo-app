import { renderNewProject, renderNewTask, renderNewTodayProject,
        renderNewTodayTask, completeTaskOrProject, updateEntry, 
        getTodayDate, deleteEntryFromDom,
        editElements} from "./uiController";
import { dataManagement } from "./dataManager";
import { storageControl } from "./storageController";

const dataManager = dataManagement();
const storageController = storageControl();

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
    updateEntry: updateEntry,
    editProperties: dataManager.editProperties,
    getTodayDate: getTodayDate,
    removeProject: dataManager.removeProject,
    removeTask: dataManager.removeTask,
    deleteEntryFromDom: deleteEntryFromDom,
    editElements: editElements,
    getOneProp: dataManager.getOneProperty,
    removeFromStorage: storageController.removeFromStorage,
}