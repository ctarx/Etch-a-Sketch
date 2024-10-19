const container = document.querySelector(".container");

for (let i = 1; i <= 256; i++) {
  const div = document.createElement("div");
  div.classList.add("grid");
  container.appendChild(div);
  div.innerText = `${i}`;
}
