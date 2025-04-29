import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RoleComponent } from './components/role/role.component';
import { ShowroomComponent } from './components/showroom/showroom.component';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/user/user.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { TestComponent } from './test/test.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LeftSidebarComponent } from './layout/left-sidebar/left-sidebar.component';
import { TaskManagementComponent } from './layout/task-management/task-management.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { TaskOfMemberComponent } from './layout/task-of-member/task-of-member.component';
import { UserProfileComponent } from './layout/user-profile/user-profile.component';
import { AssignTaskDialogComponent } from './components/assign-task-dialog/assign-task-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    RoleComponent,
    ShowroomComponent,
    TaskComponent,
    UserComponent,
    TestComponent,
    HeaderComponent,
    FooterComponent,
    LeftSidebarComponent,
    TaskManagementComponent,
    LoginComponent,
    RegisterComponent,
    TaskOfMemberComponent,
    AssignTaskDialogComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckbox,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule





  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
