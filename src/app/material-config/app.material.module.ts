import { NgModule } from '@angular/core';
import { MatChipsModule, MatDatepickerModule, MatInputModule, MatMenuModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    imports: [MatChipsModule, MatDatepickerModule, MatInputModule, MatMomentDateModule, MatMenuModule, MatButtonModule, MatSnackBarModule],
    exports: [MatChipsModule, MatDatepickerModule, MatInputModule, MatMomentDateModule, MatMenuModule, MatButtonModule, MatSnackBarModule],
})

export class AppMaterialModule { }
