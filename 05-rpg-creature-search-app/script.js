
const LIST_API_URL = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const CREATURE_API_URL = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const statElements = document.querySelectorAll(".stat");
const statMap = {};  

statElements.forEach(span => {
  if (span.id) {
    statMap[span.id] = span;
  }
});

async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

function clearDisplay() {
  Object.entries(statMap).forEach(([id, elem]) => {
    if (id === "types") {
      elem.innerHTML = "";    
    } else {
      elem.textContent = "";  
    }
  });
}

let creaturesList = [];
window.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchData(LIST_API_URL);
  if (data) {
    creaturesList = data;
  }
  searchButton.addEventListener("click", onSearch);
});

async function onSearch() {
  const query = searchInput.value.trim();
  if (query === "") {
    clearDisplay();
    return;
  }
  const creature = creaturesList.find(creat =>
    creat.name.toLowerCase() === query.toLowerCase() || String(creat.id) === query
  );
  clearDisplay();  
  if (!creature) {
    alert("Creature not found");
  } else {
    const info = await fetchData(CREATURE_API_URL + creature.id);
    if (!info) {
      alert("Creature not found");
    } else {
      statMap["creature-name"].textContent = info.name.toUpperCase();
      statMap["creature-id"].textContent = `#${info.id}`;
      statMap["weight"].textContent = `Weight: ${info.weight}`;
      statMap["height"].textContent = `Height: ${info.height}`;
      info.types.forEach(typeObj => {
        const typeName = typeObj.name.toUpperCase();
        statMap["types"].innerHTML += `<span>${typeName}</span>`;
      });
      info.stats.forEach(statObj => {
        const statName = statObj.name;
        const statValue = statObj.base_stat;
        if (statMap[statName]) {
          statMap[statName].textContent = statValue;
        }
      });
    }
  }
  searchInput.value = "";
}


