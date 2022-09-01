import Vue from 'vue';
import {
  ADD_BLOCK,
  REMOVE_BLOCK
} from '../mutation-types';
// import {} from '../action-types';

function save() {
  const parsed = JSON.stringify(state.blocks);
  localStorage.setItem('blocks', parsed);
}


const state = {
  blocks: localStorage.getItem('blocks') ? JSON.parse(localStorage.getItem('blocks')) : [],

};

const getters = {
  blocks: state => state.blocks || [],
};

const actions = {
 
};

const mutations = {
  [ADD_BLOCK](state, obj) {
    const block = {
      title: obj.title, 
      image: obj.image,
      link: obj.link, 
      description: obj.description
    }
    state.blocks.push(block)
    save();
    console.log(state.blocks)
    return
  },
  [REMOVE_BLOCK](state, obj) {
    const element = state.blocks.findIndex(e => e.title === obj.title);
    Vue.delete(state.blocks, element)
    save();
  },
  // [ADD_ITEM_TO_FAVOURITES](state, obj) {
  //   if (!state.favourites.length) {
  //     obj.selectCount = 1
  //     state.favourites.push(obj);
  //     saver();
  //     return;
  //   }
  //   const list = state.favourites.filter(e => e.id === obj.id)
  //   if (list.length) {
  //     const item = state.favourites.find(e => e.id === obj.id);
  //     if(item){
  //       const index = state.favourites.findIndex(e => e.id === obj.id);
  //       obj.selectCount = state.favourites[index].selectCount + 1
  //       Vue.set(state.favourites, index , obj)
  //     }else{
  //       obj.selectCount = 1
  //       state.favourites.push(obj);
  //     }
  //   } else {
  //     obj.selectCount = 1
  //     state.favourites.push(obj);
  //   }
  //   saver();
  // },
  // [REMOVE_ITEM_FROM_FAVOURITES](state, obj) {
  //   const index = state.favourites.findIndex(e => e.id === obj.id);
  //   Vue.delete(state.favourites, index)
  //   saver();
  // },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
