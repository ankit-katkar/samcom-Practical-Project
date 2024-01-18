import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  showLogIn = false;
// UserSignUp
userSignUp:FormGroup | any;
SignupSubmitted = false;

// userLogIn
userLogIn:FormGroup | any;
LogInSubmitted = false;


constructor(private fb:FormBuilder, private http:HttpClient, private route:Router){
// uesrSignUp
 this.userSignUp = fb.group({
  FirstName: ['', Validators.required],
  LastName: ['', Validators.required],
  Number: ['', Validators.required],
  Email: ['', Validators.required],
  Password: ['', Validators.required],
 });

//  userLogIn
this.userLogIn = fb.group({
  Email: ['', Validators.required],
  Password: ['', Validators.required],
})

}

get singUpf(){
  return this.userSignUp.controls;
}

get LogInf(){
  return this.userLogIn.controls;
}


SignIn(data:any){
this.SignupSubmitted = true;
if(this.userSignUp.valid){
  this.http.post('http://localhost:3000/userSignUp', data).subscribe((result)=>{
    this.route.navigate(['products']);
})
}
}

LogIn(data:any){
this.LogInSubmitted = true;
if(this.userLogIn.valid){
  this.http.get(`http://localhost:3000/userSignUp?Email=${data.Email}&Password=${data.Password}`,
 {observe:'response'}).subscribe((result:any)=>{
  if(result && result.body && result.body.length){
    this.route.navigate(['products']);
  }else{
    console.warn("error");
    
  }
 })
}
};

onLogIn(){
this.showLogIn = true;
}

onSignIn(){
this.showLogIn = false;
}
}
