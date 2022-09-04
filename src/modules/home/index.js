import {mapMutations, mapGetters} from "vuex";
import _ from 'lodash';

import block from './components/block/index.vue'
import forma from './components/form/index.vue'

export default {
  name: "home",
  components:{
    block,
    forma,
  },
  data(){
    return{
      perPage: 1, // number of items to display
      pagination: {},
    }
  },
  
  created() {
    this.setPage(1);
  },

  computed:{
    ...mapGetters({
      blocks: `block/blocks`,
      currPage: `block/currPage`
    }),
    collection() {
      return this.paginate(this.blocks);
    },
  },

  watch: {
    blocks(newVal){
      if(newVal){
        this.setPage(1)
      }
    }
  },
  mounted() {
  },

  methods:{
    ...mapMutations({
      addBlock: `block/ADD_BLOCK`,
      removeBlock: `block/REMOVE_BLOCK`,
      changePage: `block/CHANGE_PAGE`,
    }),

    setPage(p) {
      this.pagination = this.paginator(this.blocks.length, p);
      this.changePage(p)      
      if(this.$refs.btn){
        this.$refs.btn.forEach((item) => {
          if(item.disabled) {
            item.disabled = false
          }
        })
      }
    },
    paginate(data) {
      return _.slice(data, this.pagination.startIndex, this.pagination.endIndex + 1)
    },
    paginator(totalItems, currentPage) {
      let startIndex = (currentPage - 1) * this.perPage,
      endIndex = Math.min(startIndex + this.perPage - 1, totalItems - 1);
      return {
        currentPage: currentPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: _.range(1, Math.ceil(totalItems / this.perPage) + 1)
      };
    },
    showMore(){
      this.pagination.endIndex += this.perPage
      this.pagination.currentPage++
      this.$refs.btn[this.currPage].disabled = true
      this.$refs.btn[this.pagination.currentPage-1].disabled = true
      this.$refs.btn[this.pagination.currentPage-2].disabled = true
    }
  },
}