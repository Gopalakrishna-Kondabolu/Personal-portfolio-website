/* ---------- HERO TYPEWRITER (robust) ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("typewriter");
  if (el) initTypewriter(el);

  fadeInAbout();
  highlightNavOnScroll();
  initStaticNavHighlight();
  initFooterYear();
  initContactForm();
  initHamburger();                 
});

function initTypewriter(el){
  let words = [];
  if (el.dataset.words) {
    try { words = JSON.parse(el.dataset.words); } catch {  }
  }
  if (!words.length && el.dataset.word) words = [el.dataset.word];
  if (!words.length) words = ["Web Developer"];

  const delay = parseInt(el.dataset.delay, 10) || 140;
  let w = 0, i = 0, typing = true;

  (function tick(){
    const txt = words[w];
    el.textContent = typing ? txt.slice(0, ++i) : txt.slice(0, --i);
    if (typing  && i === txt.length) { typing = false; setTimeout(tick, 1400); return; }
    if (!typing && i === 0) { typing = true; w = (w + 1) % words.length; }
    setTimeout(tick, typing ? delay : 60);
  })();
}

function fadeInAbout(){
  const about = document.querySelector(".about");
  if (!about) return;
  const rect = about.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) about.classList.add("visible");
}

function highlightNavOnScroll(){
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + 200;
    let currentId = "";
    sections.forEach(s=>{
      if (scrollY >= s.offsetTop && scrollY <= s.offsetTop + s.offsetHeight)
        currentId = s.id;
    });
    links.forEach(l=>{
      l.classList.toggle("active", currentId && l.getAttribute("href").includes(currentId));
    });
  });
}

function initStaticNavHighlight(){
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(l=>{
    if (l.getAttribute("href").replace("./","") === page) l.classList.add("active");
  });
}

/* === footer year === */
function initFooterYear(){
  const y=document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

/* === contact form (Formspree) === */
function initContactForm(){
  const form=document.getElementById("contactForm");
  const ok  = document.getElementById("successMsg");
  if (!form || !ok) return;
  form.addEventListener("submit", async e=>{
    e.preventDefault();
    try{
      await fetch(form.action,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});
      form.hidden = true; ok.hidden = false;
    }catch{ alert("Oops—something went wrong. Please try again later."); }
  });
}

/* === HAMBURGER MENU === */
function initHamburger() {
  const burger = document.getElementById("burgerBtn") || document.getElementById("burger");
  const nav = document.querySelector(".nav-links");
  if (!burger || !nav) return;

  burger.classList.remove("open");
  nav.classList.remove("show");

  let isReady = false;

  const toggle = (open) => {
    if (!isReady) {
      nav.classList.add("ready");  
    }
    burger.classList.toggle("open", open);
    nav.classList.toggle("show", open);
  };

  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle(!burger.classList.contains("open"));
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) toggle(false);
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => toggle(false));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.scroll-down, .scroll-up')
          .forEach(el => el.setAttribute('tabindex','-1'));
});
(function () {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search);
  }
  window.scrollTo(0, 0);
})();