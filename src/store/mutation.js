import * as types from './mutaion-type'

const matutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SELECT_PLAY] (state, {
    playList,
    currentIndex,
    fullScreen
  }) {
    state.playList = playList
    state.currentIndex = currentIndex
    state.fullScreen = fullScreen
  },
  [types.SET_FULL_SCREEN] (state, fullScreen) {
    state.fullScreen = fullScreen
  },
  [types.SET_PLAYING_STATE] (state, playing) {
    state.playing = playing
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_PLAY_INDEX] (state, currentIndex) {
    state.currentIndex = currentIndex
  }

}

export default matutations
