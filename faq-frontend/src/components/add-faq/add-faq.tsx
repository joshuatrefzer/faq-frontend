import TagSelect from "../tag-select/tag-select";
import "../../app.css"
import "./add-faq.css"
import { createEffect, createSignal, onMount, Show } from "solid-js";
import { authStore } from "~/stores/AuthStore";
import { useNavigate, useSearchParams } from "@solidjs/router";
import { dataStore, FAQ, Tag } from "~/stores/DataStore";
import Loader from "../loader/loader";

export default function AddFAQ() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [question, setQuestion] = createSignal("");
    const [answer, setAnswer] = createSignal("");
    const [link, setLink] = createSignal("");
    const [editMode, setEditMode] = createSignal(false);
    const [faqToEditId, setFaqToEditId] = createSignal(0);

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

        const editId = searchParams.faqToEditId;
        if (typeof editId === "string") {
            const faqId = Number(editId);
            setEditMode(true);

            const faqToEdit = dataStore.state.faqs.find(f => f.id === faqId);
            if (faqToEdit) {
                setFaqToEditId(faqId);
                setQuestion(faqToEdit.question);
                setAnswer(faqToEdit.answer);
                setLink(faqToEdit.link || "");
                
                if (faqToEdit.tags) {
                    let stringArray= faqToEdit.tags?.map( t => t.name);
                    dataStore.setSelectedTagNames(stringArray);
                }
                
            }
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

    function editFAQ(){
        const faqToEdit: FAQ = {
            id: faqToEditId(),
            question: question(),
            answer: answer(),
            link: link(),
        };

        dataStore.editFAQ(faqToEdit as FAQ);
    }


    function addFAQ() {
        const newFAQ: Partial<FAQ> = {
            question: question(),
            answer: answer(),
            link: link(),
        };

        dataStore.addFAQ(newFAQ);
        if (questionId) dataStore.deleteQuestion(questionId);
    }

    function submit(event: Event) {
        event.preventDefault();
        if (editMode()) {
            editFAQ();
        } else {
            addFAQ();
        }
        resetUI();
    }

    function resetUI() {
        setQuestion("");
        setAnswer("");
        setLink("");
        questionId = null;
        setFaqToEditId(0);
        setEditMode(false);
    }

    return (
        <Show when={!dataStore.state.loading} fallback={<Loader></Loader>}>
            <form onSubmit={submit} class="grid-container">

                <Show when={!editMode()} fallback={<h1>FAQ bearbeiten</h1>}>
                    <h1>FAQ erstellen</h1>
                </Show>

                <input
                    required
                    placeholder="Welche Frage soll beantwortet werden?"
                    type="text"
                    value={question()}
                    onInput={(e) => setQuestion(e.currentTarget.value)}
                />
                <input
                    placeholder="Stelle hier den Link zu einem Video bereit, wenn vorhanden."
                    type="text"
                    value={link()}
                    onInput={(e) => setLink(e.currentTarget.value)}
                />

                <textarea
                    required
                    placeholder="Beschreibung der Lösung"
                    value={answer()}
                    onInput={(e) => setAnswer(e.currentTarget.value)}
                ></textarea>
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
                    <Show when={!editMode()} fallback={ <button type="submit" >Änderungen speichern</button>}>
                        <button type="submit" >FAQ erstellen</button>
                    </Show>

                </div>
            </form>
        </Show>
    )
}