<template>
  <div class="home">
    <div class="home-wrapper">
      <form action="" class="form" ref="form">
        <div class="form-wrapper">
          <div class="form__input-group" :class="titleError.length !== 0? 'error': 'valid'">
            <input 
              type="text"
              class="form__input" 
              id="title"
              @blur="$v.block.title.$touch()"
              required
              v-model.trim="block.title">
            <span class="form__bar"></span>
            <label class="form__label" for="title">Заголовок</label>
            <span class="validate-error" v-for="(item, index) in titleError" :key="index">{{ item }}</span>
          </div>
          <div class="form__input-group file" :class="imageError.length !== 0? 'error': 'valid'">
            <label>
              <input 
              type="file" 
              id="filen"
              
              @change="onImg($event)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M20,6.52897986 L20,19.5010024 C20,20.8817143 18.8807119,22.0010024 17.5,22.0010024 L6.5,22.0010024 C5.11928813,22.0010024 4,20.8817143 4,19.5010024 L4,4.50100238 C4,3.1202905 5.11928813,2.00100238 6.5,2.00100238 L15.4720225,2.00100238 C15.6047688,1.99258291 15.7429463,2.03684187 15.8535534,2.14744899 L19.8535534,6.14744899 C19.9641605,6.25805611 20.0084195,6.39623363 20,6.52897986 Z M15,3.00100238 L6.5,3.00100238 C5.67157288,3.00100238 5,3.67257525 5,4.50100238 L5,19.5010024 C5,20.3294295 5.67157288,21.0010024 6.5,21.0010024 L17.5,21.0010024 C18.3284271,21.0010024 19,20.3294295 19,19.5010024 L19,7.00100238 L15.5,7.00100238 C15.2238576,7.00100238 15,6.77714475 15,6.50100238 L15,3.00100238 Z M16,3.70810916 L16,6.00100238 L18.2928932,6.00100238 L16,3.70810916 Z M12,10.7071068 L12,17.5 C12,17.7761424 11.7761424,18 11.5,18 C11.2238576,18 11,17.7761424 11,17.5 L11,10.7071068 L8.85355339,12.8535534 C8.65829124,13.0488155 8.34170876,13.0488155 8.14644661,12.8535534 C7.95118446,12.6582912 7.95118446,12.3417088 8.14644661,12.1464466 L11.1464466,9.14644661 C11.3417088,8.95118446 11.6582912,8.95118446 11.8535534,9.14644661 L14.8535534,12.1464466 C15.0488155,12.3417088 15.0488155,12.6582912 14.8535534,12.8535534 C14.6582912,13.0488155 14.3417088,13.0488155 14.1464466,12.8535534 L12,10.7071068 Z" fill="#ffffff"/>
              </svg>
              <div class="preview" v-if="this.block.image.length">
                <img :src="'data:image/png;base64,' + this.block.image"  alt="">
              </div>
              
            </label>
            <span class="validate-error" v-for="(item, index) in imageError" :key="index">{{ item }}</span>
          </div>
          <div class="form__input-group" :class="linkError.length !== 0? 'error': 'valid'">
            <input 
              type="text"
              class="form__input" 
              id="link"
              @blur="$v.block.link.$touch()"
              required
              v-model="block.link">
            <span class="form__bar"></span>
            <label class="form__label" for="link">URL</label>
            <span class="validate-error" v-for="(item, index) in linkError" :key="index">{{ item }}</span>
          </div>
          <div class="form__input-textarea" :class="descriptionError.length !== 0? 'error': 'valid'">
            <textarea 
              placeholder="Текст"
              v-model.trim="block.description"
              @blur="$v.block.description.$touch()"></textarea>
              <span class="validate-error" v-for="(item, index) in descriptionError" :key="index">{{ item }}</span>
          </div>
          <button class="form__button" @click.prevent="saveBlock()">Create</button>
        </div>
      </form>
    </div>
    <div class="content">
      <div class="content-wrap">
        <div class="content-block" v-for="item in collection">
          <div class="content-block__wrap">
            <a :href="item.link" target="_blank" class="content-block__link">
              <div class="content-block__img">
                <img :src="'data:image/png;base64,' + item.image" alt="">
              </div>
              <h1 class="content-block__title">{{item.title}}</h1>
              <p class="content-block__descr">{{item.description}}</p>
              <div class="content-block__del">
                <svg @click.prevent="removeBlock(item)" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.5 23.75C22.5 24.7446 22.1049 25.6984 21.4017 26.4017C20.6984 27.1049 19.7446 27.5 18.75 27.5H10C9.00544 27.5 8.05161 27.1049 7.34835 26.4017C6.64509 25.6984 6.25 24.7446 6.25 23.75V8.75H5V5H10.625L11.875 3.75H16.875L18.125 5H23.75V8.75H22.5V23.75ZM7.5 8.75V23.75C7.5 24.413 7.76339 25.0489 8.23223 25.5178C8.70107 25.9866 9.33696 26.25 10 26.25H18.75C19.413 26.25 20.0489 25.9866 20.5178 25.5178C20.9866 25.0489 21.25 24.413 21.25 23.75V8.75H7.5ZM22.5 7.5V6.25H17.5L16.25 5H12.5L11.25 6.25H6.25V7.5H22.5ZM10 11.25H11.25V23.75H10V11.25ZM17.5 11.25H18.75V23.75H17.5V11.25Z" fill="red"/>
                </svg>
              </div>
            </a>
          </div> 
        </div>
      </div>
    </div>

    <div class="show-more" v-if="perPage < blocks.length">
      <button @click="showMore()">Завантажити ще</button>
    </div>
    
    <div class="pagination">
      <div class="pagination-wrap">
        <button class="pagination-btn" v-for="p in pagination.pages" @click.prevent="setPage(p)">{{p}}</button>
      </div>
    </div>
  </div>
  
</template>
<style src="./index.scss" lang="scss"></style>
<script src="./index.js"></script>
