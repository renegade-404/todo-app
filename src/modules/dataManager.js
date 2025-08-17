export function dataManagement() {
    let projects = [];
    let tasks = [];

    function addProject(projectObj) {
        projects.push(projectObj);
    }

    function addTask(taskObj) {
        tasks.push(taskObj);
    }

    function getProjects() {
        return projects;
    }

    function getTasks() {
        return tasks;
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

    return {addProject, addTask, getProjects, getTasks, removeProject, removeTask}
}