import { useLocation, useParams } from "@solidjs/router";
import { createResource, Show, Suspense } from "solid-js";
import BackButton from "../back-button/back-button";
import Loader from "../loader/loader";
import "./faq.css";
import type { FAQ } from "../home/Home";

export function getInitialProps() {
  return async (props: { id: number }) => {
    const res = await fetch(`http://joshuatrefzer-backend.com:8080/faq/${props.id}`);
    if (!res.ok) throw new Error("FAQ nicht gefunden");
    return res.json();
  };
}

export default function FAQ() {
  const location = useLocation<{ faq?: FAQ }>();
  const params = useParams();
  const passedFaq = location.state?.faq;
  const id = Number(params.id);

  const [faq] = createResource(passedFaq || id, async (id) => {
    if (passedFaq) return passedFaq;

    const res = await fetch(`http://joshuatrefzer-backend.com:8080/faq/${id}`);
    if (!res.ok) throw new Error("FAQ nicht gefunden");
    return res.json();
  });

  return (
    <div class="faq-container">
      <div class="w-full">
        <BackButton />
      </div>

      <Suspense fallback={<Loader />}>
        <Show when={faq.loading}>
          <Loader />
        </Show>

        <Show when={faq.error}>
          <p class="error-message">Das FAQ konnte nicht geladen werden.</p>
        </Show>

        <Show when={faq()}>
          {(item) => (
            <>
              <strong>{item().question}</strong>
              <div class="solution-container">
                <p>{item().answer}</p>
              </div>
            </>
          )}
        </Show>
      </Suspense>
    </div>
  );
}
