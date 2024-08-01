import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { Article } from '../article';
import { Router } from '@angular/router';
import{Comment} from '../comment';
import Swal from 'sweetalert2';
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

  isModalVisible = false;

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
  constructor(public articlesService: ArticlesService, private router: Router) {}

  ngOnInit(): void {
    this.loadArticles();
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required),
    });
  }

  loadArticles(): void {
    if (typeof window !== 'undefined') {
      const storedArticles = localStorage.getItem('articles');
      if (storedArticles) {
        this.articles = JSON.parse(storedArticles);
      } else {
        this.articlesService.getAll().subscribe((data: Article[]) => {
          this.articles = data;
         
          localStorage.setItem('articles', JSON.stringify(this.articles));
        });
      }
    } else {
      this.articlesService.getAll().subscribe((data: Article[]) => {
      
        this.articles = data;
      });
    }
  }
  

  get f() {
    return this.form.controls;
  }

  submit(): void {
    console.log(this.form.value);
    this.articlesService.create(this.form.value).subscribe((res: any) => {
      
    
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Article ajouté avec succès ☺",
        showConfirmButton: false,
        timer: 1500
      });
      this.form.reset(); 
      this.articles.push(res); 
      localStorage.setItem('articles', JSON.stringify(this.articles));
    });
  }

  suprimerArticle(id: number): void {
    this.articlesService.delete(id).subscribe(() => {
      this.articles = this.articles.filter(article => article.id !== id);
      Swal.fire({
        title: "Es-tu sûr?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprime-le !"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "supprimer!",
            text: "Article supprimé avec succès !.",
            icon: "success"
          });
        }
      });
      localStorage.setItem('articles', JSON.stringify(this.articles)); 
    });
  }
  loadComments(postId:number):void{
    this.articlesService.getComments(postId).subscribe((data:Comment[])=>{
      this.comments[postId]=data
    })
  }
  
}

