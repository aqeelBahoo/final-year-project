import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signinForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private api: ApiService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router

  ) { }

  public onSubmit() {
    if (this.signinForm.invalid) { return; }
    this.api.getUser(this.signinForm.value).subscribe((res) => {
      if (!res.data) {
        this.openSnackBar(res.message, 'ERROR');
        return;
      }
      this.userService.userData.next(res.data);
      this.userService.clearToken();
      this.userService.setToken(res.data._id);
      this.router.navigate(['dashboard']);
    });

  }

  private openSnackBar(message, action) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

}
