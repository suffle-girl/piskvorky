import { findWinner } from "https://unpkg.com/piskvorky@0.1.4";

let currentPlayer = "circle";
const gameBoxes = document.querySelectorAll(".game__box");

const clicking = (event) => {
  const btn = event.target;
  const playerSymbol = document.querySelector("#currentlyPlayingSymbol");
  event.target.disabled = true;
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

  const gameField = [...gameBoxes].map((item) => {
    if (item.classList.contains("game__field--circle")) {
      return "o";
    } else if (item.classList.contains("game__field--cross")) {
      return "x";
    } else {
      return "_";
    }
  });

  const returningWinner = () => {
    const winner = findWinner(gameField);
    if (winner === "o" || winner === "x") {
      alert(`Vyhrál hráč se symbolem "${winner.toUpperCase()}"!`);
      location.reload();
    } else if (winner === "tie") {
      alert("Hra skončila nerozhodně.");
    }
  };

  setTimeout(returningWinner, 500);
};

const leaveConfirm = (event) => {
  const confirmation = confirm("Opravdu chceš začít znovu?");
  if (confirmation !== true) {
    event.preventDefault();
  }
};

gameBoxes.forEach((box) => {
  box.addEventListener("click", clicking);
});

document
  .querySelector(".game__link--restart")
  .addEventListener("click", leaveConfirm);
