import { Show } from "solid-js";
import { toastService } from "~/services/toastService";
import "./toast.css";

export default function Toast() {
  return (
    <Show when={toastService.showToast()}>
      <div class={`toast ${toastService.toastType()}`}>
        {toastService.toastMessage()}
      </div>
    </Show>
  );
}
