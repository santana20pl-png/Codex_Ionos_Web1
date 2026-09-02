(() => {
  "use strict";

  const AUTO_LOOP_MS = 48000;
  const MANUAL_MOVE_MS = 520;

  function initCarousel(carousel) {
    if (carousel.__gssCarouselFix) {
      carousel.__gssCarouselFix.rebuild();
      return;
    }

    const track = carousel.querySelector("[data-carousel-track], .module-track");
    if (!track) return;

    let originals = [];
    let loopDistance = 0;
    let step = 0;
    let offset = 0;
    let lastTime = 0;
    let manual = null;

    const normalize = (value) => {
      if (!loopDistance) return 0;
      return ((value % loopDistance) + loopDistance) % loopDistance;
    };

    const paint = () => {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const measure = () => {
      const firstClone = track.querySelector(".module-clone");
      if (!firstClone || originals.length < 2) return;

      const newStep = originals[1].offsetLeft - originals[0].offsetLeft;
      const newLoopDistance = firstClone.offsetLeft - originals[0].offsetLeft;

      if (newStep > 0) step = newStep;
      if (newLoopDistance > 0) loopDistance = newLoopDistance;

      if (loopDistance > 0) {
        track.style.setProperty("--module-loop-distance", `${loopDistance}px`);
        offset = normalize(offset);
        paint();
      }
    };

    const rebuild = () => {
      track.querySelectorAll(".module-clone").forEach((clone) => clone.remove());

      originals = Array.from(track.children).filter(
        (element) =>
          element.classList &&
          element.classList.contains("module") &&
          !element.classList.contains("module-clone")
      );

      if (originals.length < 2) return;

      originals.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.classList.add("module-clone");
        clone.setAttribute("aria-hidden", "true");

        clone.querySelectorAll("a, button").forEach((control) => {
          control.tabIndex = -1;
        });

        track.appendChild(clone);
      });

      track.classList.remove("module-carousel-manual", "module-carousel-js-ready");
      track.style.setProperty("animation", "none", "important");
      track.style.setProperty("transition", "none", "important");
      track.style.setProperty("will-change", "transform");

      manual = null;
      offset = 0;

      requestAnimationFrame(() => {
        measure();
        paint();
      });
    };

    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const move = (direction) => {
      measure();

      if (!loopDistance || !step || manual) return;

      let from = normalize(offset);

      // Para 1 -> 8 usamos la copia equivalente del módulo 1,
      // evitando cualquier salto o espacio vacío.
      if (direction < 0 && from < step) {
        from += loopDistance;
        offset = from;
        paint();
      }

      manual = {
        from,
        to: from + direction * step,
        start: performance.now(),
        duration: MANUAL_MOVE_MS
      };
    };

    const tick = (time) => {
      if (!lastTime) lastTime = time;

      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      if (loopDistance > 0) {
        if (manual) {
          const progress = Math.min(
            (time - manual.start) / manual.duration,
            1
          );

          offset =
            manual.from +
            (manual.to - manual.from) * ease(progress);

          paint();

          if (progress >= 1) {
            offset = normalize(manual.to);
            manual = null;
            paint();
          }
        } else {
          offset += (loopDistance / AUTO_LOOP_MS) * delta;

          if (offset >= loopDistance) {
            offset %= loopDistance;
          }

          paint();
        }
      }

      requestAnimationFrame(tick);
    };

    const scope =
      carousel.closest(".training") ||
      carousel.closest(".container") ||
      document;

    scope.querySelectorAll("[data-carousel-control]").forEach((button) => {
      if (button.dataset.gssCarouselFixBound === "true") return;

      button.dataset.gssCarouselFixBound = "true";

      // Capture + stopImmediatePropagation impide que los controladores
      // antiguos del carrusel compitan con este controlador único.
      button.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();

          const direction =
            button.dataset.carouselControl === "prev" ? -1 : 1;

          move(direction);
        },
        true
      );
    });

    if ("ResizeObserver" in window) {
      new ResizeObserver(() => {
        const oldLoopDistance = loopDistance;
        const progress =
          oldLoopDistance > 0
            ? normalize(offset) / oldLoopDistance
            : 0;

        measure();

        if (loopDistance > 0 && !manual) {
          offset = progress * loopDistance;
          paint();
        }
      }).observe(carousel);
    } else {
      window.addEventListener("resize", () => {
        measure();
        if (!manual) {
          offset = normalize(offset);
          paint();
        }
      });
    }

    carousel.__gssCarouselFix = { rebuild };

    rebuild();
    requestAnimationFrame(tick);
  }

  function initAllCarousels() {
    document.querySelectorAll(".module-carousel").forEach(initCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllCarousels, {
      once: true
    });
  } else {
    initAllCarousels();
  }

  // Tras cambiar idioma, el script principal puede reconstruir el carrusel.
  // Volvemos a tomar el control en el frame siguiente.
  document.querySelectorAll(".lang").forEach((button) => {
    if (button.dataset.gssCarouselLanguageFixBound === "true") return;

    button.dataset.gssCarouselLanguageFixBound = "true";

    button.addEventListener(
      "click",
      () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(initAllCarousels);
        });
      },
      true
    );
  });
})();
