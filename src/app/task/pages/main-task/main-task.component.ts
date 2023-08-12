import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.css'],
})
export class MainTaskComponent implements OnInit {
  user: any;
  task: Array<any> = [''];

  newTask: string = '';

  miFormulario: FormGroup = this.formBuilder.group({
    newTask: [''],
  });

  constructor(
    private crudService: CrudService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.crudService.user;
    this.read();
  }

  
  create() {
    this.crudService
      .create(this.miFormulario.value.newTask)
      .subscribe((response) => {
        this.miFormulario.reset();
        this.read();
      });
  }

  read(){
    this.crudService.red().subscribe((res) => {
      this.task = res.tareas;
    });
  }

  logout() {
    localStorage.clear();
    this.task = [""]
    this.router.navigateByUrl('/auth');
  }

  delete(id: string) {
    this.crudService.delete(id).subscribe((response) => {
      this.crudService.red().subscribe((res) => {
        this.task = res.tareas;
      });
    });
  }

  update(task:any){
    const {_id, nombre}= task;
    this.router.navigateByUrl(`/task/${_id}/${nombre}`);
  }
}
