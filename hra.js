import { findWinner } from "https://unpkg.com/piskvorky@0.1.4";

let currentPlayer = "circle";
const gameBoxes = document.querySelectorAll(".game__box");

const clicking = async (event) => {
  const btn = event.target;
  const playerSymbol = document.querySelector("#currentlyPlayingSymbol");

  // listener for changing players
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

  // create array of game boxes
  const gameField = [...gameBoxes].map((item) => {
    if (item.classList.contains("game__field--circle")) {
      return "o";
    } else if (item.classList.contains("game__field--cross")) {
      return "x";
    } else {
      return "_";
    }
  });

  // finding winner
  const winner = findWinner(gameField);
  const alertMessage = () => {
    alert(`Vyhrál hráč se symbolem "${winner.toUpperCase()}"!`);
    location.reload();
  };

  if (winner === "o" || winner === "x") {
    setTimeout(alertMessage, 500);
  } else if (winner === "tie") {
    setTimeout(() => {
      alert("Hra skončila nerozhodně.");
    }, 500);
  } else {
    if (currentPlayer === "cross") {
      // disable the boxes
      gameBoxes.forEach((gameBox) => {
        gameBox.disabled = true;
      });

      // calling API
      const response = await fetch(
        "https://piskvorky.czechitas-podklady.cz/api/suggest-next-move",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            board: gameField,
            player: "x",
          }),
        }
      );

      // sorting data from API
      const data = await response.json();
      const { x, y } = data.position;
      const gameBox = gameBoxes[x + y * 10];

      // enable the boxes
      gameBoxes.forEach((gameBox) => {
        if (
          gameBox.classList.contains("game__field--circle") ||
          gameBox.classList.contains("game__field--cross")
        ) {
          gameBox.disabled = true;
        } else {
          gameBox.disabled = false;
        }
      });

      gameBox.click();
    }
  }
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
