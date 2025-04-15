import { Route, Router } from "@solidjs/router";
import Home from "./components/home/Home"
import Routes from "./routes";
import FAQ from "./components/faq/faq";
import Admin from "./components/admin/admin";
import Dashboard from "./components/dashboard/dashboard";
import AddFAQ from "./components/add-faq/add-faq";
import FAQAdmin from "./components/faq-admin/faq-admin";
import Questions from "./components/questions/questions";
import Authentication from "./components/auth/auth";

export default function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/faq/:id" component={FAQ} />
      <Route path="/admin" component={Admin}>
        <Route path="/faqs" component={AddFAQ} />
        <Route path="questions" component={Questions} />
        <Route path="/auth" component={Authentication} />
        <Route path="/" component={Dashboard} />
      </Route>

    </Router>
  );
}
