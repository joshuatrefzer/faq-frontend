import { createSignal } from "solid-js";

type ToastType = "success" | "error" | "info";

const [toastMessage, setToastMessage] = createSignal<string | null>(null);
const [toastType, setToastType] = createSignal<ToastType>("info");
const [showToast, setShowToast] = createSignal(false);

function triggerToast(message: string, type: ToastType = "info") {
    console.log("Toast Triggered:", message, type);
  setToastMessage(message);
  setToastType(type);
  setShowToast(true);
  setTimeout(() => setShowToast(false), 4000);
}

export const toastService = {
  toastMessage,
  toastType,
  showToast,
  triggerToast,
};
