import { ToDo } from "../models/toDo.js";
import { ToDoList } from "../models/ToDoList.js";

let toDoList = new ToDoList();
toDoList.loadStorage();

//FUNCTION ADD NEW TASK
window.addNew = () => {
  let inputField = document.querySelector("#newTask").value;
  if (inputField.trim() !== "") {
    let item = new ToDo();
    item.id = toDoList.toDo.length + 1;
    item.content = document.querySelector("#newTask").value;
    toDoList.addNew(item);
    document.querySelector("#newTask").value = "";
  }
  document.querySelector("#newTask").focus();
};
//ADD BY ENTER KEY
window.handleKeyPress = (e) => {
  let keyPress = e.keyCode || e.which;
  if (keyPress == 13) {
    addNew();
  }
};
//ADD BY CLICK BUTTON "+"
document.querySelector("#addItem").onclick = function () {
  addNew();
};

//FUNCTION REMOVE ITEM
window.removeItem = (id, status) => {
  toDoList.removeItem(id, status);
};

//FUNCTION MARK DONE WORK
window.markDone = (id) => {
  toDoList.markDone(id);
};

//FUNCTION UNDO MARK
window.markUndo = (id) => {
  toDoList.markUndo(id);
};

//FUNCTION SORT A-Z,Z-A
window.sort = (value) => {
  toDoList.sortToDo(value);
};
