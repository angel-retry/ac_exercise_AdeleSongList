// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://lyric-api-403c0.firebaseio.com/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
const album = {
  artist: 'Adele',
  album: '25',
  tracks: [
    'Hello',
    'Send My Love (To Your New Lover)',
    'I Miss You',
    'When We Were Young',
    'Remedy',
    'Water Under the Bridge',
    'River Lea',
    'Love in the Dark',
    'Million Years Ago',
    'All I Ask',
    'Sweetest Devotion'
  ]
}

// WRITE YOUR CODE ////////////////////////

//顯示左邊歌單
album.tracks.forEach(track => { //使用fotEach撈出album.tracks裡的items(track)
  //於songList的HTML裡加上每個items(track)
  songList.innerHTML += `
  <li class="nav-item ">
    <a class="nav-link " href="#">${track}</a>
  </li>
  `
})

//按下歌名跳出歌詞，songList為監聽器
songList.addEventListener('click', e => {
  //設置滑鼠偵測到的目標為songListItem
  const songListItem = e.target

  //按下songListItem會執行if裡面的指令
  if (songListItem) {

    //做出 pill 效果，因會遇到每項songListItem會加上active屬性，要清掉已出現active屬性
    const activeSongListItem = document.querySelector('.active') //撈出有active的item
    if (activeSongListItem) { //當有active項目時清掉active
      activeSongListItem.classList.remove('active')
    }
    songListItem.classList.add('active') //選到的歌名加上active

    //送出api要求回傳歌詞
    const songTitle = songListItem.innerHTML //撈出歌名
    axios.get(BASE_URL + `${album.artist}/${songTitle}.json`) //傳送api
      .then(function (response) {
        // handle success
        const lyrics = response.data.lyrics //將接收到的歌詞設立一個變數
        console.log(lyrics)
        lyricsPanel.innerHTML = //新增歌詞面的內容，pre有換行的效果
          `
          <h3>${songTitle}</h3>
          <pre>${lyrics}</pre> 
        `
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
})