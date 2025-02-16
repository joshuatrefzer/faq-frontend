
import "./home.css"
import SearchResult  from "../search-result/search-result"
import { A } from "@solidjs/router";
import Loader from "../loader/loader";


export default function Home() {
  
  
  return (
    <div class="container">
        <img class="h-20" src="/logo.svg" alt="" />
        <input placeholder="Was würdest du gerne wissen?" type="text" />
        <div class="search-result-container">
          {/* <Loader></Loader> */}
        <A class="link" href="/faq/1">  
          <SearchResult />
        </A>
        <A class="link" href="/faq/2"> 
          <SearchResult />
        </A>
  
        </div>
    </div>
    
  );
}