const content = document.querySelector(".content"),
Playimage = content.querySelector(".music-image img"),
musicName = content.querySelector(".music-titles .name"),
musicArtist = content.querySelector(".music-titles .artist"),
Audio = document.querySelector(".main-song"),
playBtn = content.querySelector('.play-pause'),
playBtnIcn = content.querySelector('.play-pause span'),
prevBtn = content.querySelector('#prev'),
nextBtn = content.querySelector('#next'),
progressBar = content.querySelector('.progress-bar'),
progressDetails = content.querySelector('.progress-details'),
repeatBtn = content.querySelector('#repeat'),
shuffle = content.querySelector("#shuffle");

let index = 1;
let len = songs.length;

window.addEventListener("load", ()=>{
    loadData(index);
    //Audio.play();
  });

function loadData(indexValue){
  musicName.innerHTML= songs[indexValue - 1].name;
  musicArtist.innerHTML = songs[indexValue - 1].artist;
  Playimage.src = "image/"+songs[indexValue - 1].img+".jpg";
  Audio.src = "songs/"+songs[indexValue - 1].audio+".mp3";
}

playBtn.addEventListener('click', ()=>{
  const isMusicPause = playBtn.classList.contains('paused');
    if(isMusicPause === false){
      playSong();
    }
    else{
      pauseSong();
    }
});

let isMusicPlay = false;

function playSong(){
  playBtn.classList.add("paused");
  playBtnIcn.innerHTML = 'pause';
  Audio.play();
  isMusicPlay = true;
}

function pauseSong(){
  playBtn.classList.remove('paused');
  isMusicPause = false;
  playBtnIcn.innerHTML = "play_arrow";
  Audio.pause();
  isMusicPlay = false;
}

prevBtn.addEventListener('click', ()=>{
    prevSong();
});

nextBtn.addEventListener('click', ()=>{
  nextSong();
});

function prevSong(){
  index++;
  if(index > songs.length){
    index = 1;
  }
  else{
    index = index;
  }
  loadData(index);
  //progressBar.style.width = 0+'%';
  playSong();
}

function nextSong(){
  index--;
  if(index <= 0){
    index = songs.length;
  }
  else{
    index = index;
  }
  loadData(index);
  // progressBar.style.width = 0+'%';
  // playBtn.classList.add("paused");
  playSong();
}

Audio.addEventListener("timeupdate", (e)=>{
    //Get Current Music Time
    const currentTime = e.target.currentTime;
    //get Music duration (total time)
    const finalTime = e.target.duration;
    let barWidth = (currentTime / finalTime) * 100;

    // highlited progress bar on the behalf of duration
    progressBar.style.width = barWidth+'%';

    progressDetails.addEventListener('click', (e)=>{
      // Get the width of Progress Bar
      let progressValue = progressDetails.clientWidth;

      // Get the offset X value
      let clickedoffsetX = e.offsetX;

      // get total music duration
      let musicDuration = Audio.duration;

      Audio.currentTime = (clickedoffsetX / progressValue) * musicDuration;
    });

    // Music Time 
    Audio.addEventListener("loadeddata", ()=>{
      //get final time class present in html
      let finalTimeData = content.querySelector('.final');

      //update final time
      let AudioDuration = Audio.duration;

      // get Total minutes of song
      let totalMinute = Math.floor(AudioDuration / 60);

      // get total seconds after minutes of song
      let sec = Math.floor(AudioDuration%60);

      //update final time
      if(totalMinute < 10){
        totalMinute = '0'+totalMinute;
      }
      if(sec < 10){
        sec = '0' + sec;
      }
      finalTimeData.innerText = totalMinute + ":" + sec;
    });

    // Update Current Duration of song (Kitni der song chal chuka hai)
    let currentTimeData = content.querySelector('.current');
    let curTime = Audio.currentTime;
    let currentMinutes = Math.floor(curTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if(currentMinutes < 10){
      currentMinutes = '0' + currentMinutes;
    }

    if(currentSeconds < 10){
      currentSeconds = '0' + currentSeconds;
    }

    currentTimeData.innerText = currentMinutes + ':' + currentSeconds;

    // repeat button logic
    const isClickedRepeatBtn = false;
    repeatBtn.addEventListener('click',()=>{
          Audio.currentTime = 0;
          isClickedRepeatBtn = true;
    });


});

// Shuffle Button Logic
shuffle.addEventListener('click', ()=>{
    var randomIndex = Math.floor(Math.random() * songs.length) + 1;
    loadData(randomIndex);
    playSong();
});


// When one song finished automatically second song start
Audio.addEventListener('ended', ()=>{
  index++;
  if(index > songs.length){
    index = 1;
  }
  loadData(index);
  playSong(); 
});

// Create key logic

document.addEventListener('keyup', (e)=> {
  if (e.code === 'Space' && !isMusicPlay) {
      playSong();
  }
  else if (e.code === 'Space' && isMusicPlay) {
    pauseSong();
  }
});

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

   if (e.keyCode == '37') {
       prevSong();
    }
    else if (e.keyCode == '39') {
       nextSong();
    }

}


