export function dataManagement() {
    let projects = [];
    let tasks = [];

    function addProjectToList(projectObj) {
        projects.push(projectObj);
    }

    function addTaskToList(taskObj) {
        tasks.push(taskObj);
    }

    function getProjects() {
        return projects;
    }

    function getTasks() {
        return tasks;
    }

    function getLastProject() {
        return projects.at(-1);
    }

    function getLastTask() {
        return tasks.at(-1);
    }

    function removeProject(projectName) {
        projects.forEach((project, index) => {
            if (project.name == projectName) projects = projects.slice(index, 1);
        })
    }

    function removeTask(taskName) {
        tasks.forEach((task, index) => {
            if (task.name == taskName) tasks = tasks.slice(index, 1);
        })
    }

    return {addProjectToList, addTaskToList,
            getProjects, getTasks,
            removeProject, removeTask,
            getLastProject, getLastTask}
}