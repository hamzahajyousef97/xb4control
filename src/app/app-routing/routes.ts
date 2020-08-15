import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AddSummerComponent } from '../add-summer/add-summer.component';
import { AddWinterComponent } from '../add-winter/add-winter.component';
import { WinterComponent } from '../winter/winter.component';
import { SummerComponent } from '../summer/summer.component';


import { EditSummerComponent } from '../edit-summer/edit-summer.component';
import { EditWinterComponent } from '../edit-winter/edit-winter.component';
import { FeedbackComponent } from '../feedback/feedback.component';

import { SummerResolver } from '../resolver/summer.resolver';
import { WinterResolver } from '../resolver/winter.resolver';


import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'add-summer', component: AddSummerComponent },
    { path: 'add-winter', component: AddWinterComponent },
    { path: 'edit-summer/:id', component: EditSummerComponent, resolve:{ data : SummerResolver } },
    { path: 'edit-winter/:id', component: EditWinterComponent, resolve:{ data : WinterResolver } },
    { path: 'summer', component: SummerComponent },
    { path: 'winter', component: WinterComponent },
    { path: 'feedbacks', component: FeedbackComponent},

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**',  component: PageNotFoundComponent }
];