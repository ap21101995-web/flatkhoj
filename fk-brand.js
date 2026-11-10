/* (2026-11-10, owner) Brand line "India's biggest platform for SHARED OCCUPANCIES" -- glittering, everywhere.
   One file, loaded in <head> of every public page:
   - a shining strip right under the page's top bar (every page)
   - a short splash when FlatKhoj opens (home pages only, once per tab session; tap to skip)
   - any element with class "fk-brand-badge" gets the glittering line (used in the FIY payment sheet)
   Build: B1 */
(function(){
  var TEXT_A = "India's biggest platform for", TEXT_B = "Shared Occupancies";
  var css = ""
  + ".fk-shine{font-weight:800;background:linear-gradient(100deg,#b8860b 0%,#ffd54a 18%,#fff6c8 26%,#ff4fa3 42%,#8b5cf6 58%,#ffd54a 74%,#fff6c8 82%,#b8860b 100%);"
  + "background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;"
  + "animation:fkShine 3.2s linear infinite;filter:drop-shadow(0 0 6px rgba(255,213,74,.55));white-space:nowrap}"
  + "@keyframes fkShine{0%{background-position:100% 0}100%{background-position:-150% 0}}"
  + ".fk-spark{position:absolute;pointer-events:none;color:#ffe680;font-size:11px;line-height:1;text-shadow:0 0 6px #fff,0 0 10px #ffd54a;animation:fkTwinkle 1.8s ease-in-out infinite;opacity:0}"
  + "@keyframes fkTwinkle{0%,100%{opacity:0;transform:scale(.4) rotate(0)}50%{opacity:1;transform:scale(1.15) rotate(25deg)}}"
  + "#fkBrandStrip{position:relative;overflow:hidden;text-align:center;padding:7px 12px;font:600 12.5px/1.35 'Plus Jakarta Sans',system-ui,sans-serif;"
  + "color:#f5f3ff;background:linear-gradient(90deg,#2e1065,#4c1d95 50%,#2e1065);letter-spacing:.2px}"
  + "#fkBrandStrip .fk-shine{font-size:14px;text-transform:uppercase;letter-spacing:.6px}"
  + ".fk-brand-badge{position:relative;overflow:hidden;text-align:center;margin:0 0 12px;padding:10px 12px;border-radius:12px;"
  + "font:600 12.5px/1.4 'Plus Jakarta Sans',system-ui,sans-serif;color:#f5f3ff;background:linear-gradient(120deg,#2e1065,#5b21b6 55%,#2e1065);box-shadow:0 4px 14px rgba(76,29,149,.35)}"
  + ".fk-brand-badge .fk-shine{display:block;font-size:17px;text-transform:uppercase;letter-spacing:.8px;margin-top:2px}"
  + "#fkSplash{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:24px;"
  + "background:radial-gradient(circle at 50% 40%,#5b21b6 0%,#2e1065 55%,#12052b 100%);transition:opacity .5s ease;cursor:pointer}"
  + "#fkSplash.out{opacity:0;pointer-events:none}"
  + "#fkSplash .box{position:relative;text-align:center;color:#ede9fe;font-family:'Plus Jakarta Sans',system-ui,sans-serif;max-width:520px}"
  + "#fkSplash .logo{font-size:34px;font-weight:800;color:#fff;letter-spacing:-.5px;margin-bottom:14px}#fkSplash .logo span{color:#ffd54a}"
  + "#fkSplash .l1{font-size:17px;font-weight:600;opacity:.92}"
  + "#fkSplash .fk-shine{display:block;font-size:clamp(30px,9vw,50px);line-height:1.1;margin-top:8px;text-transform:uppercase;letter-spacing:1px;white-space:normal}"
  + "#fkSplash .skip{margin-top:22px;font-size:11.5px;opacity:.55}"
  + "#fkSplash .fk-spark{font-size:20px}"
  + "@media (prefers-reduced-motion: reduce){.fk-shine{animation:none;background-position:30% 0}.fk-spark{animation:none;opacity:.8}}";
  var st = document.createElement("style"); st.id = "fkBrandCss"; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  function sparkles(el, n){
    for (var i = 0; i < n; i++){
      var s = document.createElement("span"); s.className = "fk-spark"; s.textContent = i % 3 ? "✦" : "✧";
      s.style.left = (4 + Math.random() * 92) + "%"; s.style.top = (8 + Math.random() * 78) + "%";
      s.style.animationDelay = (Math.random() * 1.8).toFixed(2) + "s"; s.style.animationDuration = (1.4 + Math.random() * 1.2).toFixed(2) + "s";
      el.appendChild(s);
    }
  }
  function line(){ return TEXT_A + ' <span class="fk-shine">' + TEXT_B + "</span>"; }
  window.fkBrandLine = line;

  function fillBadges(root){
    (root || document).querySelectorAll(".fk-brand-badge:not([data-fk])").forEach(function(b){
      b.setAttribute("data-fk", "1"); b.innerHTML = '<span>✨ ' + TEXT_A + ' ✨</span><span class="fk-shine">' + TEXT_B + "</span>"; sparkles(b, 7);
    });
  }
  window.fkBrandBadges = fillBadges;

  function strip(){
    if (document.getElementById("fkBrandStrip") || document.documentElement.hasAttribute("data-no-brand")) return;
    var bar = document.querySelector(".topbar"); if (!bar) return;
    var d = document.createElement("div"); d.id = "fkBrandStrip"; d.setAttribute("role", "note");
    d.innerHTML = "✨ " + line() + " ✨"; sparkles(d, 6);
    // a sticky top bar keeps the strip directly under it; otherwise it simply follows the bar
    bar.parentNode.insertBefore(d, bar.nextSibling);
  }

  function splash(){
    var p = location.pathname.replace(/\/+$/, "/");
    var home = /\/$|\/index\.html$|\/fiy(\.html)?$|\/main(\.html)?$/.test(p);
    if (!home) return;
    var q = new URLSearchParams(location.search);
    // no splash when returning from payment / login, or deep-linked to unlock a contact
    if (q.has("fiy_order") || q.has("order_id") || q.has("unlock") || q.has("admin_signin") || q.has("posted")) return;
    try { if (sessionStorage.getItem("fk_splash_seen")) return; sessionStorage.setItem("fk_splash_seen", "1"); } catch (e) {}
    var s = document.createElement("div"); s.id = "fkSplash"; s.setAttribute("role", "dialog"); s.setAttribute("aria-label", "FlatKhoj");
    s.innerHTML = '<div class="box"><div class="logo">Flat<span>Khoj</span>.com</div><div class="l1">✨ ' + TEXT_A + ' ✨</div>'
      + '<span class="fk-shine">' + TEXT_B + '</span><div class="skip">Tap anywhere to continue</div></div>';
    sparkles(s.querySelector(".box"), 14);
    document.body.appendChild(s);
    var gone = false;
    function close(){ if (gone) return; gone = true; s.classList.add("out"); setTimeout(function(){ s.remove(); }, 550); }
    s.addEventListener("click", close); setTimeout(close, 2600);
  }

  function init(){ strip(); fillBadges(); splash(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
