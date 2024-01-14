//Adding Task Implementation
class Task {
  constructor(title, dueDate, priority) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  editTask() {}

  finishedTask() {}

  expandDescription() {}
}

const openFormBtn = document.querySelector(".addTask");
openFormBtn.addEventListener("click", ()=>{
    openForm();
})

const closeTaskBtn = document.querySelector(".closeForm");
closeTaskBtn.addEventListener("click", ()=>{
  closeForm();
})

function openForm() {
  document.querySelector(".popupForm").classList.remove("closed");
}

function closeForm() {
  document.querySelector(".popupForm").classList.add("closed");
}

const title = document.getElementById("title");
const date = document.getElementById("date");
const priority = document.getElementById("priority");
const errorElement = document.getElementById("errorText");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  let errorMessages = [];

  function checkIfFormValueIsEmpty(element) {
    if (element.value === "" || element.value == null) {
      errorMessages.push("Field for " + element.id.toUpperCase() + " is required.");
      element.classList.add("error");
    }
  }

  checkIfFormValueIsEmpty(title);
  checkIfFormValueIsEmpty(date);
  checkIfFormValueIsEmpty(priority);
  if (errorMessages.length > 0) {
    e.preventDefault();
    errorElement.style.visibility = "visible";
    errorElement.innerHTML = errorMessages.join("<br>");
  }
  else {
    const task = new Task(title.value, date.value, priority.value);
  }

});



