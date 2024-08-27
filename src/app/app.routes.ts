import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { InteractionsComponent } from './components/interactions/interactions.component';
import { SearchComponent } from './components/search/search.component';
import { AccountComponent } from './components/account/account.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MessagingComponent } from './components/messaging/messaging.component';

export const routes: Routes = [
    {
        path: 'navbar',
        component: NavbarComponent
    },
    {
        path: 'home', 
        component: HomeComponent
    },
    {
        path: 'interactions',
        component: InteractionsComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'account',
        component: AccountComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'messaging',
        component: MessagingComponent
    }
];
