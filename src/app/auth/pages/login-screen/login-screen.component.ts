import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
})
export class LoginScreenComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    //console.log(this.miFormulario.value);

    this.authService.login(this.miFormulario.value).subscribe(res=>{
      //console.log(res);
      //aca el res = true, no es el json de siempre
      if (res === true) {
        localStorage.setItem('user', JSON.stringify(this.authService.user));
        this.router.navigate(['task']);
      }else{
        Swal.fire({
          title: "Error...",
          icon: "error",
          text: res
        });
      }
      //console.log(res);
    });
  }


  
}
