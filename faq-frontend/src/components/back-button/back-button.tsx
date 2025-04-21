import { A } from "@solidjs/router";
import "./back-button.css"


export default function BackButton() {
    return(
        <A class="back-button" href="/">
            <img src="../../back.svg" />
        </A>
    );
}