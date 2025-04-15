import { createStore } from "solid-js/store";

const [state, setState] = createStore({
    token: null as string | null,
    loading: false,
    error: null as string | null,
    success: false
});

async function login(username: string, password: string) {
    setState({ loading: true, error: null, success: false });
    try {
        const res = await fetch("http://joshuatrefzer-backend.com:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (data.success && data.token) {
            setState({
                token: data.token,
                success: true
            });
            localStorage.setItem("token", data.token);
        } else {
            throw new Error("Login fehlgeschlagen");
        }
    } catch (err) {
        setState({ error: (err as Error).message });
    } finally {
        setState({ loading: false });
    }
}

function logout() {
    setState({ token: null, success: false });
    localStorage.removeItem("token");
}

function getToken() {
    return state.token || localStorage.getItem("token");
}

export const authStore = {
    state,
    login,
    logout,
    getToken
};
