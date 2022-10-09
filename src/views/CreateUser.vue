<template>
    <div class="w-full flex justify-center">
        <div class="w-1/2 bg-white p-8 overflow-visible border border-gray-200 sm:rounded-lg shadow-md">
            <h1 class="text-md font-medium text-center">Crear usuario</h1>
            <form>
                <div class="w-full pt-5">
                    <label for="name" class="block text-md font-medium text-gray-700">Nombre</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <input type="text" v-model="name" name="name" id="name" class="block w-full rounded-md border border-gray-100 pl-2 focus:outline-none text-lg" placeholder="Nombre" aria-invalid="true" aria-describedby="email-error">
                    </div>
                    <p v-if="!validate && !name.length" class="mt-2 text-sm text-red-600" id="email-error">Debe ingresar un nombre</p>
                </div>
                <div class="w-full pt-5">
                    <label for="email" class="block text-md font-medium text-gray-700">Email</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <input type="email" v-model="email" name="email" id="email" class="block w-full rounded-md border border-gray-100 pl-2 focus:outline-none text-lg" placeholder="Email" aria-invalid="true" aria-describedby="email-error">
                    </div>
                    <p v-if="!validate && !email.length" class="mt-2 text-sm text-red-600" id="email-error">Debe ingresar un email</p>
                </div>
                <div class="w-full pt-5">
                    <label for="password" class="block text-md font-medium text-gray-700">Contraseña</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <input type="password" v-model="password" name="password" id="password" class="block w-full rounded-md border border-gray-100 pl-2 focus:outline-none text-lg" placeholder="Contraseña" aria-invalid="true" aria-describedby="password-error">
                    </div>
                    <p v-if="!validate && !password.length" class="mt-2 text-sm text-red-600" id="email-error">Debe ingresar una contraseña</p>
                </div>
                <div class="w-full pt-5">
                    <label for="password_confirmation" class="block text-md font-medium text-gray-700">Confirmar contraseña</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <input type="password" v-model="passwordConfirmed" name="password_confirmation" id="password_confirmation" class="block w-full rounded-md border border-gray-100 pl-2 focus:outline-none text-lg" placeholder="Confirmar contraseña" aria-invalid="true" aria-describedby="password-error">
                    </div>
                    <p v-if="!validate && (!passwordConfirmed.length || password != passwordConfirmed)" class="mt-2 text-sm text-red-600" id="email-error">Debe coincidir con la contraseña</p>
                </div>
            </form>
            <div class="mt-5">
                <div class="rounded-md bg-red-50 p-4 mb-3" v-if="error">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">{{error.message}}</h3>
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
                <button v-else @click="storeUser" class="block w-full items-center rounded-md border-2 border-cyan-700 bg-white px-4 py-2 text-base font-medium text-cyan-700 shadow-sm hover:bg-cyan-50 focus:outline-none focus:cyan-2 focus:cyan-indigo-500 focus:cyan-offset-2">Crear</button>
            </div>
        </div>
    </div>
    <!-- Global notification live region, render this permanently at the end of the document -->
    <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="alert" aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                <div class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div class="p-4">
                        <div class="flex items-start">
                            <div class="flex-shrink-0">
                                <!-- Heroicon name: outline/check-circle -->
                                <svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="ml-3 w-0 flex-1 pt-0.5">
                                <p class="text-sm font-medium text-gray-900">Noticia creada</p>
                                <p class="mt-1 text-sm text-gray-500">Se creo correctamente la noticia.</p>
                            </div>
                            <div class="ml-4 flex flex-shrink-0">
                                <button type="button" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2" @click="closeAlert">
                                    <span class="sr-only">Cerrar</span>
                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import {ref} from 'vue';
import axios from '@/axiosConfig.js';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter();
const store = useStore();
const name = ref('');
const email = ref('');
const error = ref(null);
const password = ref('');
const passwordConfirmed = ref('');
const loading = ref(false);
const alert = ref(false);
const validate = ref(true);

const storeUser = async () => {
    if(!name.value.length || !email.value.length || !password.value.length || passwordConfirmed.value != password.value || !passwordConfirmed.value.length){
        validate.value = false;
        return;
    }else{
        validate.value = true;
    }
    loading.value = true;
    try {
        let res = await axios.post('api/user/create', {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: passwordConfirmed.value
        });
        name.value = null;
        email.value = null;
        password.value = null;
        passwordConfirmed.value = null;
        alert.value = true;
        setTimeout(() => {
            alert.value = false;
        }, 2000);
    } catch (err) {
        console.log(error);
        error.value = err.response.data;
    }
    loading.value = false;
};

</script>