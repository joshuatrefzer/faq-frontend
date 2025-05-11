import { A } from "@solidjs/router";
import "./back-button.css"


export default function BackButton() {
    return (
        <div class="back-button-container">
            <A class="back-button" href="/">
                <img src="../../back.svg" />
            </A>
        </div>
    );
}