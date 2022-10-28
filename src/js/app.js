const music = document.querySelector('audio');
const prevButton = document.getElementById('prevControl');
const nextButton = document.getElementById('nextControl');
const playButton = document.getElementById('playControl');

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
