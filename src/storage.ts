import { Project } from './project';

const STORAGE_KEY = 'todoAppData';

export function saveData(projects: Project[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadData(): Project[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        const projectData = JSON.parse(data);
        return projectData.map((project: Project) => new Project(project.name, project.todos));
    }
    return [];
}
