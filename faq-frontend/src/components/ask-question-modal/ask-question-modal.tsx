import { createSignal } from "solid-js";
import { JSX } from "solid-js";
import "./ask-question-modal.css";

type AskQuestionModalProps = {
    onClose: () => void;
};

const apiUrl = import.meta.env.VITE_API_URL;

export default function AskQuestionModal(props: AskQuestionModalProps): JSX.Element {
    const [question, setQuestion] = createSignal("");
    const [feedback, setFeedback] = createSignal(""); 
    const [isSubmitted, setIsSubmitted] = createSignal(false); 

    const handleSubmit = async () => {
        if (question().trim()) {
            const requestBody = { question: question() };

            try {
                const response = await fetch( apiUrl + "/question", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    setFeedback("Frage wurde erfolgreich gesendet!");
                    setIsSubmitted(true);
                    setTimeout(() => props.onClose(), 2000);
                } else {
                    setFeedback("Etwas ist schiefgegangen. Bitte versuche es später erneut.");
                }
            } catch (error) {
                console.error("Fehler beim Senden der Frage:", error);
                setFeedback("Fehler beim Senden der Frage. Bitte versuche es später.");
            }
        } else {
            setFeedback("Bitte stelle eine Frage.");
        }
    };

    return (
        <div class="modal-backdrop">
            <div class="modal">
                {isSubmitted() ? (
                    <p class="feedback-message">{feedback()}</p>
                ) : (
                    <>
                        <h2>Deine Frage</h2>
                        <textarea
                            class="question-textarea"
                            placeholder="Stell deine Frage hier..."
                            value={question()}
                            onInput={(e) => setQuestion((e.target as HTMLTextAreaElement).value)}
                        />
                        <div class="button-container">
                            <button onClick={props.onClose}>Abbrechen</button>
                            <button onClick={handleSubmit}>Absenden</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
