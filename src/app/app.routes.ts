import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { AjoutArticleComponent } from './ajout-article/ajout-article.component';
import { ModifierArticleComponent } from './modifier-article/modifier-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';

export const routes: Routes = [
  { path: 'article/afficher', component: ArticleComponent },
  { path: 'article/ajouter', component: AjoutArticleComponent },
  { path: 'article/:id/view', component: DetailArticleComponent }, 
  { path: 'article/:id/edit', component: ModifierArticleComponent }, 
  { path: 'article', redirectTo: 'article/afficher', pathMatch: 'full' },
  { path: '', redirectTo: 'article/afficher', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
