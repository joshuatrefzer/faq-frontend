import { createSignal, Show } from "solid-js";
import "./tag-select.css";
import { dataStore, Tag } from "~/stores/DataStore";

export default function TagSelect(props: { onSelect: (tagName: string) => void }) {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [showDropdown, setShowDropdown] = createSignal(false);

  function filterFunction(event: any) {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setShowDropdown(value.length > 0);
  }

  function createNewTag(name: string) {
    const current = dataStore.selectedTagNames();
    if (!current.includes(name)) {
      dataStore.setSelectedTagNames([...current, name]);
    }

    dataStore.createNewTag(name);
    setShowDropdown(false);
  }


  const filteredTags = () =>
    dataStore.tagNamesWithoutSelectedOnes().filter((name) => name.toLowerCase().includes(searchTerm()));

  return (
    <div class="tag-select-container">
      <input
        type="text"
        placeholder="Gebe Schlagwörter ein"
        id="myInput"
        onKeyUp={filterFunction}
      />

      <Show when={showDropdown()}>
        <div id="myDropdown" class="dropdown-content">
          {filteredTags().length > 0 ? (
            filteredTags().map((tagName) => (
              <div
                class="dropdown-item"
                onClick={ () => {
                    props.onSelect(tagName);
                    setShowDropdown(false);
                  }
                }
              >
                {tagName}
              </div>
            ))
          ) : (
            <button onClick={() => createNewTag(searchTerm())} type="button" class="add-tag-button">
              "{searchTerm()}" als neues Schlagwort
            </button>
          )}
        </div>
      </Show>
    </div>
  );
}
