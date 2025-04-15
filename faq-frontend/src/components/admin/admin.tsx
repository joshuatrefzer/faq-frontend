import NavBar from "../admin-navbar/navbar";
import { RouteSectionProps } from "@solidjs/router";
import "./admin.css"
import { Show } from "solid-js";
import { authStore } from "~/stores/AuthStore";

export default function Admin(props: RouteSectionProps) {
  return (
    <div class="admin-container">
      <Show when={authStore.userIsLoggedIn}>
       <NavBar />
       </Show>
      <div class="admin-content">
        {props.children}
      </div> 
    </div>
  );
}
