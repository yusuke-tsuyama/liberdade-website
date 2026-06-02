// common.js

// ── LIGHTBOX ──
  let lbImages = [], lbIndex = 0;
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');

  function openLightbox(imgs, idx) {
    lbImages = imgs;
    lbIndex = idx;
    lbImg.src = lbImages[lbIndex];
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lb.classList.remove('active');
    lbImg.src = '';
    document.body.style.overflow = '';
  }
  function lbMove(dir) {
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    lbImg.src = lbImages[lbIndex];
  }

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', () => lbMove(-1));
  document.getElementById('lightbox-next').addEventListener('click', () => lbMove(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbMove(-1);
    if (e.key === 'ArrowRight') lbMove(1);
  });

  // 全ギャラリーにクリックイベントを付与
  document.querySelectorAll('.photo-gallery').forEach(gallery => {
    const imgs = Array.from(gallery.querySelectorAll('img')).map(i => i.src);
    gallery.querySelectorAll('img').forEach((img, idx) => {
      img.addEventListener('click', () => openLightbox(imgs, idx));
    });
  });

  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(s => observer.observe(s));

  function showPage(page) {
    document.getElementById('page-main').style.display = 'none';
    document.getElementById('page-' + page).style.display = 'block';
    window.scrollTo(0, 0);
    // trigger reveal for sub-page sections
    document.querySelectorAll('#page-' + page + ' section').forEach(s => {
      setTimeout(() => s.classList.add('visible'), 100);
    });
  }
  function showMain() {
    document.querySelectorAll('.sub-page').forEach(p => p.style.display = 'none');
    document.getElementById('page-main').style.display = 'block';
    window.scrollTo(0, 0);
  }
  function showPhotoCategory(cat) {
    const map = { portrait: 'portrait', product: 'product', architecture: 'architecture' };
    document.querySelectorAll('.sub-page').forEach(p => p.style.display = 'none');
    const target = document.getElementById('page-photo-' + map[cat]);
    if (target) {
      target.style.display = 'block';
      window.scrollTo(0, 0);
      target.querySelectorAll('section').forEach(s => setTimeout(() => s.classList.add('visible'), 100));
    }
  }