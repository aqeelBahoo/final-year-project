import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(
    private api: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) { }

  public onSubmit() {
    if (this.signupForm.invalid) { return; }
    const data = this.signupForm.value;
    const user = {
      email: data.email,
      password: data.password,
      name: data.name
    };
    this.api.createUser(user).subscribe(
      (res: any) => {
        this.userService.userData.next(res.data);
        this.userService.clearToken();
        this.userService.setToken(res.data._id);
        this.openSnackBar('User created successfully', 'SUCCESS');
        this.router.navigate(['dashboard']);
      }, (err) => {
        this.openSnackBar(err.message, 'ERROR');
      });
  }

  private openSnackBar(message, action) {
    this._snackBar.open(message, action, { duration: 3000 });
  }


}
