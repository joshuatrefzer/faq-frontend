import { createSignal, Show } from "solid-js";
import "./tag-select.css";

export default function TagSelect(props: { onSelect: (tag: { id: number, tagname: string }) => void }) {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [showDropdown, setShowDropdown] = createSignal(false);

  function filterFunction(event: any) {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setShowDropdown(value.length > 0);
  }

  const items = [
    { id: 1, tagname: "About" },
    { id: 2, tagname: "Base" },
    { id: 3, tagname: "Blog" },
    { id: 4, tagname: "Contact" },
    { id: 5, tagname: "Custom" },
    { id: 6, tagname: "Support" },
    { id: 7, tagname: "Tools" },
    { id: 7, tagname: "Tools" },
    { id: 7, tagname: "Tools" },
    { id: 7, tagname: "Tools" },
    { id: 7, tagname: "Tools" },
    { id: 7, tagname: "Tools" },
    { id: 7, tagname: "Tools" },
    { id: 7, tagname: "Tools" },
  ];

  const filteredItems = () =>
    items.filter((item) => item.tagname.toLowerCase().includes(searchTerm()));

  return (
    <div class="tag-select-container">
      <input
        type="text"
        placeholder="Search.."
        id="myInput"
        onKeyUp={filterFunction}
      />
      
      <Show when={showDropdown()}>
        <div id="myDropdown" class="dropdown-content">
          {filteredItems().length > 0 ? (
            filteredItems().map((item) => (
              <div 
                class="dropdown-item" 
                onClick={() => props.onSelect(item)} 
              >
                {item.tagname}
              </div>
            ))
          ) : (
            <button type="button" class="add-tag-button">
              "{searchTerm()}" als neues Schlagwort
            </button>
          )}
        </div>
      </Show>
    </div>
  );
}
