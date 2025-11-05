
import SearchResult from "../search-result/search-result";
import { A } from "@solidjs/router";
import AskQuestionModal from "../ask-question-modal/ask-question-modal";
import { createSignal } from "solid-js";
import "./home.css";
import { customerStore, FAQ } from "~/stores/CustomerStore";

export default function Home() {
  const [showModal, setShowModal] = createSignal(false);

  return (
    <div class="container">
      <img class="h-20" src="/logo.svg" alt="" />
      <input
        class="search-input"
        placeholder="Was würdest du gerne wissen?"
        type="text"
        value={customerStore.query}
        onInput={(e) => customerStore.setQuery((e.target as HTMLInputElement).value)}
      />

      <div class="search-result-container">

        {!customerStore.isLoading && customerStore.faqs.length == 0 && 
        <p class="text-center home-text">Gebe deine Frage, oder auch einzelne Schlagwörter ein, um dein Problem zu lösen.
          <br /><br />
          Falls du keine passende Antwort findest, kannst du uns gerne deine Frage zusenden.
          <br />
          Wir beantworten die Frage so schnell wie möglich und stellen die Antwort euch hier zur Verfügung.

          <br /><br />
          Klicke dafür den Button unten am Bildschirm. <br />⬇️
        </p> } 

        {customerStore.isLoading && <p>laden <span class="loading-points">...</span></p>}
      
        {!customerStore.isLoading && customerStore.faqs.length > 0 &&
          customerStore.faqs.map((faq: FAQ) => (
            <A class="faq-link" href={`/faq/${faq.id}`} state={{ faq }}>
              <SearchResult text={faq.question} />
            </A>
          ))
        }

        {!customerStore.isLoading && customerStore.faqs.length === 0 && customerStore.query.trim() && (
          <div class="send-question">
            <p>
              Leider haben wir dafür noch keine Antwort. <br /><br />
              Du kannst uns aber gerne deine Frage zusenden und wir werden die Lösung zeitnah hier einstellen.
            </p>
            <button onClick={() => setShowModal(true)}>Frage stellen</button>
          </div>
        )}
      </div>
      <div>
         <button onClick={() => setShowModal(true)}>Frage stellen</button>
      </div>

      {showModal() && <AskQuestionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
