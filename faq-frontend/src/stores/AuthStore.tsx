import { createStore } from "solid-js/store";
import { dataStore } from "./DataStore";

const apiUrl = import.meta.env.VITE_API_URL;


const [state, setState] = createStore({
    token: null as string | null,
    loading: false,
    error: null as string | null,
    success: false
});


async function signUp(username: string, password: string) {
    setState({ loading: true, error: null, success: false });
    try {
        const res = await fetch(apiUrl + '/auth/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (data.success) {
            setState({ success: true });
        } else {
            throw new Error("Signup fehlgeschlagen");
        }
    } catch (err) {
        setState({ error: (err as Error).message });
    } finally {
        setState({ loading: false });
    }
}

async function login(username: string, password: string) {
    setState({ loading: true, error: null, success: false });
    try {
        const res = await fetch( apiUrl + '/auth/login', {
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

            await dataStore.loadAllData();

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
    dataStore.reset();
}

function getToken() {
    return state.token;
}

function userIsLoggedIn(): boolean {
    return !!getToken();
}

export const authStore = {
    state,
    login,
    logout,
    signUp,
    getToken,
    userIsLoggedIn
};
