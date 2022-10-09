<template>
    <div class="md:flex md:items-center md:justify-between p-3 bg-white shadow-md">
        <div class="min-w-0 flex-1 items-center">
            <router-link to="/" class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Static News</router-link>
            <router-link v-if="validateLogin" to="/news/create" class="ml-3 rounded-full bg-cyan-600 px-2 py-0.5 text-md text-white">
                <span class="mr-1 font-medium">Crear noticia</span>
            </router-link>
            <router-link v-if="validateLogin" to="/user/create" class="ml-3 rounded-full bg-cyan-600 px-2 py-0.5 text-md text-white">
                <span class="mr-1 font-medium">Crear usuario</span>
            </router-link>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
            <router-link v-if="!validateLogin" to="/login" class="ml-3 cursor-pointer inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none">Iniciar Sesion</router-link>
            <h1 v-else class="text-lg font-bold">Bienvenido {{ nameUser }}</h1>
            <button v-if="validateLogin" @click="outLogin" class="ml-2 rounded-full bg-red-400 px-2 py-0.5 text-sm items-center text-white cursor-pointer">
                <span class="font-medium">Salir</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { computed } from 'vue';
import axios from '@/axiosConfig.js';

const router = useRouter();
const store = useStore();
const validateLogin = computed(() => store.state.login);
const nameUser = computed(() => store.state.nameUser);

const outLogin = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nameUser');
    store.commit('outLogin');
    axios.interceptors.request.use(config => {
        config.headers.Authorization = '';
        return config;
    });
    router.push({name: 'staticNews'});
};

</script>