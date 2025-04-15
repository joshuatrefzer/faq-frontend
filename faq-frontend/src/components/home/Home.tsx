
import "./home.css"
import SearchResult  from "../search-result/search-result"
import { A } from "@solidjs/router";


export default function Home() {
  
  
  return (
    <div class="container">
        <img class="h-20" src="/logo.svg" alt="" />
        <input class="search-input" placeholder="Was würdest du gerne wissen?" type="text" />
        <div class="search-result-container">
        <A class="faq-link" href="/faq/1">  
          <SearchResult />
        </A>
        <A class="faq-link" href="/faq/2"> 
          <SearchResult />
        </A>
        <A class="faq-link" href="/faq/2"> 
          <SearchResult />
        </A>
        <A class="faq-link" href="/faq/2"> 
          <SearchResult />
        </A>
        <A class="faq-link" href="/faq/2"> 
          <SearchResult />
        </A>
        
  
        </div>
    </div>
    
  );
}