import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { Article } from '../article';
import{Comment} from '../comment';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-article.component.html',
  styleUrl: './detail-article.component.css'
})
export class DetailArticleComponent {
  id!:number;
  article!:Article;
  comments: { [key: number]: Comment[] } = {};
  constructor(public articlesService:ArticlesService, private router:Router, private route:ActivatedRoute){}

  ngOnInit():void{
    this.id = this.route.snapshot.params['id'];
    this.articlesService.find(this.id).subscribe((data:Article)=>{
      this.article= data;
    })
  }
  loadComments(postId:number):void{
    this.articlesService.getComments(postId).subscribe((data:Comment[])=>{
      this.comments[postId]=data
    })
  }

}
