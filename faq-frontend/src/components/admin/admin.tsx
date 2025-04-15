import NavBar from "../admin-navbar/navbar";
import { RouteSectionProps } from "@solidjs/router";
import "./admin.css"

export default function Admin(props: RouteSectionProps) {
  return (
    <div class="admin-container">
       <NavBar />
      <div class="admin-content">
        {props.children}
      </div> 
    </div>
  );
}
