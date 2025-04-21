import TagSelect from "../tag-select/tag-select";
import "../../app.css"
import "./add-faq.css"
import { createEffect, createSignal, onMount } from "solid-js";
import { authStore } from "~/stores/AuthStore";
import { useNavigate, useSearchParams } from "@solidjs/router";
import { dataStore, Tag } from "~/stores/DataStore";

export default function AddFAQ() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [question, setQuestion] = createSignal("");
    let questionId: number | null;

    onMount(() => {
        const queryParam = searchParams.query;
        if (typeof queryParam === "string") {
            setQuestion(queryParam);
        } else if (Array.isArray(queryParam)) {
            setQuestion(queryParam[0]);
        }

        const id = searchParams.questionId;
        if (typeof id === "string") {
            questionId = Number(id);
        }
    });

    createEffect(() => {
        if (!authStore.userIsLoggedIn()) {
            navigate("/admin/auth");
        }
    });

    function selectTag(tagName: string) {
        const current = dataStore.selectedTagNames();
        if (!current.includes(tagName)) {
            dataStore.setSelectedTagNames([...current, tagName]);
        }
    }

    function removeTagFromSelection(index: number) {
        const updatedTags = [...dataStore.selectedTagNames()];
        updatedTags.splice(index, 1);
        dataStore.setSelectedTagNames(updatedTags);
    }

    function submit(event: Event) {
        event.preventDefault(); 
    
        if (questionId) {
            dataStore.deleteQuestion(questionId);
        }
    
    }

    return (
        <form onSubmit={submit} class="grid-container">
            <h1>FAQ erstellen</h1>
            <input
                required
                placeholder="Welche Frage soll beantwortet werden?"
                type="text"
                value={question()}
                onInput={(e) => setQuestion(e.currentTarget.value)}
            />
            <input placeholder="Stelle hier den Link zu einem Video bereit, wenn vorhanden." type="text" />

            <textarea required placeholder="Beschreibung der Lösung"></textarea>
            <div class="tag-select-container">
                <TagSelect onSelect={(tag) => selectTag(tag)}></TagSelect>
                <div class="tag-container">
                    {dataStore.selectedTagNames().map((name, index) => (
                        <div class="tag">
                            <span>{name}</span>
                            <img onclick={() => removeTagFromSelection(index)} class="close" src="/close.png" alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <div class="button-container">
                <button type="submit" >FAQ erstellen</button>
            </div>
        </form>
    )
}