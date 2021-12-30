let selectedAudio = document.getElementById('selectedId');
let music;
const player = document.getElementById('player');
let musicSelectId = document.getElementById('musicSelect');
let isAudioPlaying = false;
const playBtn = document.getElementById('playbtn');
const audioELement = document.getElementById('audioelement');
let tduration = document.getElementById('tDuration')
let crDuration = document.getElementById('crDuration')
const resetBtn = document.getElementById('resetBtn')
const muteBtn = document.getElementById('mutebtn');

window.addEventListener('load', () => {
    if (!selectedAudio.value) {
        player.style.display = 'none'
        musicSelectId.style.display = 'flex'
    } else {
        player.style.display = 'flex'
        musicSelectId.style.display = 'none'
    }
    selectedAudio.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            player.style.display = 'flex'
            music = e.target.files[0]
            musicSelectId.style.display = 'none';
            audioELement.src = URL.createObjectURL(music)
            document.getElementsByClassName('insidetrack')[0].style.width = `0%`
            setTimeout(() => {
                let minute = Math.floor(audioELement.duration / 60)
                let second = Math.floor(audioELement.duration - minute * 60)
                tduration.textContent = `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`
                crDuration.textContent = '00:00'
                document.getElementById('audioPlayerName').textContent = music.name
            }, 1000)
        } else {
            player.style.display = 'none'
            musicSelectId.style.display = 'flex'
        }
    });
    playBtn.addEventListener('click', () => {
        if (!isAudioPlaying) {
            audioELement.play();
            isAudioPlaying = true;
            playBtn.classList.remove('fa-play')
            playBtn.classList.add('fa-pause')
        } else {
            audioELement.pause();
            audioELement.addEventListener('pause', (e) => {
                let minute = Math.floor(e.target.currentTime / 60)
                let second = Math.floor(e.target.currentTime - minute * 60)
                crDuration.textContent = `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`
            })
            playBtn.classList.remove('fa-pause')
            playBtn.classList.add('fa-play')
            isAudioPlaying = false
        }
    });
    muteBtn.addEventListener('click', () => {
        if (muteBtn.classList.contains('fa-volume-up')) {
            muteBtn.classList.add('fa-volume-mute');
            muteBtn.classList.remove('fa-volume-up')
            audioELement.muted = true
        } else {
            muteBtn.classList.add('fa-volume-up')
            audioELement.muted = false
            muteBtn.classList.remove('fa-volume-mute')
        }
    })
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            audioELement.src = '';
            selectedAudio.value = ''
            player.style.display = 'none'
            musicSelectId.style.display = 'flex'
        })
    }
    if (audioELement) {
        audioELement.addEventListener('timeupdate', (e) => {
            const { currentTime, duration } = e.srcElement;
            let percentages = (currentTime / duration) * 100;
            document.getElementsByClassName('insidetrack')[0].style.width = `${percentages}%`
            let minute = Math.floor(currentTime / 60)
            let second = Math.floor(currentTime - minute * 60)
            crDuration.textContent = `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`
        })
        audioELement.addEventListener('ended', () => {
            crDuration.textContent = '00:00';
            playBtn.classList.remove('fa-pause');
            playBtn.classList.add('fa-play');
            isAudioPlaying = false;
        })
    }
    document.getElementsByClassName('track')[0].addEventListener('click', (e) => {
        audioELement.currentTime = Math.round((e.offsetX / e.clientX) * audioELement.duration)
    })
})