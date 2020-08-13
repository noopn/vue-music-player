import * as types from './mutaion-type'
import {
  playMode
} from '@/assets/js/config'
const actions = {
  prev ({
    commit,
    state
  }, { load }) {
    const {
      mode,
      playList,
      currentIndex,
      songReady
    } = state

    if (songReady === false) return false

    if (mode === playMode.SEQUENCE) {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : playList.length - 1
      commit(types.SET_PLAY_INDEX, prevIndex)
    }
    if (mode === playMode.LOOP) {
      load()
    }
    if (mode === playMode.RANDOM) {
      const randomIndex = Math.floor(Math.random() * playList.length)
      commit(types.SET_PLAY_INDEX, randomIndex)
    }
  },
  next ({
    commit,
    state
  }, { load }) {
    const {
      mode,
      playList,
      currentIndex,
      songReady
    } = state

    if (songReady === false) return false

    if (mode === playMode.SEQUENCE) {
      const prevIndex = currentIndex === playList.length - 1 ? 0 : currentIndex + 1
      commit(types.SET_PLAY_INDEX, prevIndex)
    }
    if (mode === playMode.LOOP) {
      load()
    }
    if (mode === playMode.RANDOM) {
      const randomIndex = Math.floor(Math.random() * playList.length)
      commit(types.SET_PLAY_INDEX, randomIndex)
    }
  }
}

export default actions
