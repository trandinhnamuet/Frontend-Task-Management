import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { TaskManagementComponent } from './layout/task-management/task-management.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { MyTaskComponent } from './layout/my-task/my-task.component';
import { TaskOfMemberComponent } from './layout/task-of-member/task-of-member.component';
import { UserProfileComponent } from './layout/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: MyTaskComponent },
  { path: 'my-task', component: MyTaskComponent },
  { path: 'test', component: TestComponent },
  { path: 'task-management', component: TaskManagementComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'task-of-member', component: TaskOfMemberComponent },
  { path: 'user-profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
