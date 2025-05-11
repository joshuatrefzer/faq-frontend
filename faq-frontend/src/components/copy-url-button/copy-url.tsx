import { createSignal } from "solid-js";
import { toastService } from "~/services/toastService";
import { dataStore } from "~/stores/DataStore";

interface CopyButtonId {
  id: number;
}

const apiUrl = import.meta.env.VITE_CLIENT_URL;

function CopyUrlButton(props: CopyButtonId) {
  const [isCopied, setIsCopied] = createSignal(false);

  const copyUrlToClipboard = async () => {
    try {
      const currentUrl =  apiUrl + `/faq/${props.id}`;
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (error) {
      toastService.triggerToast("Fehler beim Kopieren des Links", "error");
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
