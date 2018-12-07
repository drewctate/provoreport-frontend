import { NgModule } from '@angular/core';
import { MatChipsModule, MatDatepickerModule, MatInputModule, MatMenuModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    imports: [MatChipsModule, MatDatepickerModule, MatInputModule, MatMomentDateModule, MatMenuModule],
    exports: [MatChipsModule, MatDatepickerModule, MatInputModule, MatMomentDateModule, MatMenuModule],
})

export class AppMaterialModule { }
