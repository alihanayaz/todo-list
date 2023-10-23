import './style.scss';
import { Project } from './project';
import { Todo } from './todo';
import { saveData, loadData } from './storage';

let currentProject: Project;

function renderProjects(projects: Project[]) {
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = '';
  if (!projects.length) {
    projectList.innerHTML = 'No projects yet.';
    return;
  }
  projects.forEach((project) => {
    const projectContainer = document.createElement('div');
    const projectItem = document.createElement('div');
    projectContainer.classList.add('project');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('button', 'delete');
    deleteButton.addEventListener('click', () => {
      projects.splice(projects.indexOf(project), 1);
      saveData(projects);
      renderProjects(projects);
      if (currentProject === project) {
        selectProject(projects[0]);
      }
    });
    projectItem.textContent = project.name;
    projectItem.addEventListener('click', () => selectProject(project));
    projectContainer.appendChild(projectItem);
    projectContainer.appendChild(deleteButton);
    projectList.appendChild(projectContainer);
  });
}

function renderTasks(project: Project) {
  clearTaskDetails();
  const tasksList = document.getElementById('tasks-list');
  tasksList.innerHTML = '';
  if (!project || !project.todos.length) {
    tasksList.innerHTML = 'No tasks yet.';
    return;
  }
  project.todos.forEach((todo) => {
    const taskContainer = document.createElement('div');
    const taskItem = document.createElement('div');
    const deleteButton = document.createElement('button');
    taskContainer.classList.add('task');
    taskItem.textContent = todo.title;
    if (todo.isComplete) {
      taskItem.classList.add('completed');
    }
    taskItem.addEventListener('click', () => showTaskDetails(todo));
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('button', 'delete');
    deleteButton.addEventListener('click', () => {
      project.removeTodo(todo);
      saveData(projects);
      renderTasks(project);
    });
    tasksList.appendChild(taskContainer);
    taskContainer.appendChild(taskItem);
    taskContainer.appendChild(deleteButton);
  });
}

function selectProject(project: Project) {
  currentProject = project;
  const foundProjects = document.querySelectorAll('.project');
  foundProjects.forEach((p) => {
    p.classList.remove('selected');
    if (p.children[0].textContent === project.name) {
      p.classList.add('selected');
    }
  });
  renderTasks(project);
}

function createProject() {
  const projectName = prompt('Enter project name:');
  if (projectName) {
    const newProject = new Project(projectName);
    projects.push(newProject);
    saveData(projects);
    renderProjects(projects);
    selectProject(newProject);
  }
}

function createTask() {
  if (!currentProject) {
    alert('Select a project first.');
    return;
  }
  const title = prompt('Task title:');
  const description = prompt('Task description:');
  if (title) {
    const newTask = new Todo(title, description);
    currentProject.addTodo(newTask);
    saveData(projects);
    renderTasks(currentProject);
  }
}

function showTaskDetails(task: Todo) {
  const foundTasks = document.querySelectorAll('.task');
  foundTasks.forEach((t) => {
    t.classList.remove('selected');
    if (t.children[0].textContent === task.title) {
      t.classList.add('selected');
    }
  });
  const detailsContainer = document.getElementById('task-details');
  detailsContainer.innerHTML = '';
  const heading = document.createElement('h2');
  const taskTitle = document.createElement('h3');
  const taskDescription = document.createElement('p');
  const completedArea = document.createElement('div');
  const isTaskComplete = document.createElement('input');
  heading.textContent = 'Task Details';
  taskTitle.textContent = task.title;
  taskDescription.textContent = task.description;
  isTaskComplete.type = 'checkbox';
  isTaskComplete.checked = task.isComplete;
  isTaskComplete.addEventListener('change', () => {
    task.isComplete = !task.isComplete;
    saveData(projects);
    renderTasks(currentProject);
  });
  detailsContainer.appendChild(heading);
  detailsContainer.appendChild(taskTitle);
  detailsContainer.appendChild(taskDescription);
  completedArea.appendChild(document.createTextNode('Completed: '));
  completedArea.appendChild(isTaskComplete);
  detailsContainer.appendChild(completedArea);
}

function clearTaskDetails() {
  const detailsContainer = document.getElementById('task-details');
  detailsContainer.innerHTML = '';
}

const projects = loadData();
if (projects.length > 0) {
  selectProject(projects[0]);
}

renderProjects(projects);

document
  .getElementById('create-project')
  .addEventListener('click', createProject);
document.getElementById('create-task').addEventListener('click', createTask);
