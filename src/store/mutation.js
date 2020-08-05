import * as types from './mutaion-type'

const matutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYLIST] (state, { playList, currentIndex }) {
    state.playList = playList
    state.currentIndex = currentIndex
  },
  [types.SET_FULL_SCREEN] (state, fullScreen) {
    state.fullScreen = fullScreen
  }
}

export default matutations
