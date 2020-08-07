// import {
//   getLyric
// } from 'api/song'
// import {
//   ERR_OK
// } from 'api/config'
// import {
//   Base64
// } from 'js-base64'

export default class Song {
  constructor ({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    image,
    url
  }) {
    this.id = id
    this.mid = mid
    this.singer = singer // 歌手
    this.name = name // 歌名
    this.album = album // 专辑
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong (musicData, index) { // 是对歌手详情页数据的封装处理
  let url = ''
  if (index === 0) url = 'https://isure.stream.qqmusic.qq.com/C400000Z8FqM0Smg6G.m4a?guid=7842965224&vkey=40FECE8A112A6701637AA6D8FA6363EA6AE9E9BD1E80EA7BB04FC9960F5D83BCE08E7EB1A4DFDF202F366AF68A1DBC3E4ABBF91DECB61F49&uin=0&fromtag=66'
  if (index === 1) url = 'https://isure.stream.qqmusic.qq.com/C400002WJzLf25Tsgd.m4a?guid=7842965224&vkey=C71601C66F491D836C93BF448CAFD75FE6F9F161E33403B1F11DF09F1AAD9B1C556477F266C771FAD1D9C1B4D0CDA277AAF80E5DD3673917&uin=0&fromtag=66'
  if (index === 2) url = 'https://isure.stream.qqmusic.qq.com/C400002r03ci2ubtmn.m4a?guid=7842965224&vkey=F6CC7D70F5C1BDA2A87F3389A538C8CD1155226BC525F335E1D2231C9E2F5C002991097F35A39664C859A549ADEDBE788A5A652FAFF3FDBC&uin=0&fromtag=66'
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=&guid=1472133172&uin=0&fromtag=66`
    url
  })
}

function filterSinger (singer) {
  const ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export function songUrl (vkey, mid) {
  var url = `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?vkey=${vkey}&guid=1472133172&uin=0&fromtag=66`
  // `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400004IsqcS2BilGv.m4a?guid=5802445895&vkey=&uin=0&fromtag=38
  return url
}

export function recomSongList (res) {
  res = res.replace(/jsonCallback/, '')
  res = res.replace(/\(/g, ' ')
  res = res.replace(/\)/g, ' ')
  return JSON.parse(res)
}
