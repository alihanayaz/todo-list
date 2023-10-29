export class Todo {
    title: string;
    description: string;
    isComplete: boolean;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
        this.isComplete = false;
    }

    toggleCompletion() {
        this.isComplete = !this.isComplete;
    }
}
