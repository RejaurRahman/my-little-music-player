const songCover = document.querySelector('img');
const songTitle = document.getElementById('playerTitle');
const artistTitle = document.getElementById('playerArtist');
const music = document.querySelector('audio');
const prevButton = document.getElementById('prevControl');
const nextButton = document.getElementById('nextControl');
const playButton = document.getElementById('playControl');

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

let isPlaying = false;

function playSong() {
  isPlaying = true;
  playButton.classList.replace('player__controls--play', 'player__controls--pause');
  playButton.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playButton.classList.replace('player__controls--pause', 'player__controls--play');
  playButton.setAttribute('title', 'Play');
  music.pause();
}

playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
  songTitle.textContent = song.songName;
  artistTitle.textContent = song.artist;
  music.src = `assets/music/${song.name}.mp3`;
  songCover.src = `assets/image/${song.cover}.jpg`;
}

loadSong(songs[0]);
