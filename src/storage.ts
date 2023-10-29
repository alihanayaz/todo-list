import { Project } from './project';

const STORAGE_KEY = 'todoAppData';

export function saveData(projects: Project[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadData(): Project[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}
