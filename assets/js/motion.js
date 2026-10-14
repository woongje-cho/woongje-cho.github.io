// Scroll motion layer (GSAP + ScrollTrigger + Lenis). The page is fully readable without it.
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("motion");

  // Smooth scrolling, wired into ScrollTrigger.
  var lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length > 1 && document.querySelector(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -70 }); }
      });
    });
  }

  var mm = gsap.matchMedia();

  // 0. Intro: F1 start lights (or assets/video/intro.mp4 if present), once per visit.
  function playHero() {
    gsap.from(".hero h1", { y: 60, opacity: 0, duration: 0.9, ease: "back.out(1.6)" });
    gsap.from(".hero .hello, .hero .lead, .hero .actions", { y: 24, opacity: 0, duration: 0.7, stagger: 0.08, delay: 0.25 });
    gsap.from(".plate", { y: 80, rotate: 18, opacity: 0, duration: 1, ease: "back.out(1.4)", delay: 0.2 });
    gsap.from(".sticker", { scale: 0, rotate: -40, duration: 0.6, stagger: 0.12, delay: 0.7, ease: "back.out(2.2)" });
  }
  var intro = document.querySelector(".intro");
  var seen = false;
  try { seen = sessionStorage.getItem("introSeen") === "1"; } catch (e) {}
  if (!intro || seen) {
    if (intro) intro.remove();
    playHero();
  } else {
    intro.hidden = false;
    if (lenis) lenis.stop();
    var done = false;
    var cleanup = function () {
      try { sessionStorage.setItem("introSeen", "1"); } catch (e) {}
      intro.remove();
      if (lenis) lenis.start();
    };
    // Skip / fallback exit: slide the curtain up.
    var finish = function () {
      if (done) return; done = true;
      gsap.to(intro, { yPercent: -100, duration: 0.6, ease: "power4.inOut", onComplete: cleanup });
      playHero();
    };
    var toast = function (msg, good) {
      var t = document.createElement("div");
      t.className = "react-toast " + (good ? "good" : "bad");
      t.textContent = msg;
      document.body.appendChild(t);
      gsap.fromTo(t, { y: 80, rotate: -8, opacity: 0 }, { y: 0, rotate: -3, opacity: 1, duration: 0.5, ease: "back.out(2)" });
      gsap.to(t, { y: 80, opacity: 0, duration: 0.4, delay: 3.2, onComplete: function () { t.remove(); } });
    };
    // Lights out: the car launches left to right and the page is revealed behind it.
    var carPass = function () {
      if (done) return; done = true;
      var car = intro.querySelector(".f1car");
      var streaks = intro.querySelector(".streaks");
      var tl = gsap.timeline({ onComplete: cleanup });
      tl.set(car, { xPercent: 0, x: function () { return -car.offsetWidth - 40; } })
        .set(streaks, { opacity: 1 })
        .to(intro.querySelector(".intro-inner"), { x: 18, duration: 0.05, repeat: 5, yoyo: true, ease: "none" }, 0)
        .to(car, { x: function () { return window.innerWidth + 60; }, duration: 0.85, ease: "power3.in" }, 0.05)
        .to(car.querySelectorAll(".spin"), { rotation: 1440, transformOrigin: "50% 50%", duration: 0.85, ease: "power3.in" }, 0.05)
        .fromTo(streaks.children, { scaleX: 0, x: 0 }, { scaleX: 1, x: function () { return window.innerWidth * 0.6; }, duration: 0.7, stagger: 0.04, ease: "power3.in" }, 0.15)
        .to(intro, { clipPath: "inset(0 0 0 100%)", duration: 0.55, ease: "power3.in" }, 0.45)
        .call(playHero, null, 0.6);
    };
    intro.querySelector(".skip").addEventListener("click", finish);
    var vid = intro.querySelector("video");
    // F1 start: one column of red pairs per second, a random hold, then all out at once.
    var runLights = function () {
      var cols = intro.querySelectorAll(".gantry .col");
      var outAt = 0, armed = true;
      intro.addEventListener("pointerdown", function (e) {
        if (e.target.closest(".skip") || !armed) return;
        armed = false;
        if (!outAt) {
          toast("Jump start! 10-second stop-go penalty 😅", false);
        } else {
          var sec = (performance.now() - outAt) / 1000;
          var verdict = sec < 0.2 ? "F1 driver level! 🏎️💨"
            : sec < 0.3 ? "Pit crew material 🔧"
            : sec < 0.45 ? "Sunday driver 🚗"
            : "Turtle mode 🐢 Try again?";
          toast("Reaction " + sec.toFixed(3) + "s · " + verdict, sec < 0.45);
        }
      });
      var tl = gsap.timeline();
      tl.from(".intro .brand-mark", { scale: 0.6, opacity: 0, duration: 0.4, ease: "back.out(2)" })
        .from(".intro .gantry", { y: -80, opacity: 0, duration: 0.5, ease: "back.out(1.6)" }, "<")
        .from(".intro .reflex", { scale: 0, rotate: -20, duration: 0.5, ease: "back.out(2.5)" }, 0.35);
      cols.forEach(function (c, i) { tl.call(function () { c.classList.add("on"); }, null, 0.9 + i * 1.0); });
      var hold = 0.2 + Math.random() * 1.3;
      tl.call(function () {
        cols.forEach(function (c) { c.classList.remove("on"); });
        outAt = performance.now();
        carPass();
      }, null, 0.9 + 4 * 1.0 + 1.0 + hold);
    };
    if (vid) {
      vid.addEventListener("ended", finish);
      vid.addEventListener("error", function () { vid.remove(); runLights(); });
      vid.play().catch(function () { vid.remove(); runLights(); });
    } else {
      runLights();
    }
  }

  // 1. Hero: headline shrinks away, stickers scatter at different speeds.

  mm.add("(min-width: 961px)", function () {
    var tl = gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 } });
    tl.to(".hero h1", { scale: 0.82, y: -40, transformOrigin: "left top", ease: "none" }, 0)
      .to(".plate", { y: -120, rotate: -6, ease: "none" }, 0)
      .to(".st-neurips", { x: -140, y: -160, rotate: -40, ease: "none" }, 0)
      .to(".st-yax", { x: 160, y: -60, rotate: 90, ease: "none" }, 0)
      .to(".st-jsa", { x: -80, y: 120, rotate: 20, ease: "none" }, 0)
      .to(".st-star", { x: 120, y: -200, rotate: 360, ease: "none" }, 0);
  });

  // 2. Tape: speed follows scroll velocity.
  var tape = document.querySelector(".tape-track");
  if (tape) {
    var tween = gsap.to(tape, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
    tape.style.animation = "none";
    ScrollTrigger.create({
      onUpdate: function (self) {
        var v = Math.min(6, 1 + Math.abs(self.getVelocity()) / 400);
        gsap.to(tween, { timeScale: v * (self.direction < 0 ? -1 : 1), duration: 0.3, overwrite: true });
        gsap.to(tween, { timeScale: 1, duration: 1.2, delay: 0.3 });
      }
    });
  }

  // 3. Section titles rise in.
  gsap.utils.toArray(".sec-head h2").forEach(function (h) {
    gsap.from(h, { yPercent: 60, opacity: 0, rotate: -3, duration: 0.8, ease: "back.out(1.7)", scrollTrigger: { trigger: h, start: "top 85%" } });
  });

  // 4. Stats drop in, numbers count up.
  gsap.from(".stat", { y: -80, rotate: function (i) { return [-14, 10, -8, 12][i % 4]; }, opacity: 0, duration: 0.8, stagger: 0.12, ease: "bounce.out", scrollTrigger: { trigger: ".stats", start: "top 80%" } });
  document.querySelectorAll(".stat .v").forEach(function (el) {
    var txt = el.textContent.trim();
    var m = txt.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!m) return;
    var end = parseFloat(m[1]), rest = m[2], dec = (m[1].split(".")[1] || "").length, obj = { n: 0 };
    ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: function () {
      gsap.to(obj, { n: end, duration: 1.4, ease: "power2.out", onUpdate: function () { el.textContent = obj.n.toFixed(dec) + rest; } });
    } });
  });

  // 5. Race car drives along the laps.
  var laps = document.querySelector(".laps");
  if (laps) {
    mm.add("(min-width: 961px)", function () {
      var car = document.createElement("span");
      car.className = "race-car"; car.setAttribute("aria-hidden", "true"); car.textContent = "🏎️";
      laps.appendChild(car);
      var fill = document.createElement("span");
      fill.className = "lap-fill"; laps.appendChild(fill);
      var tl = gsap.timeline({ scrollTrigger: { trigger: laps, start: "top 75%", end: "bottom 35%", scrub: 0.5 } });
      tl.fromTo(car, { left: "0%" }, { left: "calc(100% - 40px)", ease: "none" }, 0)
        .fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      gsap.utils.toArray(".laps li").forEach(function (li, i, all) {
        tl.fromTo(li, { opacity: 0.25, y: 12 }, { opacity: 1, y: 0, duration: 0.15 }, i / all.length);
      });
      return function () { car.remove(); fill.remove(); };
    });
  }

  // 6. Research cards slide in from opposite sides.
  gsap.utils.toArray(".paper").forEach(function (p, i) {
    gsap.from(p, { x: i % 2 ? 120 : -120, rotate: i % 2 ? 4 : -4, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: p, start: "top 85%" } });
  });

  // 7. Projects: pinned horizontal gallery on desktop.
  mm.add("(min-width: 961px)", function () {
    var section = document.querySelector("#projects");
    var board = document.querySelector(".board");
    if (!section || !board) return;
    board.classList.add("is-h");
    var distance = function () { return board.scrollWidth - board.parentElement.clientWidth; };
    var tween = gsap.to(board, {
      x: function () { return -distance(); }, ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: function () { return "+=" + distance(); }, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 }
    });
    gsap.utils.toArray(".board .polaroid").forEach(function (card) {
      gsap.from(card, { rotate: gsap.utils.random(-10, 10), y: 60, opacity: 0.3, ease: "none",
        scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true } });
    });
    return function () { board.classList.remove("is-h"); gsap.set(board, { clearProps: "x" }); };
  });
  mm.add("(max-width: 960px)", function () {
    gsap.utils.toArray(".board .polaroid").forEach(function (card) {
      gsap.from(card, { y: 60, opacity: 0, duration: 0.7, scrollTrigger: { trigger: card, start: "top 90%" } });
    });
  });

  // 7b. Results tower: rows slide in like live timing.
  gsap.from(".tower li", { x: -60, opacity: 0, duration: 0.5, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: ".tower", start: "top 80%" } });

  // 8. Leadership badges flip in; skills pop.
  gsap.from(".badge-card", { rotateY: 80, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out", transformPerspective: 900, scrollTrigger: { trigger: ".badges", start: "top 80%" } });
  gsap.from(".skills li", { scale: 0, duration: 0.45, stagger: 0.05, ease: "back.out(2.5)", scrollTrigger: { trigger: ".skills", start: "top 90%" } });

  // 9. Contact: star spins with scroll, title punches in.
  gsap.to(".big-star", { rotate: 200, ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.from(".contact h2", { scale: 0.6, opacity: 0, duration: 0.8, ease: "back.out(2)", scrollTrigger: { trigger: ".contact", start: "top 70%" } });

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
