/* ======================================================
   BBC Bangla Project
   - Categories load
   - News load by category
   - Bookmark system
   - News details modal
   ====================================================== */

// ------------------🔰 DOM Elements -------------------
const categoryContainer = document.getElementById('categoryContainer');
const newsContainer = document.getElementById('newsContainer');
const bookmarkContainer = document.getElementById('bookmarkContainer');
const bookmarkCount = document.getElementById('bookmarkCount');

// Modal elements
const newsDetailsModal = document.getElementById('news-details-modal');
const modalContainer = document.getElementById('modalContainer');

// Bookmark array (all bookmark data store হবে এখানে)
let bookmarks = [];

// =====================================================
// 🔰 Helper Functions (Loading / Error / Empty Message)
// =====================================================

// Loading state দেখানোর জন্য
const showLoading = () => {
  newsContainer.innerHTML = `
    <div class="bg-green-500 p-3">Loading...</div>
  `;
};

// Error state দেখানোর জন্য
const showError = () => {
  newsContainer.innerHTML = `
    <div class="bg-red-500 p-3">Something went wrong</div>
  `;
};

// যদি news না থাকে (empty message)
const showEmptyMessage = () => {
  newsContainer.innerHTML = `
    <div class="bg-orange-500 p-3">No news found for this category</div>
  `;
};

// =====================================================
// 🔰 Load & Show Categories
// =====================================================

// API দিয়ে categories load করা
const loadCategory = () => {
  fetch('https://news-api-fs.vercel.app/api/categories')
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
    })
    .catch((err) => {
      console.log('Error:', err);
      showError();
    });
};

// Category UI show করা
const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
      <li id="${cat.id}" class="hover:border-b-4 hover:border-red-600 cursor-pointer">
        ${cat.title}
      </li>
    `;
  });

  // Category click event handler
  categoryContainer.addEventListener('click', (e) => {
    const allLi = document.querySelectorAll('li');

    // পূর্বের selected category border remove করা
    allLi.forEach((li) => {
      li.classList.remove('border-b-4');
    });

    // নতুন selected category border add করা
    if (e.target.localName === 'li') {
      showLoading();
      e.target.classList.add('border-b-4');
      loadNewsByCategory(e.target.id);
    }
  });
};

// =====================================================
// 🔰 Load & Show News By Category
// =====================================================

// Category অনুযায়ী news load
const loadNewsByCategory = (categoryId) => {
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      showNewsByCategory(data.articles);
    })
    .catch((err) => {
      console.log(err);
      showError();
    });
};

// Category অনুযায়ী news show
const showNewsByCategory = (articles) => {
  if (articles.length === 0) {
    showEmptyMessage();
    alert('No news found for this category!');
    return;
  }

  // প্রথমে পুরনো news clear করা
  newsContainer.innerHTML = '';

  // নতুন news show করা
  articles.forEach((article) => {
    newsContainer.innerHTML += `
      <div class="border border-gray-300 rounded-lg overflow-hidden">
        <div>
          <img src="${article.image.srcset[5].url}" />
        </div>
        
        <div id="${article.id}" class="p-2">
          <h1 class="font-extrabold">${article.title}</h1>
          <p class="text-sm">${article.time}</p>
          <button class="btn">Bookmark</button>
          <button class="btn">View Details</button>
        </div>
      </div>
    `;
  });
};

// =====================================================
// 🔰 Bookmark System
// =====================================================

// News container এ event delegation
newsContainer.addEventListener('click', (e) => {
  // Bookmark button clicked হলে
  if (e.target.innerText === 'Bookmark') {
    handleBookmarks(e);
  }

  // View Details button clicked হলে
  if (e.target.innerText === 'View Details') {
    handleViewDetails(e);
  }
});

// Bookmark add করা
const handleBookmarks = (e) => {
  const title = e.target.parentNode.children[0].innerText;
  const id = e.target.parentNode.id;

  bookmarks.push({ title, id });
  showBookmarks(bookmarks);
};

// Bookmark show করা
const showBookmarks = (bookmarks) => {
  bookmarkContainer.innerHTML = '';

  bookmarks.forEach((bookmark) => {
    bookmarkContainer.innerHTML += `
      <div class="border my-2 p-1">
        <h1>${bookmark.title}</h1>
        <button onclick="handleDeleteBookmark('${bookmark.id}')" class="btn btn-xs">Delete</button>
      </div>
    `;
  });

  // Bookmark count update
  bookmarkCount.innerText = bookmarks.length;
};

// Bookmark delete করা
const handleDeleteBookmark = (bookmarkId) => {
  bookmarks = bookmarks.filter((bookmark) => bookmark.id !== bookmarkId);
  showBookmarks(bookmarks);
};

// =====================================================
// 🔰 News Details Modal
// =====================================================

// View Details button handler
const handleViewDetails = (e) => {
  const id = e.target.parentNode.id;

  fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showDetailsNews(data.article);
    })
    .catch((err) => {
      console.log(err);
      showError();
    });
};

// Modal এ news details দেখানো
const showDetailsNews = (article) => {
  newsDetailsModal.showModal();

  modalContainer.innerHTML = `
    <h1>${article.title}</h1>
    <img src="${article.images[0].url}" />
    <p>${article.content.join('')}</p>
  `;
};

// =====================================================
// 🔰 Initial Function Call
// =====================================================
loadCategory(); // প্রথমে category load হবে
loadNewsByCategory('main'); // ডিফল্ট ভাবে "মূলপাতা" news show হবে
