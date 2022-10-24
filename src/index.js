// class for todo-lists
class TodoList {
    constructor(name) {
      this.name = name;
      this.todo = [];
      todoListArray.push(this); // push all the instances into same array
    };
  };

// create array for todo-list objects
const todoListArray = [];

// create todo lists
const defaultList = new TodoList("Default");
const secondList = new TodoList("Second list");

// class for todo's
class Todo {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    };
};

// create some todo objects
const todo1  = new Todo("Title 1", "Description", "Due date", "Priority", "Notes");
todoListArray[0].todo.push(todo1);

const todo2  = new Todo("Title 2", "Description", "Due date", "Priority", "Notes");
todoListArray[0].todo.push(todo2);

const todoIntoSecondList = new Todo("Title, second list", "Description", "Due date", "Priority", "Notes");
todoListArray[1].todo.push(todoIntoSecondList);

// add array of todo-list objects to NAV
function todoListsToNav() {
    const ul = document.getElementById("todo-lists");
    ul.innerHTML = "";
    for (var i = 0; i < todoListArray.length; i++) {
        l1 = document.createElement("li");
        l1.setAttribute("data",`${i}`);
        l1.textContent = `${todoListArray[i].name}`;
        ul.appendChild(l1);
    };
};

// clear tables
function clearTables() {
    const tableRowList = document.getElementsByClassName("table-row")
    for (var i = 0; i < tableRowList.length; i++){
        tableRowList[0].parentNode.removeChild(tableRowList[0]);
    };
};

// make active nav item bold
function makeNavBold(todoListNo){
    let todoListChildren = document.getElementById('todo-lists').children;
    for (var i = 0; i < todoListChildren.length; i++) { // reset font weights
        todoListChildren[i].style.fontWeight = 'normal';
    };

    todoListChildren[todoListNo].style.fontWeight = 'bold';
};

// add todo objects into MAIN
function todoToMain(todoListNo) {
    if(todoListArray[todoListNo].todo.length === 0) { // if array is empty
        return;
    }

    else {
        makeNavBold(todoListNo);
        clearTables();
        createTable(todoListNo);
        setUpMainButtons(todoListNo);
    };
};


// create main table
function createTable(todoListNo) {
    const table = document.getElementById("table");

    for (var i = 0; i < todoListArray[todoListNo].todo.length; i++) {
        const table = document.getElementById("table");
        
        const li = document.createElement("li");
        li.setAttribute("class", "table-row")
        
        const div0 = document.createElement("div");
        div0.setAttribute("class", "col-0");
        
        const checkbox = document.createElement("img")
        checkbox.setAttribute("src", "img/checkbox-blank.svg")
        checkbox.setAttribute("class", "checkbox")
        
        const div1 = document.createElement("div");
        div1.textContent = `${todoListArray[todoListNo].todo[i].title}`;
        div1.setAttribute("class", "col-1");
        
        const div2 = document.createElement("div");
        div2.textContent = `${todoListArray[todoListNo].todo[i].dueDate}`;
        div2.setAttribute("class", "col-2");
        
        const div3 = document.createElement("div");
        div3.textContent = `${todoListArray[todoListNo].todo[i].priority}`;
        div3.setAttribute("class", "col-3");
        
        table.appendChild(li);
        li.appendChild(div0);
        div0.appendChild(checkbox);
        li.appendChild(div1);
        li.appendChild(div2);
        li.appendChild(div3);
    };
};

// create buttons for MAIN
function setUpMainButtons(todoListNo) {
    const mainEditBtn = document.getElementById("main-edit-btn");
    const mainDeleteBtn = document.getElementById("main-delete-btn");
    const newTaskBtn = document.getElementById("new-task-btn");

    if(todoListNo == 0) {
        mainDeleteBtn.style.display = 'null';
        mainDeleteBtn.style.display = 'none';
        mainEditBtn.setAttribute("data", `${todoListNo}`);
        newTaskBtn.setAttribute("data", `${todoListNo}`);
    }

    else {
        mainDeleteBtn.style.display = 'null';
        mainDeleteBtn.style.display = 'inline-block';
        mainDeleteBtn.setAttribute("data", `${todoListNo}`);
        mainEditBtn.setAttribute("data", `${todoListNo}`);
        newTaskBtn.setAttribute("data", `${todoListNo}`);
    };
};

// execute when browser loads
window.onload = function() {
    todoListsToNav();
    todoToMain(0);
};

// execute when todo list has been clicked
document.getElementById("todo-lists").addEventListener("click", (event) => {
    const todoListNo = event.target.getAttribute("data");
    todoToMain(todoListNo);
});

// execute when delete button has been clicked
document.getElementById("main-delete-btn").addEventListener("click", (event) => {
    const todoListNo = event.target.getAttribute("data");
    if (confirm(`Are you sure you want to delete ${todoListArray[todoListNo].name}`)) {
        todoListArray.splice(todoListNo);
        todoListsToNav();
        todoToMain(0);
    }

});