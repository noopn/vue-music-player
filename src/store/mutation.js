import * as types from './mutaion-type'

const matutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}

export default matutations
