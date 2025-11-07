import { createStore } from "solid-js/store";
import { createSignal, createEffect, onCleanup } from "solid-js";
import { removeStopwords } from "~/utils/text";

export type FAQ = {
  id: number;
  question: string;
  answer: string;
  link?: string;
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

type Store = {
  query: string;
  debouncedQuery: string;
  faqs: FAQ[];
  isLoading: boolean;
};

const [store, setStore] = createStore<Store>({
  query: "",
  debouncedQuery: "",
  faqs: [],
  isLoading: false,
});

let timeout: ReturnType<typeof setTimeout>;

export const customerStore = {
  get query() {
    return store.query;
  },
  setQuery(value: string) {
    clearTimeout(timeout);
    setStore("query", value);

    if (value.trim()) {
      setStore("isLoading", true);
    }

    timeout = setTimeout(() => {
      const cleaned = removeStopwords(value.trim());
      setStore("debouncedQuery", cleaned);

      if (!cleaned) setStore("isLoading", false);
    }, 800);

  },

  get faqs() {
    return store.faqs;
  },

  get isLoading() {
    return store.isLoading;
  },
};

function computeScore(faq: FAQ, query: string): number {
  const q = query.toLowerCase();
  const question = faq.question.toLowerCase();
  const answer = faq.answer.toLowerCase();

  let score = 0;

  if (question.includes(q)) score += 3;
  if (answer.includes(q)) score += 1;

  const words = q.split(/\s+/);
  for (const w of words) {
    if (!w) continue;
    if (question.includes(w)) score += 2;
    if (answer.includes(w)) score += 1;
  }

  return score;
}

createEffect(async () => {
  const query = store.debouncedQuery.trim();

  if (!query) {
    setStore({ faqs: [], isLoading: false });
    return;
  }

  setStore("isLoading", true);
  const data = await fetchFaqs(query);

  const sorted = [...data].sort((a, b) => {
    const scoreA = computeScore(a, store.query);
    const scoreB = computeScore(b, store.query);
    return scoreB - scoreA;
  });

  setStore({ faqs: sorted, isLoading: false });
});



onCleanup(() => clearTimeout(timeout));
