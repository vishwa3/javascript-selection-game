const container = document.querySelector(".container");

// helper that returns a random RGB triple
function randomRgb() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
}

// choose readable text color (black or white) using YIQ formula
function readableTextColor({ r, g, b }) {
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#111" : "#fff";
}

function startDeselecting(arr) {
  const items = arr.slice();
  container.classList.add("deselecting");
  items.forEach((item, index, arr) => {
    setTimeout(() => {
      item.style.backgroundColor = "#f3f4f6";
      item.style.color = "#111";
    }, (items.length - index) * 1000);
  });

  setTimeout(() => {
    items.forEach((item) => {
      if (typeof item._onClick === "function") {
        item.addEventListener("click", item._onClick, { once: true });
      }
    });
    arr.length = 0;
    container.classList.remove("deselecting");
  }, items.length * 1000 + 50);
}
const arr = [];
for (let i = 0; i < 20; i++) {
  const button = document.createElement("button");
  button.innerText = i + 1;
  container.appendChild(button);

  function onClick() {
    const col = randomRgb();
    button.style.backgroundColor = `rgb(${col.r}, ${col.g}, ${col.b})`;
    button.style.color = readableTextColor(col);
    arr.push(button);
    if (arr.length === 20) {
      startDeselecting(arr);
    }
  }

  button._onClick = onClick;

  button.addEventListener("click", onClick, { once: true });
}
