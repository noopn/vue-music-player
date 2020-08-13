import {
  playMode
} from '@/assets/js/config'

const state = {
  singer: {},
  playList: [],
  currentIndex: -1,
  fullScreen: false,
  playing: false,
  mode: playMode.SEQUENCE,
  currentTime: 0,
  songReady: false
}

export default state
