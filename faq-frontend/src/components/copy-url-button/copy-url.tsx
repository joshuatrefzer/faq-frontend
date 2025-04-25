import { createSignal } from "solid-js";

function CopyUrlButton() {
  const [isCopied, setIsCopied] = createSignal(false);

  const copyUrlToClipboard = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (error) {
      alert("Hier ist ein Fehler passiert..")
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
