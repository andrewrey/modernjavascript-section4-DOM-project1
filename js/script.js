// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners 
loadEventListeners();


// Load all event listeners
function loadEventListeners(){
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks);
  // Filter Tasks Events
  filter.addEventListener('keyup', filterTasks);

}


//  Add task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  } else {
     // create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Add to local storage
  storeTaskInLocalStorage(taskInput.value);


  // Clear input
  taskInput.value = '';
  console.log(li);

  }

 

  e.preventDefault();
}

// Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm("Are You Sure?")){
      e.target.parentElement.parentElement.remove();
      /// Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Clear Tasks
function clearTasks(e){
  // taskList.innerHTML = ''; (one option)

  // Faster option below:
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  removeAllTasksFromLS();


}


/// Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task =>{
    const item = task.firstChild.textContent.toLowerCase();
    if(!item.includes(text)){
      task.style.display = "none";
    } else {
      task.style.display = "block";
    }
  })
}

/// Store in local Storage

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks  = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

/// Get Tasks from Local Storage on Page Load
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks  = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  })

}


/// Remove Specific Task from Local Storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks  = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach((task, index) => {
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));

}


/// Remove All Local Storage at Once
function removeAllTasksFromLS(){
 localStorage.clear();

}