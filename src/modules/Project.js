const Project = (name) => {
  let project = {
    name,
    tasks: [],
  };

  return Object.assign(project);
};

export { Project };
