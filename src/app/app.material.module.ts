import { NgModule } from '@angular/core';
import { MatChipsModule, MatMenuModule } from '@angular/material';

@NgModule({
    imports: [MatChipsModule, MatMenuModule],
    exports: [MatChipsModule, MatMenuModule],
})

export class AppMaterialModule { }
