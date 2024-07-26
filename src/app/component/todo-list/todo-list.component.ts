import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ToDo} from "../../models/todo";
import {TodoService} from "../../Services/todo.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    FormsModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: ToDo[] = [];
  isGoing = false;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.fetchTodos()
  }

  onAdd(inputElement: HTMLInputElement) {
    if (!inputElement.value) {

      return
    }
    const todo = new ToDo("-1", inputElement.value, false)
    console.log(todo)
    const newTodo = this.todoService.create(todo)
    this.todos.unshift(newTodo)
    inputElement.value = ""
  }

  onDelete(id: string) {
    if (confirm("Are you sure you want to delete it?")) {
      const deleteId = this.todoService.delete(id)
      if (deleteId) {
        const index = this.todos.findIndex(value => value.id === deleteId)
        this.todos.splice(index, 1)
      }
    }
  }

  fetchTodos() {
    this.todos = this.todoService.getAll()
  }

  onEdit(toEdit: ToDo) {

    if (!this.isGoing) {
      toEdit.isEditing = true;
    }
    this.isGoing = true
  }

  private findById(id: string): ToDo | undefined {
    return this.todos.find(todo => todo.id === id)
  }

  onCancel(todo: ToDo) {
    todo.isEditing = false
    const index = this.todos.findIndex(value => value.id === todo.id)
    this.todos[index] = {...this.todos[index]}
    this.isGoing = false
  }

  onDoneChange(todo: ToDo) {
    this.updateTodo(todo)
  }

  onSave(todo: ToDo, title: string) {
    todo.title = title;
    todo.isEditing = false
    this.updateTodo(todo)
    this.isGoing = false


  }

  private updateTodo(todo: ToDo) {
    const updatedTodo = this.todoService.update(todo)
    if (updatedTodo) {
      const index = this.todos.findIndex(value => value.id === updatedTodo.id)
      this.todos[index] = {...updatedTodo}
    }

  }

  onAllDelete() {
    if(this.todos.length===0){
      return;
    }
    if (confirm("Are you sure you want to delete it?")) {
    this.todos=[]
      this.todoService.allDelete()


    }
  }
}

