import { createSignal, createResource, onCleanup } from "solid-js";
import "./home.css";
import SearchResult from "../search-result/search-result";
import { A } from "@solidjs/router";
import Loader from "../loader/loader";

export type FAQ = {
  id: number;
  question: string;
  answer: string;
  tags?: string[]
};


async function fetchFaqs(query: string) {
  if (!query) return [];
  const response = await fetch(`http://joshuatrefzer-backend.com:8080/faq/search?query=${encodeURIComponent(query)}`);
  if (response.status === 204) return [];
  return response.json();
}

export default function Home() {
  const [query, setQuery] = createSignal("");
  const [debouncedQuery, setDebouncedQuery] = createSignal("");

  let timeout: ReturnType<typeof setTimeout>;

  const handleInput = (e: InputEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setQuery(value);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setDebouncedQuery(value);
    }, 300);
  };

  onCleanup(() => clearTimeout(timeout)); 

  const [faqs] = createResource(debouncedQuery, fetchFaqs);

  return (
    <div class="container">
      <img class="h-20" src="/logo.svg" alt="" />
      <input
        class="search-input"
        placeholder="Was würdest du gerne wissen?"
        type="text"
        onInput={handleInput}
      />

      <div class="search-result-container">
        {faqs.loading && <p>laden..</p>}

        {faqs()?.length > 0 &&
          faqs().map((faq:FAQ) => (
            <A class="faq-link" href={`/faq/${faq.id}`}>
              <SearchResult text={faq.question} />
            </A>
          ))}

        {!faqs.loading && faqs()?.length === 0 && query() && (
          <div>Keine Ergebnisse gefunden.</div>
        )}
      </div>
    </div>
  );
}
