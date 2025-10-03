document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".progress-bar").forEach(bar => {
    const finalWidth = bar.style.width;
    bar.style.width = "0";
    bar.style.transition = "width 1s ease-in-out";
    setTimeout(() => {
      bar.style.width = finalWidth;
    }, 100);
  });

  const counters = document.querySelectorAll(".experience-number");
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute("data-target"));
    let count = 0;

    const updateCount = () => {
      const increment = Math.ceil(target / 100);
      if (count < target) {
        count += increment;
        counter.textContent = count + "+";
        setTimeout(updateCount, 30);
      } else {
        counter.textContent = target + "+";
      }
    };

    updateCount();
  });
});
