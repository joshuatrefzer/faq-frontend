
interface SearchResultProps {
    text: string;
}
  
  export default function SearchResult(props: SearchResultProps) {
    return (
      <div class="search-result">
        <p>{props.text}</p>
      </div>
    );
  }