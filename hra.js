let currentPlayer = "circle";

const clicking = (event) => {
  const btn = event.target;
  const playerSymbol = document.querySelector("#currentlyPlayingSymbol");
  if (currentPlayer === "circle") {
    btn.classList.add("game__field--circle");
    currentPlayer = "cross";
    playerSymbol.setAttribute("src", "cross.svg");
    playerSymbol.setAttribute("alt", "křížek");
    
  } else if (currentPlayer === "cross") {
    btn.classList.add("game__field--cross");
    currentPlayer = "circle";
    playerSymbol.setAttribute("src", "circle.svg");
    playerSymbol.setAttribute("alt", "kolečko");
  }
  event.target.disabled = true;
};

document
  .querySelector("button:nth-child(1)")
  .addEventListener("click", clicking);
document
  .querySelector("button:nth-child(2)")
  .addEventListener("click", clicking);
document
  .querySelector("button:nth-child(3)")
  .addEventListener("click", clicking);
document
  .querySelector("button:nth-child(4)")
  .addEventListener("click", clicking);
document
  .querySelector("button:nth-child(5)")
  .addEventListener("click", clicking);
document
  .querySelector("button:nth-child(6)")
  .addEventListener("click", clicking);
document
  .querySelector("button:nth-child(7)")
  .addEventListener("click", clicking);
document
  .querySelector("button:nth-child(8)")
  .addEventListener("click", clicking);
document
  .querySelector("button:nth-child(9)")
  .addEventListener("click", clicking);
document
  .querySelector("button:nth-child(10)")
  .addEventListener("click", clicking);
