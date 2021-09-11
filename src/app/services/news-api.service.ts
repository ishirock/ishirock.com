import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  api_key = 'f1dddc9683474714b9604ee24e158184';

  constructor(private http: HttpClient) { }

  newsURl = "https://api.bing.microsoft.com/v7.0/news";



  newsArticles():Observable<any>{
    const headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", "5f717f8b1ea648d3bb0f822619b35976");
    return this.http.get(this.newsURl,{headers});
  }

  getBArticleByCategory(category: String):Observable<any>{
    const headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", "5f717f8b1ea648d3bb0f822619b35976");
    var url = this.newsURl + "?mkt=en-in&category="+category;
    console.log(url);
    return this.http.get(url, {headers});
  }
}
