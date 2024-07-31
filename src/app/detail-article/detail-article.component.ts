import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { Article } from '../article';
@Component({
  selector: 'app-detail-article',
  standalone: true,
  imports: [],
  templateUrl: './detail-article.component.html',
  styleUrl: './detail-article.component.css'
})
export class DetailArticleComponent {
  id!:number;
  article!:Article;

  constructor(public articlesService:ArticlesService, private router:Router, private route:ActivatedRoute){}

  ngOnInit():void{
    this.id = this.route.snapshot.params['id'];
    this.articlesService.find(this.id).subscribe((data:Article)=>{
      this.article= data;
    })
  }

}
