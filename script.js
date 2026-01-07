
const play = document.getElementById("play");
const progressBar = document.getElementById("progressBar");
const audio = new Audio("Audio/1.mp3");
const nowBar = document.querySelector(".nav");

let currentSong = 1;


play.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    play.classList.replace("fa-circle-play", "fa-circle-pause");
  } else {
    audio.pause();
    play.classList.replace("fa-circle-pause", "fa-circle-play");
  }
});


audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background =
      `linear-gradient(to right, #177200ff ${progress}%, #333 ${progress}%)`;
  }
});

progressBar.addEventListener("input", function () {
  audio.currentTime = (this.value * audio.duration) / 100;
});


const playMusic = Array.from(document.getElementsByClassName("playMusic"));

function makeAllPlay() {
  playMusic.forEach(btn =>
    btn.classList.replace("fa-circle-pause", "fa-circle-play")
  );
}

playMusic.forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlay();

    const index = parseInt(e.target.id);
    currentSong = index;

    e.target.classList.replace("fa-circle-play", "fa-circle-pause");
    play.classList.replace("fa-circle-play", "fa-circle-pause");

    audio.src = order[currentSong - 1].songPath;
    audio.currentTime = 0;
    audio.play();

    updateNowBar();
  });
});


const songs = [
  { songName: "Song 1", songDes: "Desc 1", songImage: "Images/IMG1.jpg", songPath: "Audio/1.mp3" },
  { songName: "Song 2", songDes: "Desc 2", songImage: "Images/2.jpg", songPath: "Audio/2.mp3" },
  { songName: "Song 3", songDes: "Desc 3", songImage: "Images/3.jpg", songPath: "Audio/3.mp3" },
  { songName: "Song 4", songDes: "Desc 4", songImage: "Images/4.jpg", songPath: "Audio/4.mp3" },
  { songName: "Song 5", songDes: "Desc 5", songImage: "Images/IMG1.jpg", songPath: "Audio/5.mp3" },
  { songName: "Song 6", songDes: "Desc 6", songImage: "Images/3.jpg", songPath: "Audio/6.mp3" },
  { songName: "Song 7", songDes: "Desc 7", songImage: "Images/2.jpg", songPath: "Audio/7.mp3" },
  { songName: "Song 8", songDes: "Desc 8", songImage: "Images/3.jpg", songPath: "Audio/8.mp3" },
  { songName: "Song 9", songDes: "Desc 9", songImage: "Images/4.jpg", songPath: "Audio/9.mp3" },
  { songName: "Song 10", songDes: "Desc 10", songImage: "Images/IMG1.jpg", songPath: "Audio/10.mp3" },
  { songName: "Song 11", songDes: "Desc 11", songImage: "Images/2.jpg", songPath: "Audio/11.mp3" },
  { songName: "Song 12", songDes: "Desc 12", songImage: "Images/3.jpg", songPath: "Audio/12.mp3" },
  { songName: "Song 13", songDes: "Desc 13", songImage: "Images/4.jpg", songPath: "Audio/13.mp3" },
  { songName: "Song 14", songDes: "Desc 14", songImage: "Images/IMG1.jpg", songPath: "Audio/14.mp3" },
  { songName: "Song 15", songDes: "Desc 15", songImage: "Images/2.jpg", songPath: "Audio/15.mp3" },
  { songName: "Song 16", songDes: "Desc 16", songImage: "Images/3.jpg", songPath: "Audio/16.mp3" },
  { songName: "Song 17", songDes: "Desc 17", songImage: "Images/4.jpg", songPath: "Audio/17.mp3" },
  { songName: "Song 18", songDes: "Desc 18", songImage: "Images/IMG1.jpg", songPath: "Audio/18.mp3" },
];

let order = [...songs];


const shuffle = document.getElementById("shuffle");
const repeat = document.getElementById("repeat");

let songOnShuffle = false;
let songOnRepeat = false;


function shuffleSongs(list) {
  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

shuffle.addEventListener("click", () => {
  songOnShuffle = !songOnShuffle;
  songOnRepeat = false;

  shuffle.classList.toggle("active", songOnShuffle);
  repeat.classList.remove("active");

  order = songOnShuffle ? shuffleSongs(songs) : [...songs];
});

repeat.addEventListener("click", () => {
  songOnRepeat = !songOnRepeat;

  if (songOnRepeat) {
    songOnShuffle = false;
    shuffle.classList.remove("active");
  }

  repeat.classList.toggle("active", songOnRepeat);
});


function playNextSong() {
  if (songOnRepeat) {
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
    return;
  }

  currentSong++;
  if (currentSong > order.length) currentSong = 1;

  audio.src = order[currentSong - 1].songPath;
  audio.currentTime = 0;
  audio.play();
  updateNowBar();
}

function playPrevSong() {
  currentSong--;
  if (currentSong < 1) currentSong = order.length;

  audio.src = order[currentSong - 1].songPath;
  audio.currentTime = 0;
  audio.play();
  updateNowBar();
}


function updateNowBar() {
  nowBar.querySelector("img").src = order[currentSong - 1].songImage;
  nowBar.querySelector(".img-title").innerText = order[currentSong - 1].songName;
  nowBar.querySelector(".img-des-info").innerText = order[currentSong - 1].songDes;
}


const forward = document.getElementById("forward");
const backward = document.getElementById("backward");

forward.addEventListener("click", playNextSong);
backward.addEventListener("click", playPrevSong);
audio.addEventListener("ended", playNextSong);
