import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { Article } from '../article';
import { Router } from '@angular/router';
import { Comment } from '../comment';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles: Article[] = [];
  comments: { [key: number]: Comment[] } = {};
  form!: FormGroup;
  private platformId: Object;

  constructor(
    public articlesService: ArticlesService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
  }

  ngOnInit(): void {
    this.loadArticles();

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  loadArticles(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedArticles = localStorage.getItem('articles');
      if (storedArticles) {
        try {
          this.articles = JSON.parse(storedArticles);
        } catch (error) {
          console.error('Erreur de parsing des articles depuis localStorage', error);
          this.fetchArticlesFromApi();
        }
      } else {
        this.fetchArticlesFromApi();
      }
    } else {
      this.fetchArticlesFromApi();
    }
  }
  fetchArticlesFromApi(): void {
    this.articlesService.getAll().subscribe({
      next: (data: Article[]) => {
        this.articles = data;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('articles', JSON.stringify(this.articles));
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des articles', error);
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.articlesService.create(this.form.value).subscribe({
        next: (res: Article) => {
          alert("Article ajouté avec succès ☺");
          this.form.reset();
          this.articles.push(res);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('articles', JSON.stringify(this.articles));
          }
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de l\'article', error);
        }
      });
    }
  }

  supprimerArticle(id: number): void {
    this.articlesService.delete(id).subscribe({
      next: () => {
        this.articles = this.articles.filter(article => article.id !== id);
        alert('Article supprimé avec succès !');
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('articles', JSON.stringify(this.articles));
        }
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'article', error);
      }
    });
  }

  loadComments(postId: number): void {
    this.articlesService.getComments(postId).subscribe({
      next: (data: Comment[]) => {
        this.comments[postId] = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des commentaires', error);
      }
    });
  }
}
