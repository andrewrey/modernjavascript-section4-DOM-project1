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