import { NgModule } from '@angular/core';
import { MatChipsModule, MatDatepickerModule, MatInputModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    imports: [MatChipsModule, MatDatepickerModule, MatInputModule, MatMomentDateModule, MatMenuModule, MatButtonModule],
    exports: [MatChipsModule, MatDatepickerModule, MatInputModule, MatMomentDateModule, MatMenuModule, MatButtonModule],
})

export class AppMaterialModule { }
