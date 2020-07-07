import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../service/data-storage.service';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

  userSub : Subscription;
  authenticated = false;
  constructor(private dataStorageService : DataStorageService, private authService : AuthService){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.authenticated = !!user;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

}
