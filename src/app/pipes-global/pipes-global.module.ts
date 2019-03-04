
import { NgModule } from '@angular/core';
import { ReversePipe } from './reverse/reverse.pipe';
import { SortPipe } from './sort/sort';

@NgModule({
    declarations: [
        ReversePipe,
        SortPipe
    ],
    exports: [
        ReversePipe,
        SortPipe
    ]
})
export class PipesGlobalModule { }
