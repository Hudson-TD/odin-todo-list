import { displayController } from "./DisplayController";

const storageController = {
  init: function () {
    if (!localStorage.getItem("projects")) {
      localStorage.setItem(
        "projects",
        JSON.stringify([
          {
            name: "Inbox",
            tasks: [
              {
                title: "Eat Breakfast",
                description:
                  "Eat a hearty breakfast before starting work today.",
                dueDate: "9-21-2023",
                priority: "Normal",
              },
            ],
          },
        ])
      );
    } else {
      displayController.projectsArr = JSON.parse(
        localStorage.getItem("projects")
      );
    }
  },
  update: function () {
    let newData = displayController.projectsArr;
    localStorage.setItem("projects", JSON.stringify(newData));
  },
};

export { storageController };
