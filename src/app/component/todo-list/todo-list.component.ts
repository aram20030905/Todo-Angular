import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ToDo} from "../../models/todo";
import {TodoService} from "../../Services/todo.service";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
todos : ToDo[]= [];
  constructor(private todoService:TodoService) {
  }
  ngOnInit(){
this.fetchTodos()
  }
  onAdd(value:string){
    const todo=new ToDo("-1", value,false)
    console.log(todo)
   const newTodo= this.todoService.create(todo)
    this.todos.push(newTodo)
  }

  onDelete(id:string) {
    if (confirm("Are you sure you want to delete it?")) {
      const deleteId = this.todoService.delete(id)
      if (deleteId) {
        const index = this.todos.findIndex(value => value.id === deleteId)
        this.todos.splice(index, 1)
      }
    }
  }

  fetchTodos(){
    this.todos=this.todoService.getAll()
  }
}

