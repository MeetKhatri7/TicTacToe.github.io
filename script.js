let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let happy = new Audio("happyTune.mp3");
let turn = "X";
let isGameover = false;

// function to change turn
const changeTurn = () => {
  return turn === "X" ? "O" : turn === "O" ? "X" : "";
};

// function to check for a win

const checkWin = () => {
  let boxText = document.getElementsByClassName("boxText");
  let wins = [
    [0, 1, 2, 0, 47, 0, 23],
    [3, 4, 5, 0, 150, 0, 23],
    [6, 7, 8, 0, 253, 0, 23],
    [0, 3, 6, -102, 153, 90, 23],
    [1, 4, 7, 1, 153, 90, 23],
    [2, 5, 8, 103, 153, 90, 23],
    [0, 4, 8, 3, 151, 45, 30],
    [2, 4, 6, 3, 151, 135, 30],
  ];
  wins.forEach((e) => {
    if (
      boxText[e[0]].innerText === boxText[e[1]].innerText &&
      boxText[e[0]].innerText === boxText[e[2]].innerText &&
      boxText[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxText[e[0]].innerText + " won";
      isGameover = true;
      document.querySelector(".imgBox img").style.display = "block";
      happy.play();
      turn = "";

      // Line
      // document.querySelector(".line").style.width = `${e[6]}vw`;

      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}px,${e[4]}px) rotate(${e[5]}deg)`;
    }
  });
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".boxText");
  element.addEventListener("click", () => {
    if (boxText.innerText === "") {
      boxText.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isGameover) {
        document.querySelector(".info").innerHTML = "Turn for " + turn;
      }
    }
  });
});

// Add onclick listener on reset button
reset.addEventListener("click", () => {
  let boxText = document.querySelectorAll(".boxText");
  Array.from(boxText).forEach((element) => {
    element.innerText = "";
    turn = "X";
    document.querySelector(".info").innerHTML = "Turn for " + turn;
    document.querySelector(".imgBox img").style.display = "none";
    happy.pause();
    happy.currentTime = 0;
    document.querySelector(
      ".line"
    ).style.transform = `translate(0px,-141px) rotate(0deg)`;

    // document.querySelector(".line").style.width = `0vw`;
  });
});
