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
  if (index === 0) url = 'https://isure.stream.qqmusic.qq.com/C400000gMAI843HNBa.m4a?guid=7842965224&vkey=32549FC5AB5AB8122DAE76634B45D80CDE421202A130C39CE0287E2D24B625114927EB4FAF9FE778DDB11BE9D4B741F03CB0D93DEE2C569C&uin=0&fromtag=66'
  if (index === 1) url = 'https://isure.stream.qqmusic.qq.com/C400001w25Mm4JwLgT.m4a?guid=7842965224&vkey=69E37E8F5DB5B06532861B9648CC36C707C58F5B124E9242C352A4110DF42D60003C2D2AC78BDD769EF9F7038BE787A2CFE23463F8B306C2&uin=0&fromtag=66'
  if (index === 2) url = 'https://isure.stream.qqmusic.qq.com/C400002r03ci2ubtmn.m4a?guid=7842965224&vkey=55DD67E10A5226B7D906EEDA64E15C712C4314054601DE5191D37D05EA9992B309D7B624E191687B8E4F9C705680BDBD560F6537F34577D3&uin=0&fromtag=66'
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
