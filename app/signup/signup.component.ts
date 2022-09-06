import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';
import { Signup } from './signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  signup:Signup=new Signup();
  constructor(private fb:FormBuilder,private signupSer:SignupService, private router: Router) { }
  signupList:Signup[]=[];
  ngOnInit(): void {

    this.signupForm = new FormGroup({            
      // id: ['', Validators.required],  
      name:new FormControl('' ,[Validators.required, Validators.pattern("[a-zA-Z].*")]),                                
      username: new FormControl("",[Validators.required]),
      password:  new FormControl("",[Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    //  name: ['', Validators.required],
    mobileNo: new FormControl("",[Validators.required,Validators.pattern("[0-9]*"), Validators.minLength(10), Validators.maxLength(10)]),
   dob: new FormControl("",[Validators.required])                               
        });
    // this.signupSer.getSignupList().subscribe(data=>this.signupList=data);
  }
  onSubmit(){
     alert( JSON.stringify(this.signupForm.value)); 
   this.signup=this.signupForm.value;
     this.signupSer.addSignup(this.signup).subscribe(data => {
      

        alert("Registered Successfully!");
        console.log(this.signupForm.value);
        this.signupForm.reset();
      });
    }
    get name(): FormControl{
      return this.signupForm.get("name") as FormControl
    }

  }
