import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AuthorizationComponent} from "../../dialog-boxes/authorization/authorization.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public dialog: MatDialog,) {
  }

  authorize() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '620px'
    dialogConfig.disableClose = true;
    const dialogRef = this.openDialog(AuthorizationComponent, {}, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if (data.registration) {
          console.log("reg")
        }else {
          console.log("log")
        }
      } else {
      }
    })
  }


  private openDialog(component: any, data: any, config: MatDialogConfig) {
    config.data = data;
    return this.dialog.open(component, config);
  }
}
