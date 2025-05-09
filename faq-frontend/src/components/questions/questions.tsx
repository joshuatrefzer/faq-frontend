import { useNavigate } from "@solidjs/router";
import "./questions.css"
import { createEffect, Show } from "solid-js";
import { authStore } from "~/stores/AuthStore";
import { dataStore } from "~/stores/DataStore";
import Loader from "../loader/loader";
import Toast from "../toast/toast";

export default function Questions() {

    const navigate = useNavigate()

    createEffect(() => {
        if (!authStore.userIsLoggedIn()) {
            navigate("/admin/auth");
        }
    });



    function transformDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "Europe/Berlin"
        });
    }


    return (
        <Show when={!dataStore.state.loading} fallback={<Loader />}>
            <Toast></Toast>

            <div class="admin-route-wrapper items-start ">
                <div class="question-table-wrapper">
                    <table class="question-table">
                        <thead>
                            <tr>
                                <th>Frage</th>
                                <th class="date-cell" >Erstellt am</th>
                                <th>Aktion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataStore.state.questions.length > 0 ? (
                                dataStore.state.questions.map((q) => (
                                    <tr>
                                        <td class="question-cell" style={{ width: "70%" }}>{q.question}</td>
                                        <td class="date-cell">{transformDate(q.createdAt)}</td>
                                        <td class="button-cell">
                                            <button
                                                class="faq-button"
                                                onClick={() => navigate("/admin/faqs?query=" + q.question + "&questionId=" + q.id)}
                                            >
                                                FAQ erstellen
                                            </button>
                                            <button
                                                class="faq-button"
                                                onClick={() => dataStore.deleteQuestion(q.id)}
                                            >
                                                Frage Löschen
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3}>Keine Fragen verfügbar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Show>
    );
}
