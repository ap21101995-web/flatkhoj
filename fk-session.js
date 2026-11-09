/* FlatKhoj -- the owner's test number 1111111111 stays logged in ONLY in the current tab (2026-11-09, owner).
   Every page keeps the login in localStorage "fmh_user". For the test number this file quietly keeps it in
   sessionStorage "fmh_user_test" instead (the same key find-it-yourself uses), so closing the tab logs it out and the
   next login is a brand-new user again (the server wipes the test account on every login).
   Load this FIRST in <head>, before any other script. Real users are not affected in any way. */
(function () {
  try {
    var S = Storage.prototype, get = S.getItem, set = S.setItem, del = S.removeItem;
    var KEY = "fmh_user", TKEY = "fmh_user_test", TEST = "1111111111";
    var isTest = function (v) {
      try { var u = JSON.parse(v); return !!u && String(u.phone || "").replace(/\D/g, "").slice(-10) === TEST; }
      catch (e) { return false; }
    };
    S.getItem = function (k) {
      if (this === window.localStorage && k === KEY) {
        var t = get.call(window.sessionStorage, TKEY);
        if (t) return t;
      }
      return get.call(this, k);
    };
    S.setItem = function (k, v) {
      if (this === window.localStorage && k === KEY) {
        if (isTest(v)) { set.call(window.sessionStorage, TKEY, v); return; }
        del.call(window.sessionStorage, TKEY);          // a real login replaces a test one in this tab
      }
      return set.call(this, k, v);
    };
    S.removeItem = function (k) {
      if (this === window.localStorage && k === KEY && get.call(window.sessionStorage, TKEY)) {
        del.call(window.sessionStorage, TKEY); return;  // logging out of the test account leaves the real one alone
      }
      return del.call(this, k);
    };
  } catch (e) { /* storage blocked: pages behave as before */ }
})();
