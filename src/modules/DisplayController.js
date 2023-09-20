import { Project } from "./Project.js";

const displayController = {
  projectsArr: [
    {
      name: "Test Project",
      tasks: [
        {
          title: "Eat Shoe",
          description: "Eat other shoe",
          dueDate: "9-20-2023",
          priority: "High",
        },
      ],
    },
  ],

  init: function () {
    this.cacheDom();
    this.initListeners();
    this.renderProjects();
  },
  cacheDom: function () {
    this.projectList = document.getElementById("projects-list");
    this.taskList = document.getElementById("tasks-container");
    this.formInput = document.getElementById("form-input");
    this.submitBtn = document.getElementById("submitBtn");
  },
  initListeners: function () {
    this.submitBtn.addEventListener("click", (event) => {
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

    console.log(targetProject);
    for (let i = 0; i < targetProject.tasks.length; i++) {
      let title = document.createElement("li");
      title.textContent = `${targetProject.tasks[i].title}`;
      this.taskList.appendChild(title);

      let description = document.createElement("li");
      description.textContent = `${targetProject.tasks[i].description}`;
      this.taskList.appendChild(description);

      let dueDate = document.createElement("li");
      dueDate.textContent = `${targetProject.tasks[i].dueDate}`;
      this.taskList.appendChild(dueDate);

      let priority = document.createElement("li");
      priority.textContent = `${targetProject.tasks[i].priority}`;
      this.taskList.appendChild(priority);
    }
  },
  handleSubmit: function () {
    let input = this.formInput.value;

    this.projectsArr.push(Project(input));
  },
  handleProjectSelect: function (event) {
    let targetIndex = event.target.dataset.project;
    displayController.renderTasks(targetIndex);
  },
};

export { displayController };
