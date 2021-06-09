import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../services/news-api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  
  mArticles: Array<any>;
  mSources: Array<any>;
  bArticles: Array<any>;
  bCategories: Array<any>;

  constructor(private newsapi: NewsApiService) {
  }

  ngOnInit() {
    
    this.newsapi.newsArticles().subscribe((result) =>{
      this.bArticles = result['value'];
      console.log(this.bArticles);
    })

    this.bCategories = [
      {
        "id": "Business",
        "category": "Business",
        "market": "en-IN",
    },
    {
        "id": "ScienceAndTechnology",
        "category": "ScienceAndTechnology",
        "language": "en-IN",
    },
    {
      "id": "Sports",
      "category": "Sports",
      "language": "en-IN",
    },
    {
      "id": "Entertainment",
      "category": "Entertainment",
      "language": "en-IN",
    },
    {
      "id": "Politics",
      "category": "Politics",
      "language": "en-IN",
    },
    ]

  }

  searchArticles(source) {
    console.log("selected source is: " + source);
    this.newsapi.getBArticleByCategory(source).subscribe((result) =>{
      this.bArticles = result['value'];
      console.log(this.bArticles);
    })
  }

}
