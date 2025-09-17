import { Show, createEffect, createSignal } from "solid-js";
import "./auth.css";
import { authStore } from "~/stores/AuthStore";
import { useNavigate } from "@solidjs/router";


export default function Authentication() {
    const navigate = useNavigate();

    const [login, setLogin] = createSignal(true);
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");
    const { login: loginUser, state, signUp: signUpUser } = authStore;

    const handleLogin = async (e: Event) => {
        e.preventDefault();
        await loginUser(username(), password());
    };

    const handleSignUp = async (e: Event) => {
        e.preventDefault();
        await signUpUser(username(), password())
    };

    createEffect(() => {
        if (authStore.state.success) {
          navigate("/admin/");
        }
    });



    return (
        <Show
            when={login()}
            fallback={
                <div class="admin-route-wrapper full-screen">
                    <div class="display-center">
                        <form class="card" onSubmit={handleSignUp}>
                            <h2>SIGNUP</h2>
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
                            <p onClick={() => setLogin(true)} class="hover">Zum Login</p>
                            <button>Signup</button>
                            <Show when={state.loading}><p>⏳ Registrierung läuft...</p></Show>
                            <Show when={state.success}><p style={{ color: "green" }}>✅ Registrierung erfolgreich</p></Show>
                            <Show when={state.error}><p style={{ color: "red" }}>{state.error}</p></Show>
                        </form>
                    </div>
                </div>
            }
        >
            <div class="admin-route-wrapper full-screen">
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
                        <Show when={state.error}><p style={{ color: "red" }}>{state.error}</p></Show>
                    </form>
                </div>
            </div>
        </Show>
    );
}
