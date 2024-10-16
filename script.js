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


const taskData = [];
let currentTask = {};

openTaskFormBtn.addEventListener('click', () => {taskForm.classList.toggle("hidden")});
closeTaskFormBtn.addEventListener('click', () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value; //check if there is any value in the input fields
  confirmCloseDialog.showModal();
  if(formInputsContainValues) {
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
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  }
};

//function to add/update the task into the taskContainer
const updateTaskContainer = () => {
  taskData.forEach(
    ({ id, title, date, description }) => {
        tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button type="button" class="btn">Edit</button>
          <button type="button" class="btn">Delete</button>
        </div>
      `
    }
  );
};

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
  reset();
})

// reset function to remove the previous task before adding, so it doesn't duplicate
const reset = () => {
  //reset the input if there is any value on it
  titleInput.value = '';
  dateInput.value = '';
  descriptionInput.value = '';

  taskForm.classList.toggle('hidden');
  currentTask = {};
};












