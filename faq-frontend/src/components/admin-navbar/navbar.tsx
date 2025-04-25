import { A } from "@solidjs/router";
import "./navbar.css"
import { Show } from "solid-js";
import { authStore } from "~/stores/AuthStore";
import { dataStore } from "~/stores/DataStore";


export default function NavBar() {
    return (
        <Show when={authStore.userIsLoggedIn()} fallback={<div></div>}>
            <nav>
                <div class="left">
                    <A class="hover" href="/admin/">Dashboard</A>
                    <A class="hover" href="/admin/faqs">FAQ's</A>
                    <A class="hover" href="/admin/questions">Anfragen</A>
                </div>
                <div class="right">
                <img onclick={() => dataStore.loadAllData() } class="reload" src="/reload.png" alt="" />
                </div>
            </nav>
            </Show>
    );
}