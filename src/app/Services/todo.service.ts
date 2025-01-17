import { Injectable } from '@angular/core';
import {ToDo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  todos:ToDo[]=[]

getAll():ToDo[]{
this.todos = JSON.parse(localStorage.getItem('todo-item')||'[]') as ToDo[]
return [...this.todos];

}
create(todo:ToDo): ToDo{

const id=new Date().getTime().toString()
  const updatedTodo={...todo,id:id}
  this.todos.unshift(updatedTodo)

  this.setAll(this.todos)
  return updatedTodo
}
delete(id:string): string| boolean{
   const index= this.todos.findIndex(value=>value.id === id);
   const toDelete=this.todos[index]


   this.todos.splice(index,1)
 this.setAll(this.todos)
  return toDelete.id
}

  update(todo: ToDo) {
    const index= this.todos.findIndex(value=>value.id === todo.id);
  this.todos[index]={...todo}
    this.setAll(this.todos)
    return this.todos[index]


  }
  allDelete(){
    this.todos = []
    this.setAll(this.todos)
  }

  private setAll(todos:ToDo[]){
    localStorage.setItem('todo-item',JSON.stringify(todos))
  }


}
