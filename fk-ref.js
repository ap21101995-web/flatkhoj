/* FlatKhoj promoters (2026-11-10, owner). A promoter's personal link is flatkhoj.com/?r=<code> (any page, any extra params).
   The FIRST promoter code a browser sees is kept for 30 days (a later promoter's link does not take it over); the login
   pages send it with the OTP verify call, and the server attaches it only to a brand-new account.
   Each tab that opens a promoter link counts one visit (display only). Nothing is shown to the user. */
(function () {
  var KEY = "fk_ref", DAYS30 = 30 * 864e5;
  window.fkRef = function () {
    try { var o = JSON.parse(localStorage.getItem(KEY)); return o && o.c && Date.now() - o.t < DAYS30 ? o.c : ""; }
    catch (e) { return ""; }
  };
  try {
    var c = (new URLSearchParams(location.search).get("r") || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20);
    if (c.length < 3) return;
    if (!window.fkRef()) localStorage.setItem(KEY, JSON.stringify({ c: c, t: Date.now() }));
    if (sessionStorage.getItem("fk_ref_seen_" + c)) return;
    sessionStorage.setItem("fk_ref_seen_" + c, "1");
    fetch("https://hbvdboxyppsmcuqgbpwp.supabase.co/rest/v1/rpc/promoter_visit", {
      method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json", apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhidmRib3h5cHBzbWN1cWdicHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNTIxMzUsImV4cCI6MjA4OTcyODEzNX0.h0qTsmhwSUBREHfHUx-Wxdkk12Tg58qnVwwkb-AHui4", Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhidmRib3h5cHBzbWN1cWdicHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNTIxMzUsImV4cCI6MjA4OTcyODEzNX0.h0qTsmhwSUBREHfHUx-Wxdkk12Tg58qnVwwkb-AHui4" },
      body: JSON.stringify({ p_code: c })
    }).catch(function () {});
  } catch (e) { /* storage blocked: the visit simply isn't credited */ }
})();
