class Task{
    constructor(title, description, dueDate, priority){
        
    }

    editTask(){

    }

    finishedTask(){

    }

    expandDescription(){

    }
}


function openForm() {
    document.getElementById("popupForm").style.display = "block";
  }
  
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}



const title = document.getElementById('title');
const date = document.getElementById('date');
const priority = document.getElementById('priority');
const errorElement = document.getElementById('error');
const form = document.getElementById('form');



form.addEventListener('submit', (e)=>{
    let errorMessages = [];

    function checkIfFormValueIsEmpty(element){
        if (element.value=== '' || element.value==null){
            errorMessages.push ('Field for ' + element.id + ' is required');
        }
    }

    checkIfFormValueIsEmpty(title);
    checkIfFormValueIsEmpty(date);
    checkIfFormValueIsEmpty(priority);
    if (errorMessages.length>0){
        e.preventDefault();
        errorElement.style.visibility = 'visible';
        errorElement.innerHTML = errorMessages.join("<br>")
    }
})

