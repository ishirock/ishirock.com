import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  api_key = 'f1dddc9683474714b9604ee24e158184';

  constructor(private http: HttpClient) { }

  initSources() {
    return this.http.get('https://newsapi.org/v2/sources?category=technology&language=en&apiKey=' + this.api_key);
  }

  initArticles() {
    return this.http.get('https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=' + this.api_key);
  }
  
  getArticlesByID(source: String) {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.api_key);
  }
}
