import { A } from "@solidjs/router";
import "./navbar.css"
import { Show } from "solid-js";
import { authStore } from "~/stores/AuthStore";


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
                    <div class="user-icon hover">
                        <img src="/user.svg" alt="" />
                    </div>
                </div>
            </nav>
            </Show>
    );
}