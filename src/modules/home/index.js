import {mapMutations, mapGetters} from "vuex";
import _ from 'lodash';

import {validationMixin} from 'vuelidate'
import {maxLength, required, url} from "vuelidate/lib/validators";



//sections

export default {
  name: "home",
  mixins: [validationMixin],
  components:{

  },
  data(){
    return{
      isImage: false,
      perPage: 9, // number of items to display
      pagination: {},
      block: {
        title: '',
        link: '',
        image: '',
        description: '',
      },
      preview: '',
      validationErrors: {},
    }
  },

  validations: {
    block: {
      title: {
        required,
        maxLength: maxLength(20),
      },
      description: {
        required,
        maxLength: maxLength(250),
      },
      link: {
        url,
        required,
      },
    },
  },


  created() {
    this.setPage(1);
  },
  computed:{
    ...mapGetters({
      blocks: `block/blocks`,
    }),
    collection() {
      return this.paginate(this.blocks);
    },


    titleError() {
      let str = this.block.title
      const ua = /[а-я]+/i.test(str);
      const en = /[a-z]+/i.test(str);
      const error = []
      if (!this.$v.block.title.$dirty) {
        return error
      }
      if (!this.$v.block.title.required) {
        error.push('Будь ласка, заповніть це поле')
      }
      if (!this.$v.block.title.maxLength) {
        error.push('Забагато символів'.replace(':count', 20))
      }
      if (str.length && (!(ua ^ en) || !ua )) {
        error.push('Тільки кирилиця');
      } 
        if (this.validationErrors.title) {
        this.validationErrors.title.forEach((row) => {
          error.push(row)
        })
        this.validationErrors = {}
      }
      return error
    },
    linkError() {
      const error = []
      if (!this.$v.block.link.$dirty) {
        return error
      }
      if (!this.$v.block.link.required) {
        error.push('Будь ласка, заповніть це поле')
      }
      if (!this.$v.block.link.url) {
        error.push('Введіть коректний url')
      }
      if (this.validationErrors.link) {
        this.validationErrors.link.forEach((row) => {
          error.push(row)
        })
        this.validationErrors = {}
      }
      return error
    },
    descriptionError() {
      let str = this.block.description
      const ua = /[а-я]+/i.test(str);
      const en = /[a-z]+/i.test(str);
      const error = []
      if (!this.$v.block.description.$dirty) {
        return error
      }
      if (!this.$v.block.description.required) {
        error.push('Будь ласка, заповніть це поле')
      }
      if (!this.$v.block.description.maxLength) {
        error.push('Забагато символів'.replace(':count', 250))
      }
      if (str.length && (!(ua ^ en) || !ua )) {
        error.push('Тільки кирилиця');
      } 
      if (this.validationErrors.description) {
        this.validationErrors.description.forEach((row) => {
          error.push(row)
        })
        this.validationErrors = {}
      }
      return error
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
    }),

    saveBlock() {
      this.$v.$touch();
      if (!this.$v.block.$invalid && this.isImage && !this.validationErrors.length) {
        this.addBlock(this.block)
        this.resetForm()
        this.$refs.form.reset();
      } else {
        this.$toasted.error('Перевірте форму')
      }
     
    },
    onImg(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      if (!file.type.match('image.*')) {
        this.isImage = false
      } else {
        this.isImage = true
      }
      reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        this.block.image = base64String;
      };
      reader.readAsDataURL(file);
    },
    resetForm() {
      this.block.title = ''
      this.block.link = ''
      this.block.description = ''
      this.block.image = ''
    },


    setPage(p) {
      this.pagination = this.paginator(this.blocks.length, p);
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
      this.perPage += this.perPage
      this.setPage(1)
    }
},
  
}
