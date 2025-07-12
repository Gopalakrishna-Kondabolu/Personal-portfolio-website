// page‑transition.js
document.addEventListener("DOMContentLoaded", () => {
  /* fade‑in */
  document.body.classList.add("fade-in");
  requestAnimationFrame(() => document.body.classList.add("loaded"));

  /* fade‑out on internal links */
  document.querySelectorAll("a[href]").forEach(a => {
    const url = new URL(a.href, location.href);
    const sameSite   = url.origin === location.origin;
    const newTab     = a.target === "_blank" || a.hasAttribute("download");

    if (sameSite && !newTab && !a.href.includes("#")) {   // pure page links
      a.addEventListener("click", e => {
        e.preventDefault();
        document.body.classList.add("fade-out");
        setTimeout(() => location.href = a.href, 400);    // 400 ms = CSS time
      });
    }
  });
});
