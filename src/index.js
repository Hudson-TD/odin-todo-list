import { Project } from "./modules/Project";

let projectList = [];

const projects = document.getElementById("projects-list");
const formInput = document.getElementById("form-input");
const submitBtn = document.getElementById("submitBtn");

function handleSubmit() {
  let input = formInput.value;

  projectList.push(Project(input));
}

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  handleSubmit();
  console.log(projectList);
  projects.innerText = "";
  renderProjects();
});

console.log("Build successful");

let newProject = Project("Test Project");
projectList.push(newProject);

console.log(projectList);

function renderProjects() {
  for (let i = 0; i < projectList.length; i++) {
    let line = document.createElement("li");
    line.innerText = `${projectList[i].name}`;
    projects.appendChild(line);
  }
}

renderProjects();
