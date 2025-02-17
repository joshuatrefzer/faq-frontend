import { A, Route, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import Counter from "./components/Counter";
import Home from "./components/home/Home"
import Routes from "./routes";
import FAQ from "./components/faq/faq";
import Admin from "./components/admin/admin";

export default function App() {
  return (
    <Router>
        <Route path="/" component={Home} />
        <Route path="/faq/:id" component={FAQ} /> 
        <Route path="/admin" component={Admin} /> 
    </Router>
  );
}
