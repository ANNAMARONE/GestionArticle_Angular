import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticlesService } from '../articles.service';
import { Router, RouterModule } from '@angular/router';
import { Article } from '../article';

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
  this.form = new FormGroup({
    title:new FormControl('',[Validators.required]),
    body:new FormControl('',Validators.required),
  })
}
get f(){
  return this.form.controls;
}
submit(){
  console.log(this.form.value);
  this.articlesService.create(this.form.value).subscribe((res:any)=>{
    alert("article ajouter avec succés")
    this.router.navigateByUrl('/article/articles');
  });
}
}
