import { Injectable } from '@angular/core';
import {ToDo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos=[new ToDo("1","Go To Gym",false)]
getAll(){
    return [...this.todos]
}
create(todo:ToDo): ToDo{

const id=new Date().getTime().toString()
  const updatedTodo={...todo,id:id}
  this.todos.push(updatedTodo)
  return updatedTodo
}
}
