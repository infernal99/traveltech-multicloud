let currentCountry = "";

const FAVORITES_URL = "http://localhost:4001/favorites";

async function searchCountry() {
  const input = document.getElementById("countryInput").value;

  const res = await fetch(`https://restcountries.com/v3.1/name/${input}`);
  const data = await res.json();

  currentCountry = data[0].name.common;

  document.getElementById("result").innerHTML =
    `<p>${currentCountry}</p>`;
}

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

loadFavorites();