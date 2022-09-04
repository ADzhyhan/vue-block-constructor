import {mapMutations, mapGetters} from "vuex";



//sections

export default {
  name: "block",
  components:{

  },
  data(){
    return{
    }
  },
  props: {
    block: {
      type: Object,
      default: () => {}
    }

  },

  created() {
  },
  computed:{
    ...mapGetters({
      blocks: `block/blocks`,
    }),

  },
  watch: {
   
  },

  mounted() {

  },
  methods:{
    ...mapMutations({
      removeBlock: `block/REMOVE_BLOCK`,
    }),
  }
  
}
