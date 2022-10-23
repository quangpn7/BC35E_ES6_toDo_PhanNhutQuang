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
      console.log("Lại chạy vào đây");
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
          <button class="complete">
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
  }
  //remove
  removeItem(id, status) {
    if (status === "uncompleted") {
      let index = this.toDo.findIndex((item) => {
        item.id === id;
      });
      if (index === 0) {
        this.toDo.splice(index, 0);
      } else {
        this.toDo.splice(index, 1);
      }
    } else {
      let index = this.done.findIndex((item) => {
        item.id === id;
      });
      if (index === 0) {
        this.done.splice(index, 0);
      } else {
        this.done.splice(index, 1);
      }
    }
    this.renderContent(this.toDo, "#todo", this.done, "#completed");
    this.saveStorage();
  }
  //moving status
  markdDone(id) {
    let item = this.toDo.find((item) => {
      return item.id === id;
    });
    console.log(item);

    this.done.push(item);
    this.removeItem(item.id, "uncompleted");
    console.log(this.toDo);
  }
}
