import { Project } from "./Project.js";
import { Task } from "./Task.js";
import { storageController } from "./Storage.js";
import { userUtilities } from "./utils.js";

const displayController = {
  projectsArr: null,
  targetIndex: 0,

  init: function () {
    this.cacheDom();
    this.initListeners();
    storageController.init();
    this.setDate();
    this.renderProjects();
  },
  cacheDom: function () {
    this.projectList = document.getElementById("projects-list");
    this.currentProject = document.getElementById("current-project");
    this.taskList = document.getElementById("tasks-list");
    this.utilitiesEl = document.getElementById("utilities");
    this.ProjectFormInput = document.getElementById("project-form-input");
    this.submitProject = document.getElementById("submitProjectBtn");
    this.newTaskTitle = document.getElementById("task-title-input");
    this.newTaskDescription = document.getElementById("task-description-input");
    this.newTaskDueDate = document.getElementById("task-due-date-input");
    this.newTaskPriority = document.getElementById("task-priority-input");
    this.submitTask = document.getElementById("submitTaskBtn");
    this.dateText = document.getElementById("current-date");
  },
  initListeners: function () {
    this.submitProject.addEventListener("click", (event) => {
      event.preventDefault();
      this.handleProjectSubmit();
      this.projectList.innerText = "";
      this.renderProjects();
    });
    this.submitTask.addEventListener("click", (event) => {
      event.preventDefault();
      this.handleTaskSubmit();
      this.taskList.innerText = "";
      this.renderTasks();
    });
  },
  setDate: function () {
    let date = userUtilities.generateDateValue();
    this.dateText.innerText = `${date}`;
  },
  renderProjects: function () {
    if (this.projectsArr === null) {
      window.location.reload();
    }
    for (let i = 0; i < this.projectsArr.length; i++) {
      let line = document.createElement("button");
      let x = document.createElement("button");
      x.classList.add("delete-button");
      x.innerText = "X";
      x.addEventListener("click", this.handleProjectDelete);
      line.classList.add("project");
      line.innerText = `${this.projectsArr[i].name}`;
      line.setAttribute("data-project", `${i}`);
      line.addEventListener("click", this.handleProjectSelect);
      line.appendChild(x);
      this.projectList.appendChild(line);
    }
  },
  renderTasks: function () {
    this.taskList.innerText = "";
    let targetProject = displayController.projectsArr[this.targetIndex];
    this.currentProject.classList.add("project-title");
    this.currentProject.setAttribute("data-index", `${this.targetIndex}`);
    let headerRow = document.createElement("tr");
    headerRow.classList.add("borderless");

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
      if (taskPriority.innerText === "Low") {
        taskPriority.classList.add("low");
      } else if (taskPriority.innerText === "Normal") {
        taskPriority.classList.add("normal");
      } else if (taskPriority.innerText === "High") {
        taskPriority.classList.add("high");
      } else if (taskPriority.innerText === "Urgent") {
        taskPriority.classList.add("urgent");
      }
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
  handleProjectSubmit: function () {
    this.projectsArr.push(Project(displayController.ProjectFormInput.value));
    storageController.update();

    displayController.ProjectFormInput.value = "";
  },
  handleProjectDelete: function (event) {
    event.stopPropagation();
    let project = event.target.parentNode.dataset.project;
    displayController.projectsArr.splice(project, 1);
    storageController.update();
    window.location.reload();
    displayController.renderProjects();
  },
  handleTaskSubmit: function () {
    let selectedProject = displayController.currentProject.dataset.index;
    this.projectsArr[selectedProject].tasks.push(
      Task(
        displayController.newTaskTitle.value,
        displayController.newTaskDescription.value,
        displayController.newTaskDueDate.value,
        displayController.newTaskPriority.value
      )
    );
    storageController.update();

    displayController.newTaskTitle.value = "";
    displayController.newTaskDescription.value = "";
    displayController.newTaskDueDate.value = "";
    displayController.newTaskPriority.value = "";
  },
  handleProjectSelect: function (event) {
    displayController.targetIndex = event.target.dataset.project;
    displayController.currentProject.innerText = `${
      displayController.projectsArr[displayController.targetIndex].name
    }`;
    displayController.utilitiesEl.classList.remove("hidden");
    displayController.renderTasks();
  },
  handleTaskComplete: function (event) {},
  handleTaskUpdate: function (event) {},
  handleTaskDelete: function (event) {
    let projectTarget = displayController.currentProject.dataset.index;
    let taskTarget = event.target.parentNode.parentNode.dataset.task;
    displayController.projectsArr[projectTarget].tasks.splice(taskTarget, 1);
    displayController.renderTasks(projectTarget);
    storageController.update();
  },
};

export { displayController };
