import { Todo } from './todo';

export class Project {
    name: string;
    todos: Todo[];

    constructor(name: string) {
        this.name = name;
        this.todos = [];
    }

    addTodo(todo: Todo) {
        this.todos.push(todo);
    }

    removeTodo(todo: Todo) {
        this.todos = this.todos.filter((item) => item !== todo);
    }
}
