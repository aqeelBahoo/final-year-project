import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  public loadsHistory = [];

  constructor(
    private _snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
    this.getLoads();

  }

  public getLoads() {
    this.apiService.getLoads().subscribe((res) => {
      this.loadsHistory = res.data;
    });

  }

  public delete(id: number) {
    this.apiService.deleteLoad(id).subscribe(() => {
      this._snackBar.open('load deleted successfully', 'SUCCESS', { duration: 3000 });
      this.getLoads();
    });
  }

}
