const tracks = [
  new Audio(window.location + "/assets/glass-of-wine-143532.mp3"),
  new Audio(window.location + "/assets/jazz-bossa-nova-163669.mp3"),
  new Audio(window.location + "/assets/yesterday-jazz-elevator-147660.mp3"),
  new Audio(window.location + "/assets/elevator-music-lofi-version-30s-10822.mp3"),
];

/* const tracks = [
    new Audio("../assets/t1.wav"),
    new Audio("../assets/t2.wav"),
  ]; */

const ding = new Audio(window.location + "../assets/t2.wav");

const playMuzak = document.getElementById("playMuzak");

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
let fading;
let muzak = false;
let muzakActive = true;
let currentTrackIndex = 0;

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
      runElevator();
    }
  });
}

playMuzak.addEventListener("change", () => {
  
  if(playMuzak.checked){
    console.log("Changed");
    fading = setInterval(fadeMusic, 100);    muzakActive = false
  } else {
    muzakActive = true;
  }
});

stopp.addEventListener("click", stopElevator);

function stopElevator() {
  clearTimeout(running);
  running = -1;
  //tracks[currentTrackIndex].pause();
  console.log(tracks[currentTrackIndex]);
  if (muzakActive) {
    ding.play();
  }

  fading = setInterval(fadeMusic, 100);
  console.log(tracks[currentTrackIndex].volume);
}

function fadeMusic() {
  if (tracks[currentTrackIndex].volume > 0.1) {
    tracks[currentTrackIndex].volume -= 0.1;
  } else {
    clearInterval(fading);
    tracks[currentTrackIndex].pause();

    muzak = false;
  }
}

function runElevator() {
  console.log(muzak);
  if (!muzak && muzakActive) {
    console.log("Selecting track");
    currentTrackIndex = Math.floor(Math.random() * tracks.length);
    tracks[currentTrackIndex].volume = 1;
    tracks[currentTrackIndex].play();
    muzak = true;
  }
  // Get current floor index
  let currentIndex = floorNames.findIndex((f) => f === currentFloor);
  // Target floor index
  let targetIndex = floorNames.findIndex((f) => f === targetFloor);

  if (currentIndex !== targetIndex) {
    running = setTimeout(
      () => advanceElevator(currentIndex, targetIndex),
      2000
    );
  } else {
    stopElevator();
  }
}

function advanceElevator(cIndex, tIndex) {
  if (tracks[currentTrackIndex].ended) {
    muzak = false;
  }
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
