import { Project } from "./Project.js";
import { storageController } from "./Storage.js";

const displayController = {
  projectsArr: null,

  init: function () {
    this.cacheDom();
    this.initListeners();
    storageController.init();
    this.renderProjects();
  },
  cacheDom: function () {
    this.projectList = document.getElementById("projects-list");
    this.currentProject = document.getElementById("current-project");
    this.taskList = document.getElementById("tasks-list");
    this.ProjectFormInput = document.getElementById("project-form-input");
    this.submitProject = document.getElementById("submitProjectBtn");
    this.submitTask = document.getElementById("submitTaskBtn");
  },
  initListeners: function () {
    this.submitProject.addEventListener("click", (event) => {
      event.preventDefault();
      this.handleSubmit();
      console.log(this.projectsArr);
      this.projectList.innerText = "";
      this.renderProjects();
    });
  },
  renderProjects: function () {
    for (let i = 0; i < this.projectsArr.length; i++) {
      let line = document.createElement("button");
      line.classList.add("project");
      line.innerText = `${this.projectsArr[i].name}`;
      line.setAttribute("data-project", `${i}`);
      line.addEventListener("click", this.handleProjectSelect);
      this.projectList.appendChild(line);
    }
  },
  renderTasks: function (index) {
    let targetProject = this.projectsArr[index];
    this.taskList.innerText = "";
    this.currentProject.innerText = `${targetProject.name}`;
    this.currentProject.setAttribute("id", `${index}`);
    let headerRow = document.createElement("tr");

    let thName = document.createElement("th");
    thName.innerText = "Name";
    headerRow.appendChild(thName);

    let thDescription = document.createElement("th");
    thDescription.innerText = "Description";
    headerRow.appendChild(thDescription);

    let thDueDate = document.createElement("th");
    thDueDate.innerText = "Due-Date";
    headerRow.appendChild(thDueDate);

    let thPriority = document.createElement("th");
    thPriority.innerText = "Priority";
    headerRow.appendChild(thPriority);

    let thActions = document.createElement("th");
    thActions.innerText = "Actions";
    headerRow.appendChild(thActions);

    this.taskList.appendChild(headerRow);

    for (let i = 0; i < targetProject.tasks.length; i++) {
      let task = document.createElement("tr");
      task.setAttribute("data-task", `${i}`);

      let taskTitle = document.createElement("td");
      taskTitle.innerText = `${targetProject.tasks[i].title}`;
      task.appendChild(taskTitle);

      let taskDescription = document.createElement("td");
      taskDescription.innerText = `${targetProject.tasks[i].description}`;
      task.appendChild(taskDescription);

      let taskDueDate = document.createElement("td");
      taskDueDate.innerText = `${targetProject.tasks[i].dueDate}`;
      task.appendChild(taskDueDate);

      let taskPriority = document.createElement("td");
      taskPriority.innerText = `${targetProject.tasks[i].priority}`;
      task.appendChild(taskPriority);

      this.taskList.appendChild(task);

      let taskActions = document.createElement("td");
      let completeBtn = document.createElement("button");
      completeBtn.addEventListener("click", this.handleTaskComplete);
      completeBtn.innerText = `Complete`;
      taskActions.appendChild(completeBtn);
      let updateBtn = document.createElement("button");
      updateBtn.innerText = `Update`;
      updateBtn.addEventListener("click", this.handleTaskUpdate);
      taskActions.appendChild(updateBtn);
      let deleteBtn = document.createElement("button");
      deleteBtn.innerText = `Delete`;
      deleteBtn.addEventListener("click", this.handleTaskDelete);
      taskActions.appendChild(deleteBtn);
      task.appendChild(taskActions);
      this.taskList.appendChild(task);
    }
  },
  handleSubmit: function () {
    let input = this.ProjectFormInput.value;
    this.projectsArr.push(Project(input));
    storageController.update();
  },
  handleProjectSelect: function (event) {
    let targetIndex = event.target.dataset.project;
    displayController.renderTasks(targetIndex);
  },
  handleTaskComplete: function (event) {},
  handleTaskUpdate: function (event) {},
  handleTaskDelete: function (event) {
    let projectTarget = displayController.currentProject.getAttribute("id");
    let taskTarget = event.target.parentNode.parentNode.dataset.task;
    displayController.projectsArr[projectTarget].tasks.splice(taskTarget, 1);
    displayController.renderTasks(projectTarget);
    storageController.update();
  },
};

export { displayController };
