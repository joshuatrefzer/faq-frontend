import { useNavigate } from "@solidjs/router";
import "./dashboard.css"
import { authStore } from "~/stores/AuthStore";
import { createEffect, createMemo, Show } from "solid-js";
import Loader from "../loader/loader";
import { dataStore } from "~/stores/DataStore";
import FAQList from "~/components/faq-list/faq-list";

export default function Dashboard() {
    const navigate = useNavigate()

    createEffect(() => {
        if (!authStore.userIsLoggedIn()) {
            navigate("/admin/auth");
        }
    });

    const faqsWithoutTags = createMemo(() => {
        const faqWithoutTags = dataStore.state.faqs.filter(faq => faq.tags?.length === 0);
        return faqWithoutTags.length;
    });

    return (
        <Show when={!dataStore.state.loading} fallback={<Loader></Loader>}>
            <div class="admin-route-wrapper flex-col">
                <div class="dashboard-infos">
                    <div class="dashboard-card">
                        <div class="dashboard-number">{dataStore.state.faqs.length}</div>
                        <div class="dashboard-name">FAQ's im System</div>
                    </div>

                    <div class="dashboard-card">
                        <Show when={dataStore.state.questions.length > 0} fallback={<div class="dashboard-number">0</div>}>
                            <div class="dashboard-number bad-number">{dataStore.state.questions.length}</div>
                        </Show>
                        <div class="dashboard-name">Nicht beantwortete Fragen</div>
                    </div>

                    <div class="dashboard-card">
                        <Show when={faqsWithoutTags() == 0} fallback={<div class="dashboard-number bad-number">{faqsWithoutTags()}</div>}>
                            <div class="dashboard-number">{faqsWithoutTags()}</div>
                        </Show>
                        <div class="dashboard-name">FAQ's ohne Schlagwörter</div>
                    </div>
                </div>
                <div class="table-container" >
                    <FAQList></FAQList>
                </div>
            </div>
        </Show>

    );
}