/* eslint-disable no-plusplus */
const songCover = document.querySelector('img');
const songTitle = document.getElementById('playerTitle');
const artistTitle = document.getElementById('playerArtist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('playerProgress');
const currentSongTime = document.getElementById('currentTime');
const durationSongTime = document.getElementById('songTime');
const progressBar = document.getElementById('progressBar');
const prevButton = document.getElementById('prevControl');
const nextButton = document.getElementById('nextControl');
const playButton = document.getElementById('playControl');

// Music List
const songs = [
  {
    name: 'soft_speak-siarate',
    songName: 'soft speak',
    artist: 'siarate',
    cover: 'tower-fishing'
  },
  {
    name: 'on_a_clear_morning-sunfish_grove',
    songName: 'on a clear morning',
    artist: 'sunfish grove',
    cover: 'winter-trees'
  },
  {
    name: 'omnia-helmut_schenker',
    songName: 'omnia',
    artist: 'helmut schenker',
    cover: 'flowers-poppies'
  },
  {
    name: 'those_who_arrived-volcan_peaks',
    songName: 'those who arrived',
    artist: 'volcan peaks',
    cover: 'ocean-view'
  },
  {
    name: 'someone_like_me-velvet_moon',
    songName: 'someone like me',
    artist: 'velvet moon',
    cover: 'lake-forest'
  },
  {
    name: 'small_things_grow-view_points',
    songName: 'small things grow',
    artist: 'view points',
    cover: 'sky-cosmos'
  },
  {
    name: 'meadow-thoughts-cody-francis',
    songName: 'meadow thoughts',
    artist: 'cody francis',
    cover: 'swamp-trees'
  },
  {
    name: 'go-mode-instrumental-version-nbh',
    songName: 'go mode',
    artist: 'nbhd nick',
    cover: 'phone-wallpaper'
  }
];

// Check if song is playing
let isPlaying = false;

// Play function
const playSong = () => {
  isPlaying = true;
  playButton.classList.replace('player__controls--play', 'player__controls--pause');
  playButton.setAttribute('title', 'Pause');
  music.play();
};

// Pause function
const pauseSong = () => {
  isPlaying = false;
  playButton.classList.replace('player__controls--pause', 'player__controls--play');
  playButton.setAttribute('title', 'Play');
  music.pause();
};

// Play or Pause Toggling Event Listener
playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Loading Song whilst updating DOM
const loadSong = (song) => {
  songTitle.textContent = song.songName;
  artistTitle.textContent = song.artist;
  music.src = `assets/music/${song.name}.mp3`;
  songCover.src = `assets/image/${song.cover}.jpg`;
};

// Current song on list
let songIndex = 0;

// Previous song function
const prevSong = () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
};

// Next song function
const nextSong = () => {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
};

// On load select the first song to play
loadSong(songs[songIndex]);

// Update progress bar and current and duration time of song played
const updateProgressBar = (event) => {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;

    // Update progress bar width
    const progressPercentage = (currentTime / duration) * 100;

    progressBar.style.width = `${progressPercentage}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    // Delay switching duration element to avoid NaN
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Calculate display for current time of song
    if (durationSeconds) {
      durationSongTime.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    currentSongTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

// Set progress bar function
function setProgressBar(event) {
  const width = this.clientWidth;
  const clickedBar = event.offsetX;
  const { duration } = music;
  music.currentTime = clickedBar / width * duration;
}

// Event listeners
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
