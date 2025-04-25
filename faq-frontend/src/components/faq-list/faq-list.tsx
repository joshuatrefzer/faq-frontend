import { createSignal, createMemo, For, Show } from "solid-js";
import { dataStore, FAQ } from "~/stores/DataStore";
import "./faq-list.css";
import { useNavigate } from "@solidjs/router";


function FAQList() {
  const [filter, setFilter] = createSignal("");
  const [showConfirmPopup, setShowConfirmPopup] = createSignal(false);
  const [faqToDelete, setFaqToDelete] = createSignal<FAQ | null>(null);

  const navigate = useNavigate();

  function editFAQ(faq: FAQ) {
    navigate(`/admin/faqs?faqToEditId=${faq.id}`);
  }

  const filteredFaqs = createMemo(() =>
    dataStore.state.faqs.filter((faq) =>
      faq.question.toLowerCase().includes(filter().toLowerCase())
    )
  );

  function confirmDelete(faq: FAQ) {
    setFaqToDelete(faq);
    setShowConfirmPopup(true);
  }

  function deleteFAQ() {
    const faq = faqToDelete();
    if (faq) {
      // Achte auf dein deleteFAQ im Store
    }
    setFaqToDelete(null);
    setShowConfirmPopup(false);
  }

  function cancelDelete() {
    setFaqToDelete(null);
    setShowConfirmPopup(false);
  }

  return (
    <div class="faq-item-container">
      <div class="faq-header">
        <input
          type="text"
          placeholder="FAQ's durchsuchen..."
          value={filter()}
          onInput={(e) => setFilter(e.currentTarget.value)}
          class="faq-search-input"
        />
      </div>

      <div class="faq-list">
        <Show
          when={filteredFaqs().length > 0}
          fallback={<div class="faq-empty">Es exisitieren keine FAQ's für diese Sucheingabe</div>}
        >
          <For each={filteredFaqs()}>
            {(faq) => (
              <div class="faq-item">
                <div class="faq-question">{faq.question}</div>
                <Show when={faq.tags?.length === 0} fallback={<div class="tag-number">{faq.tags?.length}</div>}>
                  <div class="warning">
                    <img src="/warning.png" alt="Warnung" />
                  </div>
                </Show>

                <div class="faq-actions">
                  <button
                    class="faq-button"
                    onClick={() => editFAQ(faq)}
                  >
                    FAQ bearbeiten
                  </button>
                  <button
                    class="faq-button"
                    onClick={() => confirmDelete(faq)}
                  >
                    FAQ löschen
                  </button>
                </div>
              </div>
            )}
          </For>
        </Show>
      </div>

      <Show when={showConfirmPopup()}>
        <div class="popup-backdrop">
          <div class="popup">
            <p>Möchtest du dieses FAQ wirklich löschen?</p>
            <div class="popup-actions">
              <button class="faq-button" onClick={cancelDelete}>Abbrechen</button>
              <button class="faq-button danger" onClick={deleteFAQ}>Ja, löschen</button>

            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default FAQList;
