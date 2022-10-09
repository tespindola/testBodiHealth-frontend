<template>
    <header>
        <Header />
    </header>
    <div class="container px-2 py-2 mx-auto w-full mt-4 md:mb-12">
        <RouterView />
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/layouts/Header.vue';
import {onMounted} from 'vue';
import { useStore } from 'vuex'

const store = useStore();

onMounted(async () => {
    if(localStorage.getItem('nameUser') && localStorage.getItem('token')){
        store.commit('setLogin', localStorage.getItem('nameUser'));
    }
});

</script>
