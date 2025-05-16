import { createSignal, createResource, onCleanup } from "solid-js";
import "./home.css";
import SearchResult from "../search-result/search-result";
import { A } from "@solidjs/router";
import AskQuestionModal from "../ask-question-modal/ask-question-modal";
import { removeStopwords } from "~/utils/text";

export type FAQ = {
  id: number;
  question: string;
  answer: string;
  link?:string;
};

const apiUrl = import.meta.env.VITE_API_URL;

async function fetchFaqs(query: string): Promise<FAQ[]> {
  if (!query) return [];
  const response = await fetch(
     apiUrl + `/faq/search?query=${encodeURIComponent(query)}`
  );
  if (response.status === 204) return [];
  return response.json();
}

export default function Home() {
  const [query, setQuery] = createSignal("");
  const [debouncedQuery, setDebouncedQuery] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  const [showModal, setShowModal] = createSignal(false);

  let timeout: ReturnType<typeof setTimeout>;

  const handleInput = (e: InputEvent) => {
    const value = (e.target as HTMLInputElement).value;

    setQuery(value);

    clearTimeout(timeout);

    if (value.trim()) {
      setIsLoading(true); 
    }

    timeout = setTimeout(() => {
      const cleaned = removeStopwords(value);
      setDebouncedQuery(cleaned);
    }, 800);
  };

  onCleanup(() => clearTimeout(timeout));

  const [faqs] = createResource(debouncedQuery, async (query) => {
    if (query.trim() === "") {
      return [];
    }

    const data = await fetchFaqs(query);
    setIsLoading(false); 
    return data;
  });

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
        {isLoading() && <p>laden <span class="loading-points" >...</span></p>}

        {!isLoading() && (faqs() ?? []).length > 0 &&
          faqs()!.map((faq) => (
            <A
              class="faq-link"
              href={`/faq/${faq.id}`}
              state={{ faq }}
            >
              <SearchResult text={faq.question} />
            </A>
          ))
        }

        {!isLoading() && faqs()?.length === 0 && query().trim() && (
          <div class="send-question">
            <p>
              Leider haben wir dafür noch keine Antwort. <br /><br />
              Du kannst uns aber gerne deine Frage zusenden und wir werden die Lösung zeitnah hier einstellen.
            </p>
            <button onClick={() => setShowModal(true)}>Frage stellen</button>
          </div>
        )}
      </div>

      {showModal() && <AskQuestionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
