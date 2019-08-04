import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public networks = ['Telenor', 'Jazz', 'Warid', 'Ufone'];
  public loads = [];
  public cellNumber = new FormControl('');
  public rupees = new FormControl('');
  public network = new FormControl('');
  public searchNumber = new FormControl('');
  public searchNetwork = new FormControl('');
  public searchBy = new FormControl('');
  public localstorageData: any = [];
  public hasData: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
    // this.getLoads();
    //  this.getLocalData();
    this.searchNumber.valueChanges.subscribe((value) => {
      if (!value) {
        this.loads = [];
        // this.getLoads();
      }
    });
    this.network.valueChanges.subscribe((value) => {
      if (!value) {
        this.loads = [];
        // this.getLoads();
      }
    });
  }

  public getLoads() {
    this.apiService.getLoads().subscribe((res) => {
      this.loads = res.data;
    });
  }

  public load() {
    if (!this.cellNumber.value || !this.rupees.value || !this.network.value) {
      this.snackBar('Please fill all fields', 'ERROR');
      return;
    }
    const data = {
      number: this.cellNumber.value,
      rupees: this.rupees.value,
      network: this.network.value,
      date: new Date().toUTCString()
    };
    this.apiService.postLoad(data).subscribe(() => {
      // this.getLoads();
      this.snackBar('LOAD SUCEESSFULLY', 'SUCCESS');
      this.emptyForm();
    });
    //  this.loads.push(data);
    //  this.saveLocal(data);
  }

  /*  public delete(id: number) {
      this.apiService.deleteLoad(id).subscribe(() => {
        this.getLoads();
      });
    } */

  public search() {
    if (!this.searchBy.value && !this.searchNumber.value.trim() && !this.searchNetwork.value) {
      this.snackBar('Please fill all fields', 'ERROR');
      return;
    }
    const searchValues = {
      searchBy: this.searchBy.value,
      network: this.searchNetwork.value,
      number: this.searchNumber.value.trim()
    };
    // this.loads = this.loads.filter((load) => load[searchFrom] === searchValue);
    this.apiService.searchLoad(searchValues).subscribe((res) => {
      if (!res.data.length) {
        this.loads = [];
        this.snackBar('NOT FOUND', 'ERROR');
        return;
      }
      this.snackBar('FOUND SUCCESSFULLY', 'SUCCESS');
      this.loads = res.data;
    }, () => {
    });
  }

  private saveLocal(data) {
    const localData = localStorage.getItem('loads');
    this.localstorageData = localData ? JSON.parse(localData) : [];
    this.localstorageData.push(data);
    localStorage.setItem('loads', JSON.stringify(this.localstorageData));
    this.localstorageData = [];
    return;
  }

  private emptyForm() {
    this.cellNumber.setValue(null);
    this.rupees.setValue(null);
    this.network.setValue(null);
  }

  private snackBar(message, action) {
    this._snackBar.open(message, action, { duration: 3000 });
  }


}

