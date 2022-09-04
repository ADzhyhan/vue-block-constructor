<template>
  <div class="home">
    <div class="home-wrapper">
      <forma></forma>
    </div>
    <div class="content" v-if="collection.length">
      <div class="content-wrap">
        <div class="content-block" v-for="item in collection">
          <block :block="item"></block>
        </div>
      </div>
    </div>
    <div class="content-bottom" v-if="blocks.length > perPage">
      <div class="show-more" v-if="this.pagination.endIndex + 1 < blocks.length">
        <button @click="showMore()">Показати ще</button>
      </div>
      <div class="pagination">
        <div class="pagination-wrap">
          <button 
            class="pagination-btn" 
            v-for="p in pagination.pages" 
            @click.prevent="setPage(p)"
            ref="btn"
            >{{p}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./index.scss" lang="scss"></style>
<script src="./index.js">