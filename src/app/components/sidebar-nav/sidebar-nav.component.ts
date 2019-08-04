import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  public logout() {
    this.router.navigate(['/signin']);
    this.userService.clearToken();
  }

}
