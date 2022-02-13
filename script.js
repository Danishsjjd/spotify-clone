console.log("welcome to Spotify");
let songindex = 0;
let audio = new Audio("songs/1.mp3");
let replace = Array.from(document.getElementsByClassName("songrec"));
let gif = document.getElementById("gif");
let btitle = document.getElementById("updatetitle");
let next = document.getElementById("next");
let progress = document.getElementById("progresshere");
let danishhere = document.getElementsByClassName("danish");

let play = document.getElementById("play");
let songs = [
	{
		songName: "Ballpoint - Walk Slowly",
		filePath: "songs/1.mp3",
		cover: "img/covers/1.jpg",
		time: "2:17",
	},
	{
		songName: "JONY, HammAli & Navai - Без тебя я не я",
		filePath: "songs/2.mp3",
		cover: "img/covers/2.jpg",
		time: "3:21",
	},
	{
		songName: "UpsideDown - Wut Wut",
		filePath: "songs/3.mp3",
		cover: "img/covers/3.jpg",
		time: "2:19",
	},
	{
		songName: "DJ Trac - Shaab _Justice League",
		filePath: "songs/4.mp3",
		cover: "img/covers/4.jpg",
		time: "2:16",
	},
	{
		songName: "Cheel _ Violet Vape",
		filePath: "songs/5.mp3",
		cover: "img/covers/5.jpg",
		time: "3:01",
	},
];

btitle.innerHTML = songs[songindex].songName;

replace.forEach((element, i) => {
	element.getElementsByTagName("img")[0].src = songs[i].cover;
	element.getElementsByTagName("span")[0].innerHTML = songs[i].songName;
	element.getElementsByClassName("songTime")[0].innerHTML = songs[i].time;
});

function removePauseIcon() {
	for (element of danishhere) {
		element.classList.add("fa-play-circle");
		element.classList.remove("fa-pause-circle");
	}
}

function playhere() {
	play.classList.add("fa-pause-circle");
	play.classList.remove("fa-play-circle");
	gif.style.opacity = "1";
	audio.play();
}
function pausehere() {
	play.classList.remove("fa-pause-circle");
	play.classList.add("fa-play-circle");
	gif.style.opacity = "0";
	audio.pause();
	removePauseIcon();
}

audio.addEventListener("timeupdate", () => {
	progress.value = (audio.currentTime / audio.duration) * 100;
});
progress.addEventListener("change", () => {
	audio.currentTime = (progress.value * audio.duration) / 100;
});
play.addEventListener("click", () => {
	if (audio.paused || audio.currentTime <= 0) {
		playhere();
		danishhere[songindex].classList.add("fa-pause-circle");
		danishhere[songindex].classList.remove("fa-play-circle");
	} else {
		pausehere();
	}
});
let finalSongName; // for remember last song
Array.from(document.getElementsByClassName("danish")).forEach(
	(element, index) => {
		element.addEventListener("click", (d, i = index) => {
			if (element.classList.contains("fa-pause-circle")) {
				pausehere();
				return;
			}
			songindex = i;
            finalSongName = songs[i].songName
			if (btitle.innerHTML != finalSongName) {
				audio.src = `songs/${songindex + 1}.mp3`;
                btitle.innerHTML = finalSongName;
			}
			playhere();
			removePauseIcon();
			d.target.classList.remove("fa-play-circle");
			d.target.classList.add("fa-pause-circle");
		});
	}
);
next.addEventListener("click", () => {
	if (songindex >= 4) {
		songindex = 0;
	} else {
		songindex += 1;
	}
	audio.src = `songs/${songindex + 1}.mp3`;
	audio.currentTime = 0;
	playhere();
	removePauseIcon();
	btitle.innerHTML = songs[songindex].songName;
	danishhere[songindex].classList.add("fa-pause-circle");
	danishhere[songindex].classList.remove("fa-play-circle");
});
back.addEventListener("click", () => {
	if (songindex <= 0) {
		songindex = 0;
	} else {
		songindex -= 1;
	}
	audio.src = `songs/${songindex + 1}.mp3`;
	audio.currentTime = 0;
	btitle.innerHTML = songs[songindex].songName;
	playhere();
	removePauseIcon();
	danishhere[songindex].classList.add("fa-pause-circle");
	danishhere[songindex].classList.remove("fa-play-circle");
});

audio.addEventListener("ended", () => {
	if (songindex >= 4) {
		songindex = 0;
	} else {
		songindex += 1;
	}
	audio.src = `songs/${songindex + 1}.mp3`;
	audio.currentTime = 0;
	btitle.innerHTML = songs[songindex].songName;
	playhere();
	removePauseIcon();
	danishhere[songindex].classList.add("fa-pause-circle");
	danishhere[songindex].classList.remove("fa-play-circle");
});
