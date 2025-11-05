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
      const cleaned = removeStopwords(value);
      setStore("debouncedQuery", cleaned);
    }, 800);
  },

  get faqs() {
    return store.faqs;
  },

  get isLoading() {
    return store.isLoading;
  },
};

createEffect(async () => {
  if (!store.debouncedQuery) {
    setStore({ faqs: [], isLoading: false });
    return;
  }
  setStore("isLoading", true);
  const data = await fetchFaqs(store.debouncedQuery);
  setStore({ faqs: data, isLoading: false });
});

onCleanup(() => clearTimeout(timeout));
