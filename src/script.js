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
  date.value = formatDate(new Date().toLocaleString());
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

//set default values for date in form
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

//move all of these and import
class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  editTask() {}
}

class TaskManager {
  static tasks = [];
  static addTask(task) {
    this.tasks.push(task);
    this.tasks.sort(sortByDate);
    updateAllTasksToDOM(this.tasks);
  }

  static deleteTask(task) {
    this.tasks.splice(task);
    updateAllTasksToDOM(this.tasks);
  }
}

function sortByDate(a, b) {
  console.log(a.dueDate);
  const [aYear, aMonth, aDay] = a.dueDate.split("-");
  const [bYear, bMonth, bDay] = b.dueDate.split("-");
  if (aYear !== bYear) {
    return aYear - bYear;
  } else if (aMonth !== bMonth) {
    return aMonth - bMonth;
  } else {
    return aDay - bDay;
  }
}

function updateAllTasksToDOM(tasks) {
  cardsContainer.innerHTML = "";
  tasks.forEach((task) => {
    const taskToAdd = document.createElement("div");
    taskToAdd.classList.add("card");

    //Front of the card(general info)
    const frontCard = document.createElement("div");
    frontCard.classList.add("front");
    const title = document.createElement("p");
    title.textContent = task.title;
    const shortDescription = document.createElement("p");
    shortDescription.textContent = "Description: " + task.description;
    shortDescription.style =
      "align-self: start; overflow: hidden; margin: 0; height: 100%; width: 100%";
    const dueDate = document.createElement("p");
    const [year, month, date] = task.dueDate.split("-");
    dueDate.textContent = "Due: " + `${month}/${date}/${year}`;

    frontCard.appendChild(title);
    frontCard.appendChild(shortDescription);
    frontCard.appendChild(dueDate);

    //Back of the card
    const backCard = document.createElement("div");
    backCard.classList.add("back");
    const longDescription = document.createElement("p");
    longDescription.style =
      "overflow: auto; height: 100%; width: 100%; margin: 0";
    longDescription.textContent = task.description;
    deleteTaskBtn = document.createElement("btn");
    deleteTaskBtn.textContent = "Delete";
    deleteTaskBtn.classList.add ("button")
    deleteTaskBtn.addEventListener("click", () => {
      TaskManager.deleteTask(task);
    });
    backCard.appendChild(longDescription);
    backCard.appendChild(deleteTaskBtn);

    taskToAdd.appendChild(frontCard);
    taskToAdd.appendChild(backCard);
    taskToAdd.classList.add(task.priority + "Prio");
    taskToAdd.addEventListener(
      "click",
      (e = {
        //can edit the card here
      })
    );
    cardsContainer.appendChild(taskToAdd);
  });
}
