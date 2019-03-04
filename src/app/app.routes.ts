import { Routes } from '@angular/router';

import { MainScreenComponent } from './main-screen/main-screen.component';
import { DashComponent } from './modules/admin/dash/dash.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: MainScreenComponent
    },
    {
        path: 'admin',
        component: DashComponent
    },
    { path: '**', redirectTo: '' }
];
