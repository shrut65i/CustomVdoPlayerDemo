// script.js
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video");
    const videoThumbnail = document.getElementById("video-thumbnail");
    const playpause = document.getElementById("play-pause");
    const frwd = document.getElementById("skip-10");
    const bkwrd = document.getElementById("skipminus-10");
    const volume = document.getElementById("volume");
    const mutebtn = document.getElementById("mute");
    const controls = document.querySelector(".controls");
    const progressBar = document.querySelector(".progress-bar");
    const currentTimeRef = document.getElementById("current-time");
    const maxDuration = document.getElementById("max-duration");
    const fullscreenBtn = document.getElementById("fullscreen");

    const timeFormatter = (timeInput) => {
        let minute = Math.floor(timeInput / 60);
        minute = minute < 10 ? "0" + minute : minute;
        let second = Math.floor(timeInput % 60);
        second = second < 10 ? "0" + second : second;
        return `${minute}:${second}`;
    };

    const togglePlayPause = () => {
        if (video.paused || video.ended) {
            videoThumbnail.style.display = "none";
            video.play();
            playpause.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            video.pause();
            playpause.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    };

    const enterFullscreen = () => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    };

    playpause.addEventListener("click", togglePlayPause);
    video.addEventListener("click", togglePlayPause);

    document.addEventListener("keydown", (event) => {
        if (event.key === " " || event.key === "Spacebar") {
            event.preventDefault();
            togglePlayPause();
        }
    });

    video.addEventListener("play", () => {
        playpause.innerHTML = '<i class="fa-solid fa-pause"></i>';
    });

    video.addEventListener("pause", () => {
        playpause.innerHTML = '<i class="fa-solid fa-play"></i>';
    });

    video.addEventListener("timeupdate", () => {
        currentTimeRef.textContent = timeFormatter(video.currentTime);
        maxDuration.textContent = timeFormatter(video.duration);
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
    });

    frwd.addEventListener("click", () => {
        video.currentTime += 10;
    });

    bkwrd.addEventListener("click", () => {
        video.currentTime -= 10;
    });

    mutebtn.addEventListener("click", () => {
        video.muted = !video.muted;
        mutebtn.innerHTML = video.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fas fa-volume-up"></i>';
        volume.value = video.muted ? 0 : video.volume;
    });

    volume.addEventListener("input", () => {
        video.volume = volume.value;
        video.muted = false;
        mutebtn.innerHTML = volume.value == 0 ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fas fa-volume-up"></i>';
    });

    fullscreenBtn.addEventListener("click", enterFullscreen);

    video.addEventListener('loadedmetadata', () => {
        maxDuration.textContent = timeFormatter(video.duration);
    });

    videoThumbnail.addEventListener("click", () => {
        videoThumbnail.style.display = "none";
        video.play();
    });
});
