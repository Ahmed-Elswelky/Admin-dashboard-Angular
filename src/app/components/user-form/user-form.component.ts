import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userId:any;
  constructor(private router:Router,private userService:UserService, private activatedRoute: ActivatedRoute){
    if(this.activatedRoute.snapshot.params["id"] == "new"){
      this.userId=""
    }else{
    this.userId = this.activatedRoute.snapshot.params['id'];
    console.log(this.activatedRoute.snapshot.params)
    }
  }
  
  loginForm = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.pattern(/^[a-zA-Z]{2,30}$/)
    ]),
    password:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[
      Validators.required,
      Validators.pattern(/^\S+@\S+\.\S+$/)
      
    ])
  });

  get getName(){
    return this.loginForm.controls['name'];
  }
  get getEmail(){
    return this.loginForm.controls['email'];
  }
  get getPassword(){
    return this.loginForm.controls['password'];
  }

  login(){
    if(this.loginForm.status=="VALID"){
      this.userService.addUser(this.loginForm.value).subscribe((response)=>{

      })
      this.router.navigate(["/users"])
    }else{
      console.log("Baaaaazeet")
    }
  }
}
