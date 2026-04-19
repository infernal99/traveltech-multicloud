let currentCountry = "";

// 🔴 CAMBIAR ESTO DESPUÉS DEL DEPLOY
const FAVORITES_URL = "https://traveltech-multicloud-x3q3.onrender.com";
const COMMENTS_URL = "https://TU-COMMENTS.up.railway.app/comments";
const WISHLIST_URL = "https://TU-WISHLIST.onrender.com/wishlist";

// =======================
// SEARCH COUNTRY
// =======================
async function searchCountry() {
  const input = document.getElementById("countryInput").value;

  const res = await fetch(`https://restcountries.com/v3.1/name/${input}`);
  const data = await res.json();

  currentCountry = data[0].name.common;

  document.getElementById("result").innerHTML =
    `<p><strong>${currentCountry}</strong></p>`;
}

// =======================
// FAVORITES
// =======================
async function addFavorite() {
  if (!currentCountry) return;

  await fetch(FAVORITES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ country: currentCountry })
  });

  loadFavorites();
}

async function loadFavorites() {
  const res = await fetch(FAVORITES_URL);
  const data = await res.json();

  const list = document.getElementById("favorites");
  list.innerHTML = "";

  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.country;
    list.appendChild(li);
  });
}

// =======================
// COMMENTS
// =======================
async function addComment() {
  const commentText = document.getElementById("commentInput").value;

  if (!currentCountry || !commentText) return;

  await fetch(COMMENTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      country: currentCountry,
      comment: commentText
    })
  });

  document.getElementById("commentInput").value = "";

  loadComments();
}

async function loadComments() {
  const res = await fetch(COMMENTS_URL);
  const data = await res.json();

  const list = document.getElementById("comments");
  list.innerHTML = "";

  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.country}: ${item.comment}`;
    list.appendChild(li);
  });
}

// =======================
// WISHLIST
// =======================
async function addWishlist() {
  if (!currentCountry) return;

  await fetch(WISHLIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      country: currentCountry
    })
  });

  loadWishlist();
}

async function loadWishlist() {
  const res = await fetch(WISHLIST_URL);
  const data = await res.json();

  const list = document.getElementById("wishlist");
  list.innerHTML = "";

  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.country;
    list.appendChild(li);
  });
}

// =======================
// LOAD
// =======================
loadFavorites();
loadComments();
loadWishlist();