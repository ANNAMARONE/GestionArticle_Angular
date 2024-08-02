import { Component, OnInit } from '@angular/core';

import { Article } from '../article';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticlesService } from '../articles.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modifier-article',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './modifier-article.component.html',
  styleUrls: ['./modifier-article.component.css']
})
export class ModifierArticleComponent implements OnInit {
  id!: number;
  article!: Article;
  form!: FormGroup;

  constructor(public articlesService: ArticlesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; 
    this.articlesService.find(this.id).subscribe((data: Article) => {
      this.article = data;
      this.form.patchValue(this.article); 
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }
  

  submit(): void {
    console.log(this.form.value);
    this.articlesService.update(this.id, this.form.value).subscribe((res: any) => {
      alert("Data Updated Successfully ☺");
      this.router.navigateByUrl('/article/afficher'); 
    });
  }
}
