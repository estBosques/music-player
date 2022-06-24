const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "song-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "song-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "song-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => {
  !isPlaying ? playSong() : pauseSong();
});

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Prev Song
function prevSong() {
  songIndex = songIndex === 0 ? songs.length - 1 : songIndex - 1;
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex = songIndex === songs.length - 1 ? 0 : songIndex + 1;
  loadSong(songs[songIndex]);
  playSong();
}

// On load - Select first song
loadSong(songs[songIndex]);

function parseTime(time) {
  // Calculate display for duration
  const timeMin = Math.floor(time / 60);
  let timeSec = Math.floor(time % 60);

  if (timeSec < 10) {
    timeSec = `0${timeSec}`;
  }

  return `${timeMin}:${timeSec}`;
}

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    if (duration) {
      // Update progress bar width
      const progessPercent = (currentTime / duration) * 100;
      progress.style.width = `${progessPercent}%`;

      // Update time text
      durationEl.textContent = parseTime(duration);
      currentTimeEl.textContent = parseTime(currentTime);
    }
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickPosition = e.offsetX;

  const { duration } = music;
  music.currentTime = (clickPosition / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
