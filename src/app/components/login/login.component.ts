import { Component, OnInit } from '@angular/core';
import { DataForm } from '../../model/data-form';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms/src/directives/ng_form';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router, private location: Location) { }
  private userApp: DataForm={
    Name: '',
    LastName: '', 
    IsMilitar: false, 
    isTemporal: false, 
    username: '', 
    email: '', 
    password:''
  }
  public isError = false;
  ngOnInit() {}

  onLogin(form: NgForm ){
   if(!form.valid){
      this.authService.loginUser(this.userApp.email,this.userApp.password).subscribe((user: any)=>{
        this.authService.setUser(user);
        this.authService.setToken(user.id)
        this.router.navigate(['/home']);
        location.reload();
        this.isError = false;
      },error=>this.onIsError());
    } else this.onIsError();
    
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
}
