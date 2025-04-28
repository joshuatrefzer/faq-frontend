import { createSignal, createEffect } from "solid-js";

interface CopyButtonId {
  id: number;
}

function CopyUrlButton(props: CopyButtonId) {
  const [isCopied, setIsCopied] = createSignal(false);

  const isBrowser = typeof window !== "undefined"; 

  createEffect(() => {
    if (isBrowser) {
      console.log("Clipboard API wird im Browser verwendet.");
    }
  });

  const copyUrlToClipboard = async () => {
    if (isBrowser) { 
      try {
        const currentUrl = `http://joshuatrefzer-backend.com:3000/faq/${props.id}`;
        await navigator.clipboard.writeText(currentUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
      } catch (error) {
        alert("Hier ist ein Fehler passiert..");
      }
    } else {
      console.log("Clipboard-Funktion ist nur im Browser verfügbar!");
    }
  };

  return (
    <div class="copy-url">
      <button onClick={copyUrlToClipboard}>
        {isCopied() ? "✅ Link kopiert!" : "📋 Link kopieren"}
      </button>
    </div>
  );
}

export default CopyUrlButton;
