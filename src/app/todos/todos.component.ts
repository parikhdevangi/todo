import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DataService } from '../services/data.service';
import { Todo } from '../services/todo.model';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos!: Todo[];
  

constructor(private dataservice:DataService){
 

}

  ngOnInit():void{
    this.todos = this.dataservice.getAllTodo();
  }

  onFormSubmit(form:NgForm){
    
    if(form.invalid) return alert("form is invalid");
    this.dataservice.addTodo(new Todo(form.value.text));
    form.reset();
  }

  toggleCompleted(todo:Todo){
  todo.completed=!todo.completed;
  }

  deleteTodo(todo:Todo){
    const index=this.todos.indexOf(todo)
    this.dataservice.deleteTodo(index)

  }

  remaining():number{
    return this.todos.filter(todo=> !todo.completed).length;
  }

  deleteCompletedTask(){
    const selectedItem = this.todos.filter(item=> item.completed).map(i=>i.id);
    
    selectedItem.forEach(value=>{
      this.dataservice.deleteTodo(value)
        this.todos=this.todos.filter(
          todos=> !todos.completed
        );
   
    });
  }

}
