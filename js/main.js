  AOS.init();
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".progress-bar").forEach(bar => {
    const finalWidth = bar.getAttribute("data-width") + "%";
    bar.style.width = "0";
    bar.style.transition = "width 1.3s ease-in-out";
    setTimeout(() => {
      bar.style.width = finalWidth;
    }, 300);
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

document.querySelectorAll('.modal').forEach(modalEl => {
  modalEl.addEventListener('show.bs.modal', () => {
    const iframe = modalEl.querySelector('iframe[data-src]');
    if (iframe && !iframe.src) iframe.src = iframe.dataset.src;
  });
  modalEl.addEventListener('hidden.bs.modal', () => {
    const iframe = modalEl.querySelector('iframe[data-src]');
    if (iframe) iframe.src = '';
  });
});





document.addEventListener('DOMContentLoaded', () => {
  const debug = true; 
  let lastFocused = null;

  const btn = document.getElementById('loadMoreBtn');
  const extra = document.getElementById('extra-projects');
  const portfolioGrid = document.getElementById('portfolioGrid');

  if (btn && extra) {
    btn.addEventListener('click', () => {
      const hidden = getComputedStyle(extra).display === 'none';
      if (hidden) {
        extra.style.display = 'block';
        extra.style.opacity = 0;
        requestAnimationFrame(() => {
          extra.style.transition = 'opacity .35s, transform .35s';
          extra.style.opacity = 1;
          extra.style.transform = 'translateY(0)';
        });
        btn.textContent = 'Load Less';
      } else {
        extra.style.opacity = 0;
        setTimeout(() => {
          extra.style.display = 'none';
          btn.textContent = 'Load More';
          portfolioGrid.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      }
    });
  }

  document.querySelectorAll('.portfolio-card[role="button"]').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  const modalIframes = Array.from(document.querySelectorAll('#modals-container iframe'));
  const withoutDataSrc = modalIframes.filter(iframe => !iframe.hasAttribute('data-src'));
  if (withoutDataSrc.length) {
    console.warn('Algunos iframes no tienen data-src:', withoutDataSrc.map(f => f.closest('.modal')?.id || f));
  }

  document.addEventListener('show.bs.modal', (e) => {
    const modal = e.target;
    lastFocused = e.relatedTarget || document.activeElement;

    const iframe = modal.querySelector('iframe[data-src]');
    if (iframe && !iframe.getAttribute('src')) {
      iframe.setAttribute('src', iframe.dataset.src.trim());
      if (debug) console.log(`[modal:${modal.id}] cargando iframe ->`, iframe.dataset.src);
    }
  });

  document.addEventListener('hidden.bs.modal', (e) => {
    const modal = e.target;
    const iframe = modal.querySelector('iframe[data-src]');
    if (iframe) {
      iframe.removeAttribute('src');
      if (debug) console.log(`[modal:${modal.id}] src removido`);
    }

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
    lastFocused = null;
  });

  if (typeof bootstrap === 'undefined') {
    console.warn('Bootstrap no detectado. Asegura que bootstrap.bundle.js se carga antes de este script.');
  }
});

const projects = document.querySelectorAll('.portfolio-card');
const loadMoreBtn = document.getElementById('loadMoreBtn');

const initialCount = 3;

function showInitialProjects() {
    projects.forEach((project, index) => {
        project.style.display = index < initialCount ? 'block' : 'none';
    });
    loadMoreBtn.textContent = 'Load More';
}

function showAllProjects() {
    projects.forEach(project => project.style.display = 'block');
    loadMoreBtn.textContent = 'Load Less';
}

let showingAll = false;

showInitialProjects();

loadMoreBtn.addEventListener('click', () => {
    if(showingAll) {
        showInitialProjects();
    } else {
        showAllProjects();
    }
    showingAll = !showingAll;
});


