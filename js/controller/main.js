import { ToDo } from "../models/toDo.js";
import { ToDoList } from "../models/ToDoList.js";

let toDoList = new ToDoList();
toDoList.loadStorage();

document.querySelector("#addItem").onclick = function () {
  let item = new ToDo();
  item.id = toDoList.toDo.length + 1;
  item.content = document.querySelector("#newTask").value;
  toDoList.addNew(item);
};

window.removeItem = (id, status) => {
  toDoList.removeItem(id, status);
};

window.markDone = (id) => {
  toDoList.markdDone(id);
};
