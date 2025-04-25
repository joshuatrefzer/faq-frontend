import { createStore } from "solid-js/store";
import { authStore } from "./AuthStore";
import { createMemo, createSignal } from "solid-js";

export interface Question {
  id: number;
  question: string;
  createdAt: string;
}

export interface Tag {
  id?: number;
  name: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  link:string;
  tags?: Tag[];
}

const [state, setState] = createStore({
  tags: [] as Tag[],
  questions: [] as Question[],
  faqs: [] as FAQ[],
  loading: false,
  error: null as string | null,
  success: false
});

const [selectedTagNames, setSelectedTagNames] = createSignal<string[]>([]);

const tagNamesWithoutSelectedOnes = createMemo(() => {
  const allTags = state.tags;
  return allTags
    .filter(tag => !selectedTagNames().includes(tag.name))
    .map(tag => tag.name);
});



async function loadAllData() {
  setState({ loading: true, error: null });

  const token = authStore.getToken();

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


async function createNewTag(name: string) {
  const token = authStore.getToken();

  if (!token) {
    setState({ error: "Kein Token vorhanden" });
    setState({ loading: false });
    return;
  }

  const response = await fetch("http://joshuatrefzer-backend.com:8080/tags?name=" + name, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Fehler beim Laden des neuen Tags");
  }

  const newTag = await response.json();
  setState("tags", (tags) => [...tags, newTag]);
}

async function deleteQuestion(id: number) {
  const token = authStore.getToken();

  if (!token) {
    setState({ error: "Kein Token vorhanden" });
    return;
  }

  const response = await fetch(`http://joshuatrefzer-backend.com:8080/question/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Fehler beim Löschen der Frage");
  }

  setState("questions", (questions) => questions.filter(q => q.id !== id));
}

async function addFAQ(faq: Partial<FAQ>) {
  const token = authStore.getToken();

  if (!token) {
    setState({ error: "Kein Token vorhanden" });
    return;
  }

  setState({ loading: true, error: null, success: false });

  try {
    const faqResponse = await fetch("http://joshuatrefzer-backend.com:8080/faq", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(faq),
    });

    if (!faqResponse.ok) {
      throw new Error("Fehler beim Erstellen des FAQ");
    }

    const newFAQ = await faqResponse.json();

    const selectedTags = selectedTagNames();
    if (selectedTags.length > 0) {
      const tagsParam = selectedTags.map(encodeURIComponent).join(",");
      const tagResponse = await fetch(`http://joshuatrefzer-backend.com:8080/faq/${newFAQ.id}/tags?tags=${tagsParam}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!tagResponse.ok) {
        throw new Error("Fehler beim Zuweisen der Tags");
      }

      const updatedFAQ = await tagResponse.json();
      setState("faqs", (faqs) => [...faqs, updatedFAQ]);
    } else {
      setState("faqs", (faqs) => [...faqs, newFAQ]);
    }

    setState({ success: true });
    setSelectedTagNames([]);
  } catch (err) {
    setState({ error: (err as Error).message });
  } finally {
    setState({ loading: false });
  }
}

async function editFAQ(faq: FAQ) {
  const token = authStore.getToken();

  if (!token) {
    setState({ error: "Kein Token vorhanden" });
    return;
  }

  setState({ loading: true, error: null, success: false });

  try {
    const faqResponse = await fetch("http://joshuatrefzer-backend.com:8080/faq/" + faq.id, {
      method: "PUT", 
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(faq),
    });

    if (!faqResponse.ok) {
      throw new Error("Fehler beim Ändern des FAQ");
    }

    const newFAQ = await faqResponse.json(); 

    const selectedTags = selectedTagNames();
    
    if (selectedTags.length > 0) {
      const tagsParam = selectedTags.map(encodeURIComponent).join(",");
      const tagResponse = await fetch(`http://joshuatrefzer-backend.com:8080/faq/${newFAQ.id}/tags?tags=${tagsParam}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!tagResponse.ok) {
        throw new Error("Fehler beim Zuweisen der Tags");
      }

      const updatedFAQ = await tagResponse.json();

      setState("faqs", (faqs) => {
        return faqs.map((f) => (f.id === updatedFAQ.id ? updatedFAQ : f));
      });

    } else {
      setState("faqs", (faqs) => {
        return faqs.map((f) => (f.id === newFAQ.id ? newFAQ : f));
      });
    }

    setState({ success: true });  
    setSelectedTagNames([]);     

  } catch (err) {
    setState({ error: (err as Error).message });
  } finally {
    setState({ loading: false });
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
  createNewTag,
  selectedTagNames,
  setSelectedTagNames,
  tagNamesWithoutSelectedOnes,
  deleteQuestion,
  addFAQ,
  editFAQ
};
