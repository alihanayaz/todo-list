export class Todo {
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  notes: string;
  checklist: string[];
  isComplete: boolean;

  constructor(
    title: string,
    description: string,
    dueDate: Date,
    priority: string,
    notes?: string,
    checklist?: string[]
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes || '';
    this.checklist = checklist || [];
    this.isComplete = false;
  }

  toggleCompletion() {
    this.isComplete = !this.isComplete;
  }
}
