const tracks = [new Audio("../assets/glass-of-wine-143532.mp3")];

const f9 = document.getElementById("f9");
const f8 = document.getElementById("f8");
const f7 = document.getElementById("f7");
const f6 = document.getElementById("f6");
const f5 = document.getElementById("f5");
const f4 = document.getElementById("f4");
const f3 = document.getElementById("f3");
const f2 = document.getElementById("f2");
const f1 = document.getElementById("f1");
const fu = document.getElementById("fu");
const stopp = document.getElementById("stop");
const floors = document.querySelectorAll(".current");

let currentFloor = "f1";
let targetFloor = "f1";
let running = -1;

const floorNames = [
  "stop",
  "fu",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
];

const bts = [fu, f1, f2, f3, f4, f5, f6, f7, f8, f9];
for (let btn of bts) {
  btn.addEventListener("click", (e) => {
    if (running === -1) {
      targetFloor = e.target.id;
      tracks[0].play();
      runElevator();
    }
  });
}

stopp.addEventListener("click", () => {
  clearTimeout(running);
  running = -1;
  tracks[0].pause();
});

function runElevator() {
  // Get current floor index
  let currentIndex = floorNames.findIndex((f) => f === currentFloor);
  // Target floor index
  let targetIndex = floorNames.findIndex((f) => f === targetFloor);

  if (currentIndex !== targetIndex) {
    running = setTimeout(
      () => advanceElevator(currentIndex, targetIndex),
      2000
    );
    console.log(running);
  }
}

function advanceElevator(cIndex, tIndex) {
  // Turn off active class on current active
  if (cIndex < tIndex) {
    floors[cIndex - 1].classList.remove("active");
    floors[cIndex].classList.add("active");
    currentFloor = bts[cIndex].id;
  } else {
    floors[cIndex - 1].classList.remove("active");
    floors[cIndex - 2].classList.add("active");
    currentFloor = bts[cIndex - 2].id;
  }
  runElevator();
}
