import './style.scss';
import { Project } from './project';
import { saveData, loadData } from './storage';
import { slugify } from './helpers';

let projects: Project[] = loadData();

document.getElementById('new-project')?.addEventListener('click', () => {
  const newProjectName = prompt('Enter a name for your project:');
  if (newProjectName) {
    const newProject = new Project(newProjectName);
    projects.push(newProject);
    saveData(projects);
    updateProjectList();
  }
});

function updateProjectList() {
  const projectList = document.getElementById('project-list');
  if (projectList) {
    projectList.innerHTML = '';
    projects.forEach((project) => {
      const projectItem = document.createElement('div');
      const projectTitle = document.createElement('h3');
      projectTitle.textContent = project.name;
      projectItem.setAttribute('class', 'project');
      projectItem.setAttribute('data-project', slugify(project.name));

      const deleteButton = document.createElement('img');
      deleteButton.src = '../assets/delete.svg';
      deleteButton.setAttribute('class', 'delete-icon');
      deleteButton.addEventListener('click', () => {
        const projectName = projectItem.getAttribute('data-project');
        if (projectName) {
          const confirmDelete = confirm(
            `Are you sure you want to delete the project "${project.name}"?`
          );
          if (confirmDelete) {
            projects = projects.filter((p) => slugify(p.name) !== projectName);
            saveData(projects);
            updateProjectList();
          }
        }
      });

      projectItem.appendChild(deleteButton);
      projectItem.appendChild(projectTitle);
      projectList.appendChild(projectItem);
    });
  }
}

updateProjectList();
