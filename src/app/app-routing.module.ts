import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExploreComponent } from './components/explore/explore.component';
import { AddContentComponent } from './components/add-content/add-content.component';
import { ExploreContentComponent } from './components/explore-content/explore-content.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'explore', component: ExploreComponent

  },
  {
    path: 'content', component: AddContentComponent
  },
  {
    path: 'explorecontent', component:ExploreContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
