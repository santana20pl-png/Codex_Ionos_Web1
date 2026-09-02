(() => {
  const palette = [198, 214, 231, 252, 276, 302, 328, 168];
  const moduleNumber = element => {
    const link = element.querySelector('a[href*="modul-"]');
    const match = link?.getAttribute('href')?.match(/modul-(\d)/);
    return match ? Number(match[1]) - 1 : 0;
  };

  const prepare = element => {
    const index = moduleNumber(element);
    element.style.setProperty('--module-hue', palette[index % palette.length]);
    element.dataset.moduleGlow = String(index + 1);
    element.addEventListener('pointerdown', () => element.classList.add('module-pressed'));
    element.addEventListener('pointerup', () => setTimeout(() => element.classList.remove('module-pressed'), 220));
    element.addEventListener('pointercancel', () => element.classList.remove('module-pressed'));
    element.addEventListener('focusin', () => element.classList.add('module-focus-glow'));
    element.addEventListener('focusout', () => element.classList.remove('module-focus-glow'));
    element.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
        event.preventDefault();
        element.classList.add('module-pressed');
        setTimeout(() => { location.href = link.href; }, 190);
      });
    });
  };

  document.querySelectorAll('.module, .module-catalog-card').forEach(prepare);

  document.querySelectorAll('.module-track:not([data-carousel-track])').forEach(track => {
    let frame;
    const updateActive = () => {
      frame = null;
      const center = track.getBoundingClientRect().left + track.clientWidth / 2;
      let active;
      let nearest = Infinity;
      track.querySelectorAll('.module').forEach(module => {
        const rect = module.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - center);
        if (distance < nearest) {
          nearest = distance;
          active = module;
        }
      });
      track.querySelectorAll('.module-loop-active').forEach(module => module.classList.remove('module-loop-active'));
      active?.classList.add('module-loop-active');
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(updateActive);
    };
    track.addEventListener('scroll', schedule, { passive: true });
    track.addEventListener('scrollend', updateActive);
    window.addEventListener('resize', schedule);
    requestAnimationFrame(() => requestAnimationFrame(updateActive));
  });
})();

