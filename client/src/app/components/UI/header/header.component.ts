import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AuthorizationComponent} from "../../dialog-boxes/authorization/authorization.component";
import {UserService} from "../../../services/user.service";
import {MessageComponent} from "../../dialog-boxes/message/message.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog,
              private userService: UserService) {
  }

  authorize() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '620px'
    dialogConfig.disableClose = true;
    const dialogRef = this.openDialog(AuthorizationComponent, {}, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.authorizationAction(data);
      }
    })
  }

  private createUser(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.userService.createUser(data).subscribe({
      next: (data) => {
        localStorage.setItem('auth-token', data.jwtToken);
        this.openDialog(MessageComponent, {text: 'The account has been created successfully'}, dialogConfig);
      },
      error: (error) => {
        this.openDialog(MessageComponent, {text: error.error}, dialogConfig);
      }
    })
  }

  private loginUser(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.userService.loginUser(data).subscribe({
      next: (data) => {
        localStorage.setItem('auth-token', data.jwtToken);
        this.openDialog(MessageComponent, {text: 'You have successfully logged in to your account'}, dialogConfig);
      },

      error: (error) => {
        this.openDialog(MessageComponent, {text: error.error}, dialogConfig);
      }
    })
  }

  private authorizationAction(data: any){
    if (data.registration) {
      this.createUser({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        password: data.password
      });
    } else {
      this.loginUser({
        email: data.email,
        password: data.password
      })
    }
  }

  private openDialog(component: any, data: any, config: MatDialogConfig) {
    config.data = data;
    return this.dialog.open(component, config);
  }
}
