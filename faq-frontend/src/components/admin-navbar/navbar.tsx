import { A } from "@solidjs/router";
import "./navbar.css"


export default function NavBar() {
    return (
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
    );
}