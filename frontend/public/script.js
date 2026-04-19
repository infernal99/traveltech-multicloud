let currentCountry = null;
let currentData = null;

// 🔴 CAMBIA ESTO EN PRODUCCIÓN
const FAVORITES_URL = "https://traveltech-multicloud-x3q3.onrender.com/favorites";
const COMMENTS_URL = "https://comments-g84f.onrender.com/comments";
const WISHLIST_URL = "https://wishlist-bmpw.onrender.com/wishlist";

// =======================
// SEARCH COUNTRY
// =======================
async function searchCountry() {
  const input = document.getElementById("countryInput").value;

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${input}`);
    const data = await res.json();

    const country = data[0];

    currentCountry = country.name.common;

    currentData = {
      name: country.name.common,
      capital: country.capital ? country.capital[0] : "N/A",
      region: country.region,
      population: country.population,
      flag: country.flags.png
    };

    document.getElementById("result").innerHTML = `
      <h3>${currentData.name}</h3>
      <p>Capital: ${currentData.capital}</p>
      <p>Region: ${currentData.region}</p>
      <p>Population: ${currentData.population}</p>
      <img src="${currentData.flag}" width="100">
    `;

    loadComments(); // 🔥 cargar comentarios del país
  } catch (error) {
    alert("Country not found");
  }
}

// =======================
// FAVORITES
// =======================
async function addFavorite() {
  if (!currentData) return;

  await fetch(FAVORITES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(currentData)
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
    li.textContent = item.name;

    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => deleteFavorite(item.name);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function deleteFavorite(name) {
  await fetch(`${FAVORITES_URL}/${name}`, {
    method: "DELETE"
  });

  loadFavorites();
}

// =======================
// COMMENTS (NUEVO BACKEND)
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
  if (!currentCountry) return;

  const res = await fetch(`${COMMENTS_URL}/${currentCountry}`);
  const data = await res.json();

  const list = document.getElementById("comments");
  list.innerHTML = "";

  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.comment;
    list.appendChild(li);
  });
}

async function deleteComments() {
  if (!currentCountry) return;

  await fetch(`${COMMENTS_URL}/${currentCountry}`, {
    method: "DELETE"
  });

  loadComments();
}

// =======================
// WISHLIST
// =======================
async function addWishlist() {
  if (!currentData) return;

  await fetch(WISHLIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: currentData.name })
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
    li.textContent = item.name;

    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => deleteWishlist(item.name);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function deleteWishlist(name) {
  await fetch(`${WISHLIST_URL}/${name}`, {
    method: "DELETE"
  });

  loadWishlist();
}

// =======================
// LOAD INICIAL
// =======================
loadFavorites();
loadWishlist();