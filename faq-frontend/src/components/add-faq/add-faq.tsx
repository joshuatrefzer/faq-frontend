import TagSelect from "../tag-select/tag-select";
import "../../app.css"
import "./add-faq.css"
import { createEffect } from "solid-js";
import { authStore } from "~/stores/AuthStore";
import { useNavigate } from "@solidjs/router";

export default function AddFAQ() {

    const navigate = useNavigate()

    createEffect(() => {
        if (!authStore.userIsLoggedIn()) {
            navigate("/admin/auth");
        }
    });
    
    return (
        <form class="grid-container">
            <h1>FAQ erstellen</h1>
            <input required placeholder="Welche Frage soll beantwortet werden?" type="text" />
            <input placeholder="Stelle hier den Link zu einem Video bereit, wenn vorhanden." type="text" />

            <textarea required placeholder="Beschreibung der Lösung"></textarea>
            <div class="tag-select-container">
                <TagSelect onSelect={(tag) => console.log("Ausgewähltes Tag:", tag)}></TagSelect>
                <div class="tag-container">
                    <div class="tag">sumup</div>
                    <div class="tag">sumup</div>
                    <div class="tag">sumup</div>
                    <div class="tag">sumup</div>
                    <div class="tag">sumuasdp</div>
                    <div class="tag">sumup</div>
                    <div class="tag">sumsup</div>
                    <div class="tag">up</div>
                    <div class="tag">sumup</div>
                    <div class="tag">sumup</div>
                </div>
            </div>
            <div class="button-container">
                <button>FAQ erstellen</button>
            </div>
        </form>
    )
}