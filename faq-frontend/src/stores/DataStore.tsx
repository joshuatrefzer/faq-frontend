import { createStore } from "solid-js/store";
import { authStore } from "./AuthStore";

// Definiere die Typen
interface Question {
  question: string;
  createdAt: string;
}

interface Tag {
  id: number;
  name: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const [state, setState] = createStore({
  tags: [] as Tag[],   // Tag Typ verwenden
  questions: [] as Question[],   // Question Typ verwenden
  faqs: [] as FAQ[],   // FAQ Typ verwenden
  loading: false,
  error: null as string | null,
  success: false
});

async function loadAllData() {
  setState({ loading: true, error: null });

  const token = authStore.getToken();
  console.log(token);

  if (!token) {
    setState({ error: "Kein Token vorhanden" });
    setState({ loading: false });
    return;
  }

  try {
    const [questionsRes, tagsRes, faqsRes] = await Promise.all([
      fetch("http://joshuatrefzer-backend.com:8080/question", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      fetch("http://joshuatrefzer-backend.com:8080/tags", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      fetch("http://joshuatrefzer-backend.com:8080/faq", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    ]);

    if (!questionsRes.ok || !tagsRes.ok || !faqsRes.ok) {
      throw new Error("Fehler beim Laden der Daten");
    }

    const [questions, tags, faqs] = await Promise.all([
      questionsRes.json(),
      tagsRes.json(),
      faqsRes.json(),
    ]);

    setState({
      questions,
      tags,
      faqs,
      success: true,
    });
  } catch (err) {
    setState({ error: (err as Error).message });
  } finally {
    setTimeout(() => {
        setState({ loading: false });
    }, 1200);
  }
}

function reset() {
  setState({
    tags: [],
    questions: [],
    faqs: [],
    loading: false,
    error: null,
    success: false,
  });
}

export const dataStore = {
  state,
  loadAllData,
  reset,
};
