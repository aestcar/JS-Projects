import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { GuardAuthGuard } from './guard/guard-auth.guard';
import { MainComponent } from './main/main';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then( m => m.ChatModule), canActivate: [GuardAuthGuard]}
  /*{ path:'chat', component:ChatComponent}*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
