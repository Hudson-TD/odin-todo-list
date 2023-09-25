/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DisplayController.js":
/*!******************************************!*\
  !*** ./src/modules/DisplayController.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayController: () => (/* binding */ displayController)
/* harmony export */ });
/* harmony import */ var _Project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project.js */ "./src/modules/Project.js");
/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task.js */ "./src/modules/Task.js");
/* harmony import */ var _Storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Storage.js */ "./src/modules/Storage.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./src/modules/utils.js");





const displayController = {
  projectsArr: null,
  targetIndex: 0,

  init: function () {
    this.cacheDom();
    this.initListeners();
    _Storage_js__WEBPACK_IMPORTED_MODULE_2__.storageController.init();
    this.setDate();
    this.renderProjects();
  },
  cacheDom: function () {
    this.projectList = document.getElementById("projects-list");
    this.currentProject = document.getElementById("current-project");
    this.tasksContainer = document.getElementById("tasks-container");
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
    let date = _utils_js__WEBPACK_IMPORTED_MODULE_3__.userUtilities.generateDateValue();
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
      // let completeBtn = document.createElement("button");
      // completeBtn.addEventListener("click", this.handleTaskComplete);
      // completeBtn.innerText = `Complete`;
      // taskActions.appendChild(completeBtn);
      // let updateBtn = document.createElement("button");
      // updateBtn.innerText = `Update`;
      // updateBtn.addEventListener("click", this.handleTaskUpdate);
      // taskActions.appendChild(updateBtn);
      let deleteBtn = document.createElement("button");
      deleteBtn.innerText = `X`;
      deleteBtn.setAttribute("id", "delete-task");
      deleteBtn.addEventListener("click", this.handleTaskDelete);
      taskActions.appendChild(deleteBtn);
      task.appendChild(taskActions);
      this.taskList.appendChild(task);
    }
  },
  handleProjectSubmit: function () {
    this.projectsArr.push((0,_Project_js__WEBPACK_IMPORTED_MODULE_0__.Project)(displayController.ProjectFormInput.value));
    _Storage_js__WEBPACK_IMPORTED_MODULE_2__.storageController.update();

    displayController.ProjectFormInput.value = "";
  },
  handleProjectDelete: function (event) {
    event.stopPropagation();
    let project = event.target.parentNode.dataset.project;
    displayController.projectsArr.splice(project, 1);
    _Storage_js__WEBPACK_IMPORTED_MODULE_2__.storageController.update();
    window.location.reload();
    displayController.renderProjects();
  },
  handleTaskSubmit: function () {
    let selectedProject = displayController.currentProject.dataset.index;
    this.projectsArr[selectedProject].tasks.push(
      (0,_Task_js__WEBPACK_IMPORTED_MODULE_1__.Task)(
        displayController.newTaskTitle.value,
        displayController.newTaskDescription.value,
        displayController.newTaskDueDate.value,
        displayController.newTaskPriority.value
      )
    );
    _Storage_js__WEBPACK_IMPORTED_MODULE_2__.storageController.update();

    displayController.newTaskTitle.value = "";
    displayController.newTaskDescription.value = "";
    displayController.newTaskDueDate.value = "";
  },
  handleProjectSelect: function (event) {
    displayController.targetIndex = event.target.dataset.project;
    displayController.currentProject.innerText = `${
      displayController.projectsArr[displayController.targetIndex].name
    }`;
    displayController.tasksContainer.classList.remove("hiddenEl");
    displayController.renderTasks();
  },
  // handleTaskComplete: function (event) {},
  // handleTaskUpdate: function (event) {},
  handleTaskDelete: function (event) {
    let projectTarget = displayController.currentProject.dataset.index;
    let taskTarget = event.target.parentNode.parentNode.dataset.task;
    displayController.projectsArr[projectTarget].tasks.splice(taskTarget, 1);
    displayController.renderTasks(projectTarget);
    _Storage_js__WEBPACK_IMPORTED_MODULE_2__.storageController.update();
  },
};




/***/ }),

