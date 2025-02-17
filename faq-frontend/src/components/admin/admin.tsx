import TagSelect from "../tag-select/tag-select";
import "./admin.css"

export default function Admin() {
    return (
        <div class="admin-container">
            <div class="headline">
                <h1><b>FAQ</b> - Admin</h1>
            </div>
            <form class="grid-container">
                <div class="left-container">
                        <input required placeholder="Welche Frage soll beantwortet werden?" type="text" />
                        <input placeholder="Stelle hier den Link zu einem Video bereit, wenn vorhanden." type="text" />
                        <TagSelect onSelect={(tag) => console.log("Ausgewähltes Tag:", tag)}></TagSelect>
                </div>
                <div class="right-container">
                    <textarea required placeholder="Beschreibung der Lösung"></textarea>
                    <div class="button-container">
                        <button>FAQ erstellen</button>
                    </div>
                </div>
            </form>


        </div>
    );
}