import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InteractionsComponent } from './components/interactions/interactions.component';
import { SearchComponent } from './components/search/search.component';
import { AccountComponent } from './components/account/account.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { LoginComponent } from './components/session/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RegisterComponent } from './components/session/register/register.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full' 
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'interactions', component: InteractionsComponent },
            { path: 'search', component: SearchComponent },
            { path: 'account', component: AccountComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'messaging', component: MessagingComponent }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
