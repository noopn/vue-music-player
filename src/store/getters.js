
export const singer = state => state.singer

export const playList = state => state.playList

export const fullScreen = state => state.fullScreen

export const currentSong = state => {
  return state.playList[state.currentIndex] || {}
}
export const playing = state => state.playing

export const mode = state => state.mode

export const currentTime = state => state.currentTime
// export const songReady = state => state.songReady
