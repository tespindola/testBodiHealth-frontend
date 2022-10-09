<template>
    <div class="w-full flex justify-center">
        <div class="w-1/2 bg-white p-8 overflow-visible border border-gray-200 sm:rounded-lg shadow-md">
            <h1 class="text-md font-medium text-center">Iniciar sesion</h1>
            <div class="w-full pt-5">
                <label for="email" class="block text-md font-medium text-gray-700">Email</label>
                <div class="relative mt-1 rounded-md shadow-sm">
                    <input type="email" v-model="email" name="email" id="email" class="block w-full rounded-md border border-gray-100 pl-2 focus:outline-none text-lg" placeholder="Email" aria-invalid="true" aria-describedby="email-error">
                </div>
            </div>
            <div class="w-full pt-5">
                <label for="password" class="block text-md font-medium text-gray-700">Contraseña</label>
                <div class="relative mt-1 rounded-md shadow-sm">
                    <input type="password" v-model="password" name="password" id="password" class="block w-full rounded-md border border-gray-100 pl-2 focus:outline-none text-lg" placeholder="Contraseña" aria-invalid="true" aria-describedby="password-error">
                </div>
            </div>
            <div class="mt-5">
                <div v-if="!validate" class="rounded-md bg-red-50 p-4 mb-3">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <!-- Heroicon name: mini/x-circle -->
                            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">Error al iniciar sesion, revisar credenciales</h3>
                        </div>
                    </div>
                </div>
                <div v-if="loading" class="grid grid-cols-1 items-center">
                    <div class="-mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" class="w-20 h-20" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" r="18" stroke-width="5" stroke="#1d6472" stroke-dasharray="28.274333882308138 28.274333882308138" fill="none" stroke-linecap="round">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.0204081632653061s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                            </circle>
                        </svg>
                    </div>
                    <h4 class="text-center text-xl font-medium">Cargando...</h4>
                </div>
                <button v-else @click="login" class="block w-full items-center rounded-md border-2 border-cyan-700 bg-white px-4 py-2 text-base font-medium text-cyan-700 shadow-sm hover:bg-cyan-50 focus:outline-none focus:cyan-2 focus:cyan-indigo-500 focus:cyan-offset-2">Iniciar sesion</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from '@/axiosConfig.js';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter();
const store = useStore();
const email = ref('');
const password = ref('');
const loading = ref(false);
const validate = ref(true);

const login = async () => {
    loading.value = true;
    try {
        let res = await axios.post('api/login', {
            email: email.value,
            password: password.value
        });
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('nameUser', res.data.user.name);
        store.commit('setLogin', res.data.user.name);
        axios.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${res.data.access_token} `;
            return config;
        });
        router.push({name: 'staticNews'});
    } catch (error) {
        validate.value = false;
    }
    loading.value = false;
};

</script>