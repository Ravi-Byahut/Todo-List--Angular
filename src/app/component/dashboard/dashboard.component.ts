import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr:Task[]=[];
  addTaskValue:string="";
  editTaskValue:string="";

  constructor(private crudService:CrudService){}

  ngOnInit(): void {
    this.taskObj=new Task();
    this.getAllTask();
    this.taskArr=[];
    this.editTaskValue='';
    this.addTaskValue='';
      
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res=>{
      this.taskArr=res;
    },err=>{
      alert("Unable to get the List of Task")

    })
  }
  addTask(){
    this.taskObj.task_name=this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res=>{this.ngOnInit();
    this.addTaskValue='';}, err=>{
      alert(err);
    })
  }
  editTask(){
    this.taskObj.task_name=this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    }, err=> {
      alert("Failed to update Task");
    })
  }

  deleteTask(etask:Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("Failed to deleteTask");
    })
  }

  call(etask:Task){
    this.taskObj=etask;
    this.editTaskValue=etask.task_name;
  }

}
