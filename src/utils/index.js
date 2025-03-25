export function SmoothHorizontalScrolling(element, targetPosition, duration = 500) {
  const start = element.scrollLeft;
  const distance = targetPosition - start;
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function: easeOutCubic
    const ease = 1 - Math.pow(1 - progress, 3);
    
    element.scrollLeft = start + distance * ease;

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

function SHS_B(e, sc, eAmt, start, y) {
  e.scrollLeft = eAmt * sc + start;
}
