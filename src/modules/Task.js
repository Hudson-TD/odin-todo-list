const Task = (title, description, dueDate, priority) => {
  let task = {
    title,
    description,
    dueDate,
    priority,
  };

  return Object.assign(task, handleEdit(task));
};

const handleEdit = (task) => ({
  edit: (title, description, dueDate, priority) => {
    (this.title = title),
      (this.description = description),
      (this.dueDate = dueDate),
      (this.priority = priority);
  },
});
export { Task };
