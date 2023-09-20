const Project = (name) => {
  let project = {
    name,
    tasks: [],
  };

  return Object.assign(project, newTaskCreator(project), taskRemover(project));
};

const newTaskCreator = (project) => ({
  addTask: (title, description, dueDate, priority) =>
    project.tasks.push({
      title,
      description,
      dueDate,
      priority,
    }),
});

const taskRemover = (project) => ({
  deleteTask: (index) => {
    project.tasks.splice(index, 1);
  },
});

export { Project };
