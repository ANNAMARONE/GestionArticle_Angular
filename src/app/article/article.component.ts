import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { Article } from '../article';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles: Article[] = [];

  constructor(public articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getAll().subscribe((data: Article[]) => {
      this.articles = data;
      console.log(this.articles);
    });
  }

  suprimerArticle(id: number): void {
    this.articlesService.delete(id).subscribe(() => {
      this.articles = this.articles.filter(article => article.id !== id);
      alert('Article supprimé avec succès !');
    });
  }
}
