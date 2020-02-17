import { NgModule } from '@angular/core';
import { UsersListModule } from './users-list/users-list.module';
import { UsersDetailsModule } from './users-details/users-details.module';


@NgModule({
  imports: [
    UsersListModule,
    UsersDetailsModule
  ] 
})
export class UsersComponentsModule { }