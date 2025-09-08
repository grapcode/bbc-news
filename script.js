//-------🔰 promise -> pending, resolve(success), reject(error)

//--------⚡ Api request----> main Structure
// fetch('url') //  promise
//   .then((res) => res.json()) // response ----> promise
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log('Error:', err);
//   });

// //--------system 02⚡ Api request----> function rapping(মোড়াতে পারি)

// const loadCategoryAsync = async () => {
//   try {
//     const res = await fetch('https://news-api-fs.vercel.app/api/categories');
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// loadCategoryAsync();

//--------system 01-🔰  Api request----> function rapping(মোড়াতে পারি)
// ⚡ add categories
const categoryContainer = document.getElementById('categoryContainer');

const newsContainer = document.getElementById('newsContainer');

const bookmarkContainer = document.getElementById('bookmarkContainer');

const bookmarkCount = document.getElementById('bookmarkCount');

let bookmarks = [];

const loadCategory = () => {
  fetch('https://news-api-fs.vercel.app/api/categories') //  promise
    .then((res) => res.json()) // response ----> promise
    .then((data) => {
      //   console.log(data.categories);
      //-----------------------⚡ add categories v1
      const categories = data.categories;
      showCategory(categories);
    })
    .catch((err) => {
      console.log('Error:', err);
    });
};

//-----------------------⚡ show categories v1
const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += ` 
        <li id="${cat.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">${cat.title}</li>
        `;
  });

  //------------------------⚡ categories v1 add selector/indicator
  categoryContainer.addEventListener('click', (e) => {
    const allLi = document.querySelectorAll('li');
    //-------------✨ forEach --> border remove
    allLi.forEach((li) => {
      li.classList.remove('border-b-4');
    });
    //-------------✨  border add
    if (e.target.localName === 'li') {
      //   console.log(e.target);
      showLoading();
      e.target.classList.add('border-b-4');
      loadNewsByCategory(e.target.id);
    }
  });
};

//------------------------🔰  add News by Categories
const loadNewsByCategory = (categoryId) => {
  //   console.log(categoryId);
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.articles);

      showNewsByCategory(data.articles);
    })
    .catch((err) => {
      // console.log(err);
      ShowError();
      alert('Something went wrong');
    });
};

//-----------------------⚡ show news by categories
const showNewsByCategory = (articles) => {
  // console.log(articles);

  // ভারত

  if (articles.length === 0) {
    showEmptyMessage();
    alert('No news found for this category!');
    return;
  }
  //-------------✨  remove news
  newsContainer.innerHTML = '';

  //-------------✨  show news
  articles.forEach((article) => {
    // console.log(article);
    newsContainer.innerHTML += `
    <div class='border border-gray-300 rounded-lg overflow-hidden'>
        <div>
            <img src="${article.image.srcset[5].url}" />
        </div>
        
        <div id='${article.id}' class="p-2">
            <h1 class='font-extrabold'>${article.title}</h1>
            <P class='text-sm'>${article.time}</p>
            <button class='btn'>Bookmark</button>
        </div>
    </div>
    
    `;
  });
};

//------------------------🔰  bookmark button
newsContainer.addEventListener('click', (e) => {
  // console.log(e.target);
  //-------------✨  button এর বাহিরে ক্লিক করলে যেন কিছু না আসে।
  if (e.target.innerText === 'Bookmark') {
    // console.log('bookmark button clicked');
    // console.log(e.target.parentNode.children[0].innerText);
    handleBookmarks(e);
  }

  //   if (e.target.innerText === 'View Details') {
  //     handleViewDetails(e);
  //   }
});

//-------------✨  button  পেরেন্ট এর টাইটেল এবং id কে ধরতে হবে।
const handleBookmarks = (e) => {
  const title = e.target.parentNode.children[0].innerText;
  const id = e.target.parentNode.id;
  //   console.log(id);
  // ✨ উপরে একটা খলি arry বানাতে হবে।
  bookmarks.push({
    title: title,
    id: id,
  });
  //   console.log(bookmarks);
  showBookmarks(bookmarks);
};

//-----------------------⚡ show bookmarks
const showBookmarks = (bookmarks) => {
  //   console.log(bookmarks);
  bookmarkContainer.innerHTML = '';

  bookmarks.forEach((bookmark) => {
    bookmarkContainer.innerHTML += `
    <div class='border my-2 p-1'>
        <h1>${bookmark.title}</h1>
        <button onclick="handleDeleteBookmark('${bookmark.id}')" class="btn btn-xs">Delete</button>
    `;
  });
  //-------------✨  bookmark Count
  bookmarkCount.innerText = bookmarks.length;
};

//-----------------------⚡ Delete Bookmark
// ডিলেট করার জন্য btn এ onclick দিতে হবে
const handleDeleteBookmark = (bookmarkId) => {
  //   console.log(bookmarkId);
  const filteredBookmarks = bookmarks.filter(
    (bookmark) => bookmark.id !== bookmarkId
  );
  bookmarks = filteredBookmarks;
  showBookmarks(bookmarks);
};

//-------------------🔰  Loading...
// এই ফাংশন উপরে  showCategory তে কল করতে হবে----
const showLoading = () => {
  newsContainer.innerHTML = `
    <div class="bg-green-500 p-3">Loading...</div>
    `;
};

//-------------------🔰  প্রযুক্তি এর Error দেখাতে, ফাংশনটি উপরে কল করতে হবে
const ShowError = () => {
  newsContainer.innerHTML = `
      <div class="bg-red-500 p-3">Something went wrong</div>
    `;
};

//-------------------🔰  ভারত এর Empty message দেখাতে, ফাংশনটি উপরে কল করতে হবে
const showEmptyMessage = () => {
  newsContainer.innerHTML = `
      <div class="bg-orange-500 p-3">No news found for this category</div>
    `;
};

loadCategory();
//------------------------🔰  মূলপাতার মাঝে দেখাবে
loadNewsByCategory('main');
