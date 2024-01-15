const title = document.getElementById("title");
const description = document.getElementById("description");
const date = document.getElementById("date");
const priority = document.getElementById("priority");
const errorElement = document.getElementById("errorText");
const submitFormBtn = document.getElementById("submitForm");
const form = document.getElementById("form");
const cardsContainer = document.getElementById("cardsContainer");

//Opening and closing forms
const openFormBtn = document.querySelector(".openForm");
openFormBtn.addEventListener("click", () => {
  openForm();
});

const closeFormBtn = document.querySelector(".closeForm");
closeFormBtn.addEventListener("click", () => {
  closeForm();
});

function openForm() {
  document.querySelector(".popupForm").classList.remove("closed");
}

function closeForm() {
  document.querySelector(".popupForm").classList.add("closed");
}

submitFormBtn.addEventListener("click", (e) => {
  let errorMessages = [];

  //Input validation
  function checkIfFormValueIsEmpty(element) {
    if (element.value === "" || element.value == null) {
      errorMessages.push(
        "Field for " + element.id.toUpperCase() + " is required."
      );
      element.classList.add("error");
    }
  }
  checkIfFormValueIsEmpty(title);
  checkIfFormValueIsEmpty(date);
  checkIfFormValueIsEmpty(priority);

  //error
  if (errorMessages.length > 0) {
    e.preventDefault();
    errorElement.style.visibility = "visible";
    errorElement.innerHTML = errorMessages.join("<br>");
  }
  //no error
  else {
    const task = new Task(
      title.value,
      description.value,
      date.value,
      priority.value
    );
    console.log(task);
    TaskManager.addTask(task);
    form.reset();
    closeForm();
  }
});

class Task {
  isCompleted = false;

  constructor(title, description, dueDate, priority) {
    this.title = title;
    (this.description = description), (this.dueDate = dueDate);
    this.priority = priority;
  }

  editTask() {}

  finishedTask() {
    this.isCompleted = true;
  }
  expandDescription() {}
}

class TaskManager {
  static tasks = [];

  static addTask(task) {
    this.tasks.push(task);
    updateAllTasksToDOM(this.tasks);
  }

  static deleteTask(task) {
    this.tasks.splice(task);
    updateAllTasksToDOM(this.tasks);
  }
}

function updateAllTasksToDOM(tasks) {
  tasks.forEach((task) => {
    const taskToAdd = document.createElement("div");
    taskToAdd.classList.add("card");

    const title = document.createElement("p");
    title.textContent = task.title;
    const description = document.createElement("p");
    description.textContent = "Description: " + task.description;
    const dueDate = document.createElement("p");
    const [year, month, date] = task.dueDate.split("-");
    dueDate.textContent = "Due: " + `${month}/${date}/${year}`

    taskToAdd.appendChild(title);
    taskToAdd.appendChild(description);
    taskToAdd.appendChild(dueDate);
    taskToAdd.classList.add(tasks.priority);

    taskToAdd.addEventListener(
      "click",
      (e = {
        //can edit the card here
      })
    );
    cardsContainer.appendChild(taskToAdd);
  });
}