/***/ "./src/modules/Project.js":
/*!********************************!*\
  !*** ./src/modules/Project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project)
/* harmony export */ });
const Project = (name) => {
  let project = {
    name,
    tasks: [],
  };

  return Object.assign(project);
};




/***/ }),

/***/ "./src/modules/Storage.js":
/*!********************************!*\
  !*** ./src/modules/Storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   storageController: () => (/* binding */ storageController)
/* harmony export */ });
/* harmony import */ var _DisplayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DisplayController */ "./src/modules/DisplayController.js");


const storageController = {
  init: function () {
    if (!localStorage.getItem("projects")) {
      localStorage.setItem(
        "projects",
        JSON.stringify([
          {
            name: "Today",
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
      _DisplayController__WEBPACK_IMPORTED_MODULE_0__.displayController.projectsArr = JSON.parse(
        localStorage.getItem("projects")
      );
    }
  },
  update: function () {
    let newData = _DisplayController__WEBPACK_IMPORTED_MODULE_0__.displayController.projectsArr;
    localStorage.setItem("projects", JSON.stringify(newData));
  },
};




/***/ }),

/***/ "./src/modules/Task.js":
/*!*****************************!*\
  !*** ./src/modules/Task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
const Task = (title, description, dueDate, priority) => {
  let task = {
    title,
    description,
    dueDate,
    priority,
  };

  return Object.assign(task);
};




/***/ }),

/***/ "./src/modules/utils.js":
/*!******************************!*\
  !*** ./src/modules/utils.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   userUtilities: () => (/* binding */ userUtilities)
/* harmony export */ });
const userUtilities = {
  init: function () {},

  generateDateValue: function () {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let today = new Date().toLocaleDateString(undefined, options);
    return today;
  },
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_DisplayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/DisplayController */ "./src/modules/DisplayController.js");


console.log("Build successful");

