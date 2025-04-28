import { createSignal } from "solid-js";

interface copyButtonId {
  id: number;
}


function CopyUrlButton(props:copyButtonId) {
  const [isCopied, setIsCopied] = createSignal(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const copyUrlToClipboard = async () => {
    try {
      const currentUrl = apiUrl + "/faq/" + props.id;
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
