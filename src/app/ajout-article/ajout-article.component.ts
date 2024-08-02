import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticlesService } from '../articles.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajout-article',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './ajout-article.component.html',
  styleUrl: './ajout-article.component.css'
})
export class AjoutArticleComponent implements OnInit {
form!:FormGroup;
constructor(public articlesService:ArticlesService,private router:Router){

}
ngOnInit(): void {
}
}