_modules_DisplayController__WEBPACK_IMPORTED_MODULE_0__.displayController.init();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7O1VDZnpCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOZ0U7O0FBRWhFOztBQUVBLHlFQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvRGlzcGxheUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Rhc2suanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy91dGlscy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi9Qcm9qZWN0LmpzXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vVGFzay5qc1wiO1xuaW1wb3J0IHsgc3RvcmFnZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9TdG9yYWdlLmpzXCI7XG5pbXBvcnQgeyB1c2VyVXRpbGl0aWVzIH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcblxuY29uc3QgZGlzcGxheUNvbnRyb2xsZXIgPSB7XG4gIHByb2plY3RzQXJyOiBudWxsLFxuICB0YXJnZXRJbmRleDogMCxcblxuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jYWNoZURvbSgpO1xuICAgIHRoaXMuaW5pdExpc3RlbmVycygpO1xuICAgIHN0b3JhZ2VDb250cm9sbGVyLmluaXQoKTtcbiAgICB0aGlzLnNldERhdGUoKTtcbiAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XG4gIH0sXG4gIGNhY2hlRG9tOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtbGlzdFwiKTtcbiAgICB0aGlzLmN1cnJlbnRQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50LXByb2plY3RcIik7XG4gICAgdGhpcy50YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza3MtY29udGFpbmVyXCIpO1xuICAgIHRoaXMudGFza0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tzLWxpc3RcIik7XG4gICAgdGhpcy51dGlsaXRpZXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXRpbGl0aWVzXCIpO1xuICAgIHRoaXMuUHJvamVjdEZvcm1JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtLWlucHV0XCIpO1xuICAgIHRoaXMuc3VibWl0UHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0UHJvamVjdEJ0blwiKTtcbiAgICB0aGlzLm5ld1Rhc2tUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay10aXRsZS1pbnB1dFwiKTtcbiAgICB0aGlzLm5ld1Rhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kZXNjcmlwdGlvbi1pbnB1dFwiKTtcbiAgICB0aGlzLm5ld1Rhc2tEdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWR1ZS1kYXRlLWlucHV0XCIpO1xuICAgIHRoaXMubmV3VGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXByaW9yaXR5LWlucHV0XCIpO1xuICAgIHRoaXMuc3VibWl0VGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0VGFza0J0blwiKTtcbiAgICB0aGlzLmRhdGVUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50LWRhdGVcIik7XG4gIH0sXG4gIGluaXRMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnN1Ym1pdFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuaGFuZGxlUHJvamVjdFN1Ym1pdCgpO1xuICAgICAgdGhpcy5wcm9qZWN0TGlzdC5pbm5lclRleHQgPSBcIlwiO1xuICAgICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xuICAgIH0pO1xuICAgIHRoaXMuc3VibWl0VGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5oYW5kbGVUYXNrU3VibWl0KCk7XG4gICAgICB0aGlzLnRhc2tMaXN0LmlubmVyVGV4dCA9IFwiXCI7XG4gICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgfSk7XG4gIH0sXG4gIHNldERhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZGF0ZSA9IHVzZXJVdGlsaXRpZXMuZ2VuZXJhdGVEYXRlVmFsdWUoKTtcbiAgICB0aGlzLmRhdGVUZXh0LmlubmVyVGV4dCA9IGAke2RhdGV9YDtcbiAgfSxcbiAgcmVuZGVyUHJvamVjdHM6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wcm9qZWN0c0FyciA9PT0gbnVsbCkge1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvamVjdHNBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGxldCB4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIHguY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idXR0b25cIik7XG4gICAgICB4LmlubmVyVGV4dCA9IFwiWFwiO1xuICAgICAgeC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVQcm9qZWN0RGVsZXRlKTtcbiAgICAgIGxpbmUuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XG4gICAgICBsaW5lLmlubmVyVGV4dCA9IGAke3RoaXMucHJvamVjdHNBcnJbaV0ubmFtZX1gO1xuICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgYCR7aX1gKTtcbiAgICAgIGxpbmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuaGFuZGxlUHJvamVjdFNlbGVjdCk7XG4gICAgICBsaW5lLmFwcGVuZENoaWxkKHgpO1xuICAgICAgdGhpcy5wcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChsaW5lKTtcbiAgICB9XG4gIH0sXG4gIHJlbmRlclRhc2tzOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy50YXNrTGlzdC5pbm5lclRleHQgPSBcIlwiO1xuICAgIGxldCB0YXJnZXRQcm9qZWN0ID0gZGlzcGxheUNvbnRyb2xsZXIucHJvamVjdHNBcnJbdGhpcy50YXJnZXRJbmRleF07XG4gICAgdGhpcy5jdXJyZW50UHJvamVjdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC10aXRsZVwiKTtcbiAgICB0aGlzLmN1cnJlbnRQcm9qZWN0LnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiwgYCR7dGhpcy50YXJnZXRJbmRleH1gKTtcbiAgICBsZXQgaGVhZGVyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIGhlYWRlclJvdy5jbGFzc0xpc3QuYWRkKFwiYm9yZGVybGVzc1wiKTtcblxuICAgIGxldCB0aE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gICAgdGhOYW1lLmlubmVyVGV4dCA9IFwiTmFtZVwiO1xuICAgIGhlYWRlclJvdy5hcHBlbmRDaGlsZCh0aE5hbWUpO1xuXG4gICAgbGV0IHRoRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gICAgdGhEZXNjcmlwdGlvbi5pbm5lclRleHQgPSBcIkRlc2NyaXB0aW9uXCI7XG4gICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKHRoRGVzY3JpcHRpb24pO1xuXG4gICAgbGV0IHRoRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgICB0aER1ZURhdGUuaW5uZXJUZXh0ID0gXCJEdWUtRGF0ZVwiO1xuICAgIGhlYWRlclJvdy5hcHBlbmRDaGlsZCh0aER1ZURhdGUpO1xuXG4gICAgbGV0IHRoUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gICAgdGhQcmlvcml0eS5pbm5lclRleHQgPSBcIlByaW9yaXR5XCI7XG4gICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKHRoUHJpb3JpdHkpO1xuXG4gICAgbGV0IHRoQWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgICB0aEFjdGlvbnMuaW5uZXJUZXh0ID0gXCJBY3Rpb25zXCI7XG4gICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKHRoQWN0aW9ucyk7XG5cbiAgICB0aGlzLnRhc2tMaXN0LmFwcGVuZENoaWxkKGhlYWRlclJvdyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldFByb2plY3QudGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgICAgdGFzay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tcIiwgYCR7aX1gKTtcblxuICAgICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgIHRhc2tUaXRsZS5pbm5lclRleHQgPSBgJHt0YXJnZXRQcm9qZWN0LnRhc2tzW2ldLnRpdGxlfWA7XG4gICAgICB0YXNrLmFwcGVuZENoaWxkKHRhc2tUaXRsZSk7XG5cbiAgICAgIGxldCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgICB0YXNrRGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gYCR7dGFyZ2V0UHJvamVjdC50YXNrc1tpXS5kZXNjcmlwdGlvbn1gO1xuICAgICAgdGFzay5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuXG4gICAgICBsZXQgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgICB0YXNrRHVlRGF0ZS5pbm5lclRleHQgPSBgJHt0YXJnZXRQcm9qZWN0LnRhc2tzW2ldLmR1ZURhdGV9YDtcbiAgICAgIHRhc2suYXBwZW5kQ2hpbGQodGFza0R1ZURhdGUpO1xuXG4gICAgICBsZXQgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgICAgdGFza1ByaW9yaXR5LmlubmVyVGV4dCA9IGAke3RhcmdldFByb2plY3QudGFza3NbaV0ucHJpb3JpdHl9YDtcbiAgICAgIGlmICh0YXNrUHJpb3JpdHkuaW5uZXJUZXh0ID09PSBcIkxvd1wiKSB7XG4gICAgICAgIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKFwibG93XCIpO1xuICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHkuaW5uZXJUZXh0ID09PSBcIk5vcm1hbFwiKSB7XG4gICAgICAgIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKFwibm9ybWFsXCIpO1xuICAgICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHkuaW5uZXJUZXh0ID09PSBcIkhpZ2hcIikge1xuICAgICAgICB0YXNrUHJpb3JpdHkuY2xhc3NMaXN0LmFkZChcImhpZ2hcIik7XG4gICAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eS5pbm5lclRleHQgPT09IFwiVXJnZW50XCIpIHtcbiAgICAgICAgdGFza1ByaW9yaXR5LmNsYXNzTGlzdC5hZGQoXCJ1cmdlbnRcIik7XG4gICAgICB9XG4gICAgICB0YXNrLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eSk7XG5cbiAgICAgIHRoaXMudGFza0xpc3QuYXBwZW5kQ2hpbGQodGFzayk7XG5cbiAgICAgIGxldCB0YXNrQWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgIC8vIGxldCBjb21wbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAvLyBjb21wbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVUYXNrQ29tcGxldGUpO1xuICAgICAgLy8gY29tcGxldGVCdG4uaW5uZXJUZXh0ID0gYENvbXBsZXRlYDtcbiAgICAgIC8vIHRhc2tBY3Rpb25zLmFwcGVuZENoaWxkKGNvbXBsZXRlQnRuKTtcbiAgICAgIC8vIGxldCB1cGRhdGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgLy8gdXBkYXRlQnRuLmlubmVyVGV4dCA9IGBVcGRhdGVgO1xuICAgICAgLy8gdXBkYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZVRhc2tVcGRhdGUpO1xuICAgICAgLy8gdGFza0FjdGlvbnMuYXBwZW5kQ2hpbGQodXBkYXRlQnRuKTtcbiAgICAgIGxldCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZGVsZXRlQnRuLmlubmVyVGV4dCA9IGBYYDtcbiAgICAgIGRlbGV0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRlbGV0ZS10YXNrXCIpO1xuICAgICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZVRhc2tEZWxldGUpO1xuICAgICAgdGFza0FjdGlvbnMuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcbiAgICAgIHRhc2suYXBwZW5kQ2hpbGQodGFza0FjdGlvbnMpO1xuICAgICAgdGhpcy50YXNrTGlzdC5hcHBlbmRDaGlsZCh0YXNrKTtcbiAgICB9XG4gIH0sXG4gIGhhbmRsZVByb2plY3RTdWJtaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnByb2plY3RzQXJyLnB1c2goUHJvamVjdChkaXNwbGF5Q29udHJvbGxlci5Qcm9qZWN0Rm9ybUlucHV0LnZhbHVlKSk7XG4gICAgc3RvcmFnZUNvbnRyb2xsZXIudXBkYXRlKCk7XG5cbiAgICBkaXNwbGF5Q29udHJvbGxlci5Qcm9qZWN0Rm9ybUlucHV0LnZhbHVlID0gXCJcIjtcbiAgfSxcbiAgaGFuZGxlUHJvamVjdERlbGV0ZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgbGV0IHByb2plY3QgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnByb2plY3Q7XG4gICAgZGlzcGxheUNvbnRyb2xsZXIucHJvamVjdHNBcnIuc3BsaWNlKHByb2plY3QsIDEpO1xuICAgIHN0b3JhZ2VDb250cm9sbGVyLnVwZGF0ZSgpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICBkaXNwbGF5Q29udHJvbGxlci5yZW5kZXJQcm9qZWN0cygpO1xuICB9LFxuICBoYW5kbGVUYXNrU3VibWl0OiBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHNlbGVjdGVkUHJvamVjdCA9IGRpc3BsYXlDb250cm9sbGVyLmN1cnJlbnRQcm9qZWN0LmRhdGFzZXQuaW5kZXg7XG4gICAgdGhpcy5wcm9qZWN0c0FycltzZWxlY3RlZFByb2plY3RdLnRhc2tzLnB1c2goXG4gICAgICBUYXNrKFxuICAgICAgICBkaXNwbGF5Q29udHJvbGxlci5uZXdUYXNrVGl0bGUudmFsdWUsXG4gICAgICAgIGRpc3BsYXlDb250cm9sbGVyLm5ld1Rhc2tEZXNjcmlwdGlvbi52YWx1ZSxcbiAgICAgICAgZGlzcGxheUNvbnRyb2xsZXIubmV3VGFza0R1ZURhdGUudmFsdWUsXG4gICAgICAgIGRpc3BsYXlDb250cm9sbGVyLm5ld1Rhc2tQcmlvcml0eS52YWx1ZVxuICAgICAgKVxuICAgICk7XG4gICAgc3RvcmFnZUNvbnRyb2xsZXIudXBkYXRlKCk7XG5cbiAgICBkaXNwbGF5Q29udHJvbGxlci5uZXdUYXNrVGl0bGUudmFsdWUgPSBcIlwiO1xuICAgIGRpc3BsYXlDb250cm9sbGVyLm5ld1Rhc2tEZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG4gICAgZGlzcGxheUNvbnRyb2xsZXIubmV3VGFza0R1ZURhdGUudmFsdWUgPSBcIlwiO1xuICB9LFxuICBoYW5kbGVQcm9qZWN0U2VsZWN0OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBkaXNwbGF5Q29udHJvbGxlci50YXJnZXRJbmRleCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnByb2plY3Q7XG4gICAgZGlzcGxheUNvbnRyb2xsZXIuY3VycmVudFByb2plY3QuaW5uZXJUZXh0ID0gYCR7XG4gICAgICBkaXNwbGF5Q29udHJvbGxlci5wcm9qZWN0c0FycltkaXNwbGF5Q29udHJvbGxlci50YXJnZXRJbmRleF0ubmFtZVxuICAgIH1gO1xuICAgIGRpc3BsYXlDb250cm9sbGVyLnRhc2tzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5FbFwiKTtcbiAgICBkaXNwbGF5Q29udHJvbGxlci5yZW5kZXJUYXNrcygpO1xuICB9LFxuICAvLyBoYW5kbGVUYXNrQ29tcGxldGU6IGZ1bmN0aW9uIChldmVudCkge30sXG4gIC8vIGhhbmRsZVRhc2tVcGRhdGU6IGZ1bmN0aW9uIChldmVudCkge30sXG4gIGhhbmRsZVRhc2tEZWxldGU6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGxldCBwcm9qZWN0VGFyZ2V0ID0gZGlzcGxheUNvbnRyb2xsZXIuY3VycmVudFByb2plY3QuZGF0YXNldC5pbmRleDtcbiAgICBsZXQgdGFza1RhcmdldCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGF0YXNldC50YXNrO1xuICAgIGRpc3BsYXlDb250cm9sbGVyLnByb2plY3RzQXJyW3Byb2plY3RUYXJnZXRdLnRhc2tzLnNwbGljZSh0YXNrVGFyZ2V0LCAxKTtcbiAgICBkaXNwbGF5Q29udHJvbGxlci5yZW5kZXJUYXNrcyhwcm9qZWN0VGFyZ2V0KTtcbiAgICBzdG9yYWdlQ29udHJvbGxlci51cGRhdGUoKTtcbiAgfSxcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlDb250cm9sbGVyIH07XG4iLCJjb25zdCBQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgbGV0IHByb2plY3QgPSB7XG4gICAgbmFtZSxcbiAgICB0YXNrczogW10sXG4gIH07XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocHJvamVjdCk7XG59O1xuXG5leHBvcnQgeyBQcm9qZWN0IH07XG4iLCJpbXBvcnQgeyBkaXNwbGF5Q29udHJvbGxlciB9IGZyb20gXCIuL0Rpc3BsYXlDb250cm9sbGVyXCI7XG5cbmNvbnN0IHN0b3JhZ2VDb250cm9sbGVyID0ge1xuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgXCJwcm9qZWN0c1wiLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJUb2RheVwiLFxuICAgICAgICAgICAgdGFza3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVhdCBCcmVha2Zhc3RcIixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICAgICAgICAgIFwiRWF0IGEgaGVhcnR5IGJyZWFrZmFzdCBiZWZvcmUgc3RhcnRpbmcgd29yayB0b2RheS5cIixcbiAgICAgICAgICAgICAgICBkdWVEYXRlOiBcIjktMjEtMjAyM1wiLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiBcIk5vcm1hbFwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGxheUNvbnRyb2xsZXIucHJvamVjdHNBcnIgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpXG4gICAgICApO1xuICAgIH1cbiAgfSxcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IG5ld0RhdGEgPSBkaXNwbGF5Q29udHJvbGxlci5wcm9qZWN0c0FycjtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KG5ld0RhdGEpKTtcbiAgfSxcbn07XG5cbmV4cG9ydCB7IHN0b3JhZ2VDb250cm9sbGVyIH07XG4iLCJjb25zdCBUYXNrID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgbGV0IHRhc2sgPSB7XG4gICAgdGl0bGUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgZHVlRGF0ZSxcbiAgICBwcmlvcml0eSxcbiAgfTtcblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih0YXNrKTtcbn07XG5cbmV4cG9ydCB7IFRhc2sgfTtcbiIsImNvbnN0IHVzZXJVdGlsaXRpZXMgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uICgpIHt9LFxuXG4gIGdlbmVyYXRlRGF0ZVZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHdlZWtkYXk6IFwibG9uZ1wiLFxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgICBtb250aDogXCJsb25nXCIsXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgIH07XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcodW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICByZXR1cm4gdG9kYXk7XG4gIH0sXG59O1xuXG5leHBvcnQgeyB1c2VyVXRpbGl0aWVzIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGRpc3BsYXlDb250cm9sbGVyIH0gZnJvbSBcIi4vbW9kdWxlcy9EaXNwbGF5Q29udHJvbGxlclwiO1xuXG5jb25zb2xlLmxvZyhcIkJ1aWxkIHN1Y2Nlc3NmdWxcIik7XG5cbmRpc3BsYXlDb250cm9sbGVyLmluaXQoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==