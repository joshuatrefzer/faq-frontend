import { useNavigate } from "@solidjs/router";
import "./dashboard.css"
import { authStore } from "~/stores/AuthStore";
import { createEffect, Show } from "solid-js";
import Loader from "../loader/loader";
import { dataStore } from "~/stores/DataStore";

export default function Dashboard() {
    const navigate = useNavigate()

    createEffect(() => {
        if (!authStore.userIsLoggedIn()) {
            navigate("/admin/auth");
        }
    });

    return (
        <Show when={!dataStore.state.loading} fallback={<Loader></Loader>}>
            <div class="admin-route-wrapper">
            <h1>Dashboard</h1>
           </div>
                <h1>Dashboard</h1>
            </Show>
        
    );
}