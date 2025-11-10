
import SearchResult from "../search-result/search-result";
import { A } from "@solidjs/router";
import AskQuestionModal from "../ask-question-modal/ask-question-modal";
import { createSignal } from "solid-js";
import "./home.css";
import { customerStore, FAQ } from "~/stores/CustomerStore";
import AsyncLoader from "../loader/async-loader";

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
          <p class="text-center home-text">Gib hier oben deine Frage, oder auch einzelne Schlagwörter ein.
            <br /><br />
            Falls du keine passende Antwort findest, sende uns deine Frage unter dem Button "Frage stellen" gerne zu.
            <br />
            Wir beantworten diese so schnell wie möglich und stellen euch die Antwort hier zur Verfügung.
          </p>}

        {customerStore.isLoading && <AsyncLoader />}

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
