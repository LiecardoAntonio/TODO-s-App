//get HTML element
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById('date-input');
const descriptionInput = document.getElementById('description-input');


// const taskData = [];
const taskData = JSON.parse(localStorage.getItem('data')) || []; //get the item if there is a saved task, instead initialize empty array
let currentTask = {};


const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id) //this will target the parentElement of the buttonEl element, which is the div with class = task, you can see it in the updateTaskContainer function
  buttonEl.parentElement.remove(); //remove the entire task from the DOM
  taskData.splice(dataArrIndex, 1); //remove data starting at dataArrIndex and remove only 1 value which is the value at the dataArrIndex itself

  localStorage.setItem('data', JSON.stringify(taskData)); //update the ls so it will also remove the removed task in the ls
}

const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
  const currentTask = taskData[dataArrIndex]; //get the data at the dataArrIndex

  //fill the input field value to the to be edited task value
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = 'Update Task';
  taskForm.classList.toggle('hidden');
};

// reset function to reset the input field, close the taskForm, and empty the currentTask object
const reset = () => {
  //reset the input if there is any value on it
  addOrUpdateTaskBtn.innerText = 'Add Task'; //If you try to add a new task, edit that task, and then click on the Add New Task button, you will notice a bug. The form button will display the incorrect text of "Update Task" instead of "Add Task". To fix this, you will need to assign the string "Add Task" to addOrUpdateTaskBtn.innerText inside your reset function.
  titleInput.value = '';
  dateInput.value = '';
  descriptionInput.value = '';

  taskForm.classList.toggle('hidden');
  currentTask = {};
};

openTaskFormBtn.addEventListener('click', () => {taskForm.classList.toggle("hidden")});
closeTaskFormBtn.addEventListener('click', () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value; //check if there is any value in the input fields
  
  //If the user attempts to edit a task but decides not to make any changes before closing the form, there is no need to display the modal with the Cancel and Discard buttons.->
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description; //check if there is any update on the input field value compared to the currenTask

  confirmCloseDialog.showModal();
  if(formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset(); //if there is a value inside the input then show the confirmation modal
  }
}); //This will display a modal with the Discard and Cancel buttons when the cancel button is clicked.
cancelBtn.addEventListener('click', ()=>confirmCloseDialog.close()); ////If the user clicks the Cancel button, you want to cancel the process and close the modal so the user can continue editing.

discardBtn.addEventListener('click', () => {
  confirmCloseDialog.close();
  // taskForm.classList.toggle('hidden');
  reset();
}) //If the user clicks the Discard button, you want to close the modal showing the Cancel and Discard buttons, then hide the form modal.

//function to decide whether to update or add
const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };
  console.log(taskObj);

  //add or update condition
  if (dataArrIndex === -1) { //if the value with the same id not found then add the task
    taskData.unshift(taskObj);
  } else { //if the value with the same id is found, then update
    taskData[dataArrIndex] = taskObj;
  }

  localStorage.setItem('data', JSON.stringify(taskData)); //save all the task into localStorage

  console.log(taskData);
  updateTaskContainer();
  reset();
};

//function to add/update the task into the taskContainer
const updateTaskContainer = () => {
  tasksContainer.innerHTML = ''; //remove the previous task, so it won't be added to the container again
  taskData.forEach(
    ({ id, title, date, description }) => {
        tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button type="button" class="btn" onclick="editTask(this)">Edit</button> 
          <button type="button" class="btn" onclick="deleteTask(this)">Delete</button> 
        </div>
      `
    }
  );
};

// if the taskData has value retrieved from the localStorage, then we will update the Task Container so it shows the saved task
if(taskData.length) {
  updateTaskContainer();
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //below moved to addOrUpdateTask function
  //const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id); // determine whether the task being added to the taskData array already exists or not. If the task does not exist, you will add it to the array. If it does exist, you will update it.

  // const taskObj = {
  //   id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`, //make a hyphenated string
  //   title: titleInput.value,
  //   date: dateInput.value,
  //   description: descriptionInput.value
  // }; //When a user creates a task, it should be saved in an object.
  // console.log(taskObj); //check the log of submitted task

  // if(dataArrIndex === -1) { //if there is no duplicate task
  //   taskData.unshift(taskObj); //add the task in the first index of the arr
  // }

  //below moved to updateTaskContainer
  // taskData.forEach(({id, title, date, description}) => {
  //   tasksContainer.innerHTML += `
  //       <div class="task" id="${id}">
  //         <p><strong>Title: </strong>${title}</p>
  //         <p><strong>Date: </strong>${date}</p>
  //         <p><strong>Description: </strong>${description}</p>
  //         <button type="button" class="btn">Edit</button>
  //         <button type="button" class="btn">Delete</button>

  //       </div>
        
  //     `
  // }); //display the task on the page by looping through it.
  // taskForm.classList.toggle('hidden');
  addOrUpdateTask(); // call the add/update function for new task
})


//testing localStorage
// const myTaskArr = [
//   { task: "Walk the Dog", date: "22-04-2022" },
//   { task: "Read some books", date: "02-11-2023" },
//   { task: "Watch football", date: "10-08-2021" },
// ];
// // localStorage.setItem("data", myTaskArr); 
// localStorage.setItem("data", JSON.stringify(myTaskArr)); //saved in string format
// // const getTaskArr = localStorage.getItem('data');
// // console.log(getTaskArr); //because we saved the data in string format the this getTaskArr value will also be a string value

// const getTaskArrObj = JSON.parse(localStorage.getItem('data'));
// console.log(getTaskArrObj); //this will be saved in object again

// // localStorage.removeItem('data'); //remove the specific key item from the localStorage

// // localStorage.clear(); //remove every single item in the ls









