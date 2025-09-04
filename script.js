// script.js — robust single-serve version with tooltip (drop-in replacement)

// List of 29 Onam Sadhya dishes (keep your existing array)
const dishes = [
  { name: "Mango Pickle", info: "Spicy and tangy pickle made from raw mango" },
  { name: "Lemon Pickle", info: "Sour and spicy pickle made with lemon" },
  { name: "Salt", info: "Essential seasoning placed on the banana leaf" },
  { name: "Sharkara Varatti", info: "Jaggery-coated banana chips" },
  { name: "Banana Chips", info: "Crispy fried banana slices" },
  { name: "Kaalan", info: "Thick yogurt curry with yam and raw banana" },
  { name: "Cabbage Thoran", info: "Cabbage stir-fried with coconut" },
  { name: "Kootu Curry", info: "Black chana and yam curry with coconut" },
  { name: "Olan", info: "Mild curry with ash gourd and cowpeas in coconut milk" },
  { name: "Puli Inji", info: "Sweet, sour and spicy ginger-tamarind chutney" },
  { name: "Kichadi", info: "Curd-based dish with cucumber or bitter gourd" },
  { name: "Parippu Curry", info: "Moong dal curry eaten with ghee" },
  { name: "Pavakka Curry", info: "Bitter gourd curry" },
  { name: "Erissery", info: "Pumpkin and beans curry with coconut" },
  { name: "Ulli Curry", info: "Onion curry usually served with curd" },
  { name: "Beetroot Pachadi", info: "Curd-based beetroot dish" },
  { name: "Avial", info: "Mixed vegetables cooked with coconut and curd" },
  { name: "Sweet Pachadi", info: "Sweet curd-based pachadi, usually made with pineapple or fruits" },
  { name: "Choru (Rice)", info: "Steamed plain rice, the main dish of Sadhya" },
  { name: "Sambar", info: "Lentil-based curry with tamarind and vegetables" },
  { name: "Rasam", info: "Spicy and tangy tamarind soup" },
  { name: "Kondattam Mulak", info: "Sun-dried and fried green chillies" },
  { name: "Palada Pradhaman", info: "Payasam made with rice ada, milk, and sugar" },
  { name: "Parippu Payasam", info: "Sweet payasam made with moong dal and jaggery" },
  { name: "Ada Pradhaman", info: "Traditional payasam with rice ada and jaggery" },
  { name: "Semiya Payasam", info: "Payasam made with vermicelli, milk, and sugar" },
  { name: "Banana", info: "Ripe banana served with Sadhya" },
  { name: "Pappadam", info: "Crispy deep-fried papad" },
  { name: "Water", info: "Drinking water served alongside" }
];


let currentDish = 0;
const serveBtn = document.getElementById("serveBtn");
const dishContainer = document.getElementById("dishes");

// create tooltip element once
let tooltip = document.querySelector(".tooltip");
if (!tooltip) {
  tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  document.body.appendChild(tooltip);
}

// small guard to prevent double/fast clicks from adding multiple dishes
let isServing = false;

serveBtn.addEventListener("click", () => {
  // prevent re-entry if already serving
  if (isServing) return;
  isServing = true;
  serveBtn.disabled = true; // temporarily disable the button

  // quick debounce window (prevents double clicks or touch+click duplicates)
  setTimeout(() => {
    isServing = false;
    serveBtn.disabled = false;
  }, 300); // adjust 300ms if needed

  if (currentDish >= dishes.length) {
    alert("✅ All 29 dishes served!");
    return;
  }

  // capture index so handlers reference correct data even after currentDish++
  const idx = currentDish;

  // safeguard: if an element with same class already exists, skip adding duplicate
  if (dishContainer.querySelector(`.dish${idx+1}`)) {
    currentDish++;
    return;
  }

  const dishData = dishes[idx];
  const dish = document.createElement("img");
  dish.src = `dish${idx+1}.png`; // ensure your images are named dish1.png ... dish28.png
  dish.className = `dish dish${idx+1}`;
  dish.dataset.name = dishData.name;
  dish.dataset.info = dishData.info;
  dish.style.opacity = "0"; // start hidden for fade-in

  // Tooltip handlers (use captured dataset values)
  dish.addEventListener("mouseenter", () => {
    tooltip.innerHTML = `<strong>${dish.dataset.name}</strong><br>${dish.dataset.info}`;
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateY(0)";
  });

  dish.addEventListener("mousemove", (e) => {
    tooltip.style.left = (e.pageX + 12) + "px";
    tooltip.style.top = (e.pageY + 12) + "px";
  });

  dish.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
    tooltip.style.transform = "translateY(-10px)";
  });

  dishContainer.appendChild(dish);

  // Fade-in (use requestAnimationFrame for smoother paint)
  requestAnimationFrame(() => {
    setTimeout(() => { dish.style.opacity = "1"; }, 20);
  });

  currentDish++;
});

// leaf unfold (keep your existing behavior)
window.addEventListener("load", () => {
  const leaf = document.getElementById("leaf");
  setTimeout(() => {
    leaf.classList.add("unfold");
  }, 500);
});
// Extra: Tap support for mobile
dish.addEventListener("click", () => {
  tooltip.innerHTML = `<strong>${dish.dataset.name}</strong><br>${dish.dataset.info}`;
  tooltip.style.opacity = "1";
  tooltip.style.left = (window.innerWidth / 2 - 80) + "px"; // center-ish
  tooltip.style.top = (window.innerHeight - 100) + "px"; // near bottom
  setTimeout(() => {
    tooltip.style.opacity = "0";
  }, 2500); // auto-hide after 2.5s
});

