import { Show, createSignal } from "solid-js";
import "./auth.css";
import { authStore } from "~/stores/AuthStore";

export default function Authentication() {
    const [login, setLogin] = createSignal(true);
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");
    const { login: loginUser, state } = authStore;

    const handleLogin = async (e: Event) => {
        e.preventDefault();
        await loginUser(username(), password());
    };

    return (
        <Show
            when={login()}
            fallback={
                <div class="admin-route-wrapper">
                    <div class="display-center">
                        <form class="card">
                            <h2>SIGNUP</h2>
                            <input required placeholder="Benutzername" type="text" />
                            <input required placeholder="Passwort" type="password" />
                            <p onClick={() => setLogin(true)} class="hover">Zum Login</p>
                            <button>Signup</button>
                        </form>
                    </div>
                </div>
            }
        >
            <div class="admin-route-wrapper">
                <div class="display-center">
                    <form class="card" onSubmit={handleLogin}>
                        <h2>LOGIN</h2>
                        <input
                            required
                            placeholder="Benutzername"
                            type="text"
                            value={username()}
                            onInput={(e) => setUsername(e.currentTarget.value)}
                        />
                        <input
                            required
                            placeholder="Passwort"
                            type="password"
                            value={password()}
                            onInput={(e) => setPassword(e.currentTarget.value)}
                        />
                        <p onClick={() => setLogin(false)} class="hover">Account erstellen</p>
                        <button type="submit">Login</button>

                        <Show when={state.loading}><p>⏳ Login läuft...</p></Show>
                        <Show when={state.success}><p style={{ color: "green" }}>✅ Login erfolgreich</p></Show>
                        <Show when={state.error}><p style={{ color: "red" }}>{state.error}</p></Show>
                    </form>
                </div>
            </div>
        </Show>
    );
}
