var progressBar = document.querySelector(".progress-bar");
var progress = document.querySelector(".progress");
var progressDot = progress.querySelector("span");
var progressBarWidth = progressBar.clientWidth;
var cdThumb = document.querySelector(".cd-thumb");
var currentIndex = 0;
var isDrag = false;
var initialClientX = 0;
var moveDot;
var timeLapseSong;
var initialRate = 0;
var rate;
var previewTime = 0;
var audio = document.querySelector(".audio");
var currentTimeEl = progressBar.previousElementSibling;
var durationTimeEl = progressBar.nextElementSibling;
var playBtn = document.querySelector(".play-btn");
var playIcon = `<i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;
var timerPreview = document.querySelector(".timer-preview");
var playlist = document.querySelector(".playlist");
var btnKaraoke = document.querySelector(".btn.btn-karaoke");
var screenKaraoke = document.querySelector(".karaoke");
var closeKaraoke = document.querySelector(".karaoke .close");
var songLyric = screenKaraoke.querySelector(".karaoke-inner");
var cdThumbAnimate;

var lyric = JSON.parse(lyric);
console.log(lyric);

const songs = [
  {
    name: "Thu cuối",
    singer: "Mr.T",
    path: "./assets/music/thucuoi.mp3",
    image: "./assets/img/song6.jpg",
  },
  {
    name: "Bên Em",
    singer: "No name1",
    path: "./assets/music/benem.mp3",
    image: "./assets/img/song1.jpg",
  },
  {
    name: "Cà phê",
    singer: "No name2",
    path: "./assets/music/caphe.mp3",
    image: "./assets/img/song2.jpg",
  },
  {
    name: "Chạy ngay đi",
    singer: "No name3",
    path: "./assets/music/chayngaydi.mp3",
    image: "./assets/img/song3.jpg",
  },
  {
    name: "Đưa em đi khắp thế gian",
    singer: "No name4",
    path: "./assets/music/duaemdikhapthegian.mp3",
    image: "./assets/img/song4.jpg",
  },
  {
    name: "Sau tất cả",
    singer: "No name5",
    path: "./assets/music/sautatca.mp3",
    image: "./assets/img/song5.jpg",
  },
];
const htmls = songs.map((song, index) => {
  return `<div class="song ${
    index === currentIndex ? "active" : ""
  }" data-index="${index}">
        <div class="thumb" style="background-image: url('${song.image}')">
        </div>
        <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
        </div>
        <div class="option">
            <i class="fas fa-ellipsis-h"></i>
        </div>
    </div>`;
});
playlist.innerHTML = htmls.join("");

// Hiển thị lời bài hát
function playLyric() {
  var currentTime = Math.floor(audio.currentTime * 1000);

  // Tìm câu hiện tại
  var currentSentence = null;
  for (var i = 0; i < lyric.data.sentences.length; i++) {
    var sentence = lyric.data.sentences[i];
    for (var j = 0; j < sentence.words.length; j++) {
      var word = sentence.words[j];
      if (currentTime >= word.startTime && currentTime <= word.endTime) {
        currentSentence = sentence;
        break;
      }
    }
    if (currentSentence) {
      break;
    }
  }

  if (currentSentence) {
    var currentLyric = currentSentence.words
      .map(function (word) {
        return word.data;
      })
      .join(" ");

    songLyric.querySelector("span").textContent = currentLyric;
  }
}

var getTime = function (seconds) {
  var min = Math.floor(seconds / 60);
  var seconds = Math.floor(seconds - min * 60);
  return `${min < 10 ? "0" + min : min}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};
var playItems = playlist.querySelectorAll(".song");
playItems.forEach(function (playItem, index) {
  playItem.addEventListener("click", function (e) {
    if (currentIndex !== index) {
      playItems[currentIndex].classList.remove("active");
      currentIndex = index;
      document.querySelector("header h2").textContent =
        songs[currentIndex].name;
      cdThumb.style.backgroundImage = `url(${songs[currentIndex].image})`;
      audio.src = songs[currentIndex].path;
      this.classList.add("active");
      renderLyric();
      audio.play();
      playBtn.innerHTML = pauseIcon;
      if (!cdThumbAnimate) {
        cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
          duration: 10000,
          iterations: Infinity,
        });
      } else {
        cdThumbAnimate.play();
      }
    } else {
      audio.pause();
      playBtn.innerHTML = playIcon;
      cdThumbAnimate.pause();
    }
  });
});

progressBar.addEventListener("mouseout", function (e) {
  timerPreview.style.display = "none";
  timerPreview.textContent = 0;
  timerPreview.style.left = 0;
});

progressBar.addEventListener("mousemove", function (e) {
  timerPreview.style.display = "block";
  rate = (e.offsetX / progressBarWidth) * 100;
  previewTime = (rate / 100) * audio.duration;
  timerPreview.style.left = `${rate}%`;
  timerPreview.textContent = getTime(previewTime);
});

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    rate = (e.offsetX / progressBarWidth) * 100;
    progress.style.width = `${rate}%
  `;
    initialRate = rate;
    isDrag = true;
    initialClientX = e.clientX;
    timeLapseSong = (rate / 100) * audio.duration;
  }
});

progressDot.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  if (e.which === 1) {
    isDrag = true;
    initialClientX = e.clientX;
  }
});

progressDot.addEventListener("mousemove", function (e) {
  e.stopPropagation();
});

document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    moveDot = e.clientX - initialClientX;
    rate = (moveDot * 100) / progressBarWidth + initialRate;
    timerPreview.style.display = "none";
    if (rate < 0) {
      rate = 0;
    }
    if (rate > 100) {
      rate = 100;
    }

    progress.style.width = `${rate}%`;
    timeLapseSong = (rate / 100) * audio.duration;
    currentTimeEl.innerHTML = getTime(timeLapseSong);
  }
});
document.addEventListener("mouseup", function (e) {
  if (isDrag) {
    isDrag = false;
    initialRate = rate;
    audio.currentTime = timeLapseSong;
  }
});

audio.addEventListener("loadeddata", function (e) {
  durationTimeEl.innerHTML = getTime(audio.duration);
});

audio.addEventListener("timeupdate", function (e) {
  rate = (this.currentTime * 100) / this.duration;
  if (!isDrag) {
    currentTimeEl.innerHTML = getTime(this.currentTime);
    progress.style.width = `${rate}%`;
    timeLapseSong = this.currentTime;
    playLyric();
  }
});

audio.addEventListener("ended", function (e) {
  progress.style.width = 0;
  this.currentTime = 0;
  timeLapseSong = 0;
  playBtn.innerHTML = playIcon;
  cdThumbAnimate.pause();
  songLyric.textContent = "";
});

playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    if (!cdThumbAnimate) {
      cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
        duration: 10000,
        iterations: Infinity,
      });
    } else {
      cdThumbAnimate.play();
    }
    this.innerHTML = pauseIcon;
    renderLyric();
  } else {
    audio.pause();
    cdThumbAnimate.pause();
    this.innerHTML = playIcon;
  }
});

function renderLyric() {
  var currentSong = songs[currentIndex];
  if (currentSong) {
    var infoSong = `${currentSong.name} - ${currentSong.singer}`;
    var spanLyric = songLyric.querySelector("span");

    if (songLyric.querySelector("span") === null) {
      var spanLyric = document.createElement("span");
      songLyric.appendChild(spanLyric);
    }

    spanLyric.textContent = infoSong;
  }
}

btnKaraoke.addEventListener("click", function () {
  screenKaraoke.classList.add("show");
});
closeKaraoke.addEventListener("click", function () {
  screenKaraoke.classList.remove("show");
});
