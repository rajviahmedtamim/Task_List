"use strict";

// Define UI element
var form = document.querySelector('#task_form');
var taskList = document.querySelector('ul');
var clearBtn = document.querySelector('#clear_task_btn');
var filter = document.querySelector('#task_filter');
var taskInput = document.querySelector('#new_task'); // Define event listeners

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks); // Define functions
// Add Task

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task!');
  } else {
    // Create li element
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(taskInput.value + " "));
    var link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);
    taskList.appendChild(li);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
  }

  e.preventDefault();
} // Remove Task


function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure?")) {
      var ele = e.target.parentElement;
      ele.remove(); //console.log(ele);

      removeFromLS(ele);
    }
  }
} // Clear Task


function clearTask(e) {
  //taskList.innerHTML = "";
  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  localStorage.clear();
} // Filter Task


function filterTask(e) {
  var text = e.target.value.toLowerCase();
  document.querySelectorAll('li').forEach(function (task) {
    var item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
} // Store in Local Storage


function storeTaskInLocalStorage(task) {
  var tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  var tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(task + " "));
    var link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function removeFromLS(taskItem) {
  var tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  var li = taskItem;
  li.removeChild(li.lastChild); // <a>x</a>'

  tasks.forEach(function (task, index) {
    if (li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}