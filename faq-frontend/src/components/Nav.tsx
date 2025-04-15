import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent ";
  return (
    <nav>
      <ul class="container flex items-center p-3 text-gray-200">
        <li class={`selected-link ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/admin/dashboard">Home</a>
        </li>
        <li class={`selected-link ${active("/add-faq")} mx-1.5 sm:mx-6`}>
          <a href="/about">Admin</a>
        </li>
      </ul>
    </nav>
  );
}
