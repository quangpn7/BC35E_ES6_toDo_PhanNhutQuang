export class ToDoList {
  toDo = [];
  done = [];

  //function

  //render
  renderContent(arrTodo, selectorToDo, arrDone, selectorDone) {
    //TO DO LIST
    let toDoContentHTML = "";
    if (arrTodo.length > 0) {
      for (let item of arrTodo) {
        toDoContentHTML += `
        <li>
                <span>${item.content}</span>
                <div class="buttons">
                  <button class="remove" onclick="removeItem(${item.id},'uncompleted')">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <button class="complete" onclick="markDone(${item.id})">
                    <i class="far fa-check-circle"></i>
                  </button>
                </div>
              </li>
        `;
      }
    }
    document.querySelector(selectorToDo).innerHTML = toDoContentHTML;
    //DONE LIST
    let doneContentHTML = "";
    if (arrDone.length > 0) {
      for (let item of arrDone) {
        doneContentHTML += `
        <li>
        <span>${item.content}</span>
        <div class="buttons">
          <button class="remove" onclick="removeItem(${item.id},'completed')">
            <i class="fas fa-trash-alt"></i>
          </button>
          <button class="complete" onclick="markUndo(${item.id}, 'completed')">
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </li>
          `;
      }
    }
    document.querySelector(selectorDone).innerHTML = doneContentHTML;
  }
  //save local
  saveStorage() {
    let toDoList = JSON.stringify(this.toDo);
    localStorage.setItem("toDoList", toDoList);
    let doneList = JSON.stringify(this.done);
    localStorage.setItem("doneList", doneList);
  }
  //load local
  loadStorage() {
    if (localStorage.getItem("toDoList")) {
      this.toDo = JSON.parse(localStorage.getItem("toDoList"));
    }
    if (localStorage.getItem("doneList")) {
      this.done = JSON.parse(localStorage.getItem("doneList"));
    }
    this.renderContent(this.toDo, "#todo", this.done, "#completed");
  }
  //push new work
  addNew(item) {
    this.toDo.push(item);
    this.renderContent(this.toDo, "#todo", this.done, "#completed");
    this.saveStorage();
    document.querySelector("selector");
  }
  //remove
  removeItem(id, status) {
    if (status === "uncompleted") {
      let index = this.toDo.findIndex((item) => {
        return item.id == id;
      });
      this.toDo.splice(index, 1);
    } else {
      let index = this.done.findIndex((item) => {
        return item.id == id;
      });
      this.done.splice(index, 1);
    }
    this.renderContent(this.toDo, "#todo", this.done, "#completed");
    this.saveStorage();
  }
  //moving status
  markdDone(id) {
    let item = this.toDo.find((item) => {
      return item.id === id;
    });

    this.done.push(item);
    this.removeItem(item.id, "uncompleted");
  }
  markUndo(id) {
    let item = this.done.find((item) => {
      return item.id === id;
    });
    this.toDo.push(item);
    this.removeItem(item.id, "completed");
  }
  //Sort
  sortToDo(value) {
    if (value === true) {
      //a-z
      this.toDo.sort((item1, item2) => {
        let item1Str = item1.content.toLocaleLowerCase().trim();
        let item2Str = item2.content.toLocaleLowerCase().trim();
        if (item1Str < item2Str) {
          return -1;
        }
      });
    } else {
      //z-a
      this.toDo.sort((item1, item2) => {
        let item1Str = item1.content.toLocaleLowerCase().trim();
        let item2Str = item2.content.toLocaleLowerCase().trim();
        if (item1Str > item2Str) {
          return -1;
        }
      });
    }
    this.renderContent(this.toDo, "#todo", this.done, "#completed");
    this.saveStorage();
  }
}
