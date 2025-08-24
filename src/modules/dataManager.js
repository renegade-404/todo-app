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

    function getProperties(type, id) {
        const properties = {};

        if (type == "task") {
            tasks.forEach(task => {
                if (task.id == id) {
                    properties.name = task.name;
                    properties.due = task.due;
                    properties.priority = task.priority;
                }
            })
        } else if (type == "project") {
            projects.forEach(project => {
                if (project.id == id) {
                    properties.name = project.name;
                    properties.due = project.due;
                    properties.priority = project.priority;
                }
            })
        } else console.error("inappropriate type");

        return properties;  
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
            getLastProject, getLastTask,
            getProperties}
}