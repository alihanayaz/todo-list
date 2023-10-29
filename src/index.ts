import { loadData } from './storage';
import * as ui from './ui';

export const projects = loadData();
ui.initialize(projects);
