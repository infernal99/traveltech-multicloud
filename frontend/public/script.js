let currentCountry = null;
let currentData = null;

const FAVORITES_URL = "https://traveltech-multicloud-x3q3.onrender.com/favorites";
const COMMENTS_URL = "https://comments-g84f.onrender.com/comments";
const WISHLIST_URL = "https://wishlist-bmpw.onrender.com/wishlist";

// =======================
// SEARCH
// =======================
async function searchCountry() {
  const input = document.getElementById("countryInput").value;

  console.log("Buscando:", input);

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${input}`);
    const data = await res.json();

    console.log("API respuesta:", data);

    const country = data[0];

    currentCountry = country.name.common;

    currentData = {
      name: country.name.common,
      capital: country.capital ? country.capital[0] : "N/A",
      region: country.region,
      population: country.population,
      flag: country.flags.png
    };

    document.getElementById("result").innerHTML =
      `<h3>${currentData.name}</h3>`;

    loadComments();

  } catch (error) {
    console.error("ERROR SEARCH:", error);
  }
}

// =======================
// FAVORITES
// =======================
async function addFavorite() {
  console.log("Click favorite");

  if (!currentData) {
    console.log("No hay país seleccionado");
    return;
  }

  try {
    const res = await fetch(FAVORITES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentData)
    });

    const data = await res.json();

    console.log("Respuesta favorite:", data);

    loadFavorites();

  } catch (error) {
    console.error("ERROR FAVORITE:", error);
  }
}

async function loadFavorites() {
  try {
    const res = await fetch(FAVORITES_URL);
    const data = await res.json();

    console.log("Favorites:", data);

    const list = document.getElementById("favorites");
    list.innerHTML = "";

    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.name;
      list.appendChild(li);
    });

  } catch (error) {
    console.error("ERROR LOAD FAVORITES:", error);
  }
}

// =======================
// COMMENTS
// =======================
async function addComment() {
  const text = document.getElementById("commentInput").value;

  console.log("Añadiendo comentario:", text);

  if (!currentCountry || !text) {
    console.log("Falta info");
    return;
  }

  try {
    const res = await fetch(COMMENTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        country: currentCountry,
        comment: text
      })
    });

    const data = await res.json();

    console.log("Respuesta comment:", data);

    loadComments();

  } catch (error) {
    console.error("ERROR COMMENT:", error);
  }
}

async function loadComments() {
  if (!currentCountry) return;

  try {
    const res = await fetch(`${COMMENTS_URL}/${currentCountry}`);
    const data = await res.json();

    console.log("Comments:", data);

    const list = document.getElementById("comments");
    list.innerHTML = "";

    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.comment;
      list.appendChild(li);
    });

  } catch (error) {
    console.error("ERROR LOAD COMMENTS:", error);
  }
}

// =======================
// WISHLIST
// =======================
async function addWishlist() {
  console.log("Click wishlist");

  if (!currentData) {
    console.log("No hay país");
    return;
  }

  try {
    const res = await fetch(WISHLIST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: currentData.name
      })
    });

    const data = await res.json();

    console.log("Respuesta wishlist:", data);

    loadWishlist();

  } catch (error) {
    console.error("ERROR WISHLIST:", error);
  }
}

async function loadWishlist() {
  try {
    const res = await fetch(WISHLIST_URL);
    const data = await res.json();

    console.log("Wishlist:", data);

    const list = document.getElementById("wishlist");
    list.innerHTML = "";

    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.name;
      list.appendChild(li);
    });

  } catch (error) {
    console.error("ERROR LOAD WISHLIST:", error);
  }
}

// =======================
loadFavorites();
loadWishlist();