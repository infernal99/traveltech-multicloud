let currentCountry = null;
let currentData = null;

// 🔗 URLs de tus microservicios
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
      flag: country.flags.svg
    };

    // 🔥 MOSTRAR TODOS LOS DATOS
    document.getElementById("result").innerHTML = `
      <div style="border:1px solid #ccc; padding:10px; width:300px;">
        <h2>${currentData.name}</h2>
        <img src="${currentData.flag}" alt="flag" width="150">
        <p><strong>Capital:</strong> ${currentData.capital}</p>
        <p><strong>Región:</strong> ${currentData.region}</p>
        <p><strong>Población:</strong> ${currentData.population.toLocaleString()}</p>
      </div>
    `;

    loadComments();

  } catch (error) {
    console.error("ERROR SEARCH:", error);
    alert("Error al buscar el país");
  }
}

// =======================
// FAVORITES
// =======================
async function addFavorite() {
  if (!currentData) {
    alert("Busca un país primero");
    return;
  }

  try {
    await fetch(FAVORITES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentData)
    });

    loadFavorites();

  } catch (error) {
    console.error("ERROR FAVORITE:", error);
  }
}

async function loadFavorites() {
  try {
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

  } catch (error) {
    console.error("ERROR LOAD FAVORITES:", error);
  }
}

async function deleteFavorite(name) {
  try {
    await fetch(`${FAVORITES_URL}/${name}`, {
      method: "DELETE"
    });

    loadFavorites();

  } catch (error) {
    console.error("ERROR DELETE FAVORITE:", error);
  }
}

// =======================
// COMMENTS
// =======================
async function addComment() {
  const text = document.getElementById("commentInput").value;

  if (!currentCountry || !text) {
    alert("Escribe un comentario primero");
    return;
  }

  try {
    await fetch(COMMENTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        country: currentCountry,
        comment: text
      })
    });

    document.getElementById("commentInput").value = "";

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

async function deleteComments() {
  if (!currentCountry) return;

  try {
    await fetch(`${COMMENTS_URL}/${currentCountry}`, {
      method: "DELETE"
    });

    loadComments();

  } catch (error) {
    console.error("ERROR DELETE COMMENTS:", error);
  }
}

// =======================
// WISHLIST
// =======================
async function addWishlist() {
  if (!currentData) {
    alert("Busca un país primero");
    return;
  }

  try {
    await fetch(WISHLIST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: currentData.name
      })
    });

    loadWishlist();

  } catch (error) {
    console.error("ERROR WISHLIST:", error);
  }
}

async function loadWishlist() {
  try {
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

  } catch (error) {
    console.error("ERROR LOAD WISHLIST:", error);
  }
}

async function deleteWishlist(name) {
  try {
    await fetch(`${WISHLIST_URL}/${name}`, {
      method: "DELETE"
    });

    loadWishlist();

  } catch (error) {
    console.error("ERROR DELETE WISHLIST:", error);
  }
}

// =======================
// INIT
// =======================
loadFavorites();
loadWishlist();