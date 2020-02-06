import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from "@angular/router";
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';


export const ROUTES: Routes = [
  {path:'', pathMatch: 'full', redirectTo:'/heroes'},
  // {path:'**', pathMatch: 'full', redirectTo:'home'},
  {path:'heroe/:id', component: HeroeComponent},
  {path:'heroes', component: HeroesComponent}
  
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports : [
    RouterModule
  ]
})
export class AppRountingModule { }
