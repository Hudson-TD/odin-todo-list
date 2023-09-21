const Task = (title, description, dueDate, priority) => {
  let task = {
    title,
    description,
    dueDate,
    priority,
  };

  return Object.assign(task, handleEdit(task));
};

export { Task };
