document.addEventListener('DOMContentLoaded', () => {
  // 1. Cart Management & Counter Synchronization Across Pages
  let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
  const cartCountDisplays = document.querySelectorAll('#cart-count');

  function updateCartDisplay() {
    cartCountDisplays.forEach(display => {
      display.textContent = cartCount;
    });
    localStorage.setItem('cartCount', cartCount);
  }

  updateCartDisplay();

  // 2. Add to Cart Feedback & Counter Increment (Home & Catalog)
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      cartCount++;
      updateCartDisplay();
      
      const originalText = button.textContent;
      button.textContent = 'Added! ✓';
      button.style.backgroundColor = '#27AE60';
      button.style.color = 'white';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
        button.style.color = '';
      }, 1000);
    });
  });

  // 3. Live Search & Category Filtering (Catalog Page)
  const searchInput = document.getElementById('search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const bookCards = document.querySelectorAll('.book-card');
  const noResultsMsg = document.getElementById('no-results');

  let currentCategory = 'all';
  let searchQuery = '';

  function filterBooks() {
    let visibleCount = 0;

    bookCards.forEach(card => {
      // Home page cards might not have category/title attributes, handle safely
      const category = card.getAttribute('data-category') || 'all';
      const title = (card.getAttribute('data-title') || card.querySelector('h3')?.textContent || '').toLowerCase();
      const author = (card.getAttribute('data-author') || card.querySelector('.author')?.textContent || '').toLowerCase();

      const matchesCategory = (currentCategory === 'all' || category === currentCategory);
      const matchesSearch = (title.includes(searchQuery) || author.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterBooks();
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      currentCategory = e.target.getAttribute('data-filter');
      filterBooks();
    });
  });
});