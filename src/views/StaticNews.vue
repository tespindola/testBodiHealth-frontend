<template>
    <div v-if="loading" class="grid grid-cols-1 items-center">
        <div class="-mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="150px" height="150px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" r="18" stroke-width="5" stroke="#1d6472" stroke-dasharray="28.274333882308138 28.274333882308138" fill="none" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.0204081632653061s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                </circle>
            </svg>
        </div>
        <h4 class="text-center text-xl font-medium">Cargando...</h4>
    </div>
    <main v-else-if="news.length">
        <div class="w-full flex justify-between mb-4">
            <div>
                <h1 class="text-lg font-medium">Nuevas noticias</h1>
            </div>
        </div>
        <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="(staticNew, i) in news" :key="staticNew.id" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-lg border border-gray-200 h-max">
                <div class="flex w-full items-center justify-between space-x-5 p-4">
                    <div>
                        <div class="flex items-center space-x-3">
                            <h3 class="truncate text-sm font-medium text-gray-900">{{ staticNew.title }}</h3>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="flex items-center space-x-3">
                            <h3 class="truncate text-sm font-medium text-gray-900">{{ staticNew.regions.map(f => f.name).join(', ') }}</h3>
                        </div>
                        <div v-if="validateLogin" class="w-max ml-2 cursor-pointer" @click="showModalDelete(staticNew.id, i)">
                            <h4 class="rounded-full bg-red-700 px-1 py-1 text-sm text-white">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </h4>
                        </div>
                    </div>
                </div>
                <div class="flex w-full items-center justify-between space-x-6 p-6">
                    <div v-html="staticNew.content"></div>
                </div>
                <div v-if="staticNew.labels.length" class="flex flex-col w-full p-2 pl-5">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Etiquetas</label>
                    <div class="flex">
                        <h4 v-for="(op, i) in staticNew.labels" :key="i" class="w-max inline-flex items-center rounded-full bg-teal-800 px-2 py-0.5 text-sm text-white mr-1">
                            <span class="">{{op}}</span>
                        </h4>
                    </div>
                </div>
                <div v-if="staticNew.categories.length" class="flex flex-col w-full p-2 pl-5">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Categorias</label>
                    <div class="flex">
                        <h4 v-for="(op, i) in staticNew.categories" :key="i" class="w-max inline-flex items-center rounded-full bg-cyan-800 px-2 py-0.5 text-sm text-white mr-1">
                            <span class="">{{op.name}}</span>
                        </h4>
                    </div>
                </div>
                <div v-if="staticNew.profiles.length" class="flex flex-col w-full p-2 pl-5">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Perfiles</label>
                    <div class="flex">
                        <a :href="op.link" target="_blank" v-for="(op, i) in staticNew.profiles" :key="i" class="inline-flex items-center rounded-full bg-sky-800 px-1 py-0.5 text-sm text-white ">
                            <span class="">{{op.link}}</span>
                        </a>
                    </div>
                </div>
                <div class="flex w-full items-center justify-between space-x-5 p-4">
                    <div>
                        <div class="flex items-center space-x-3">
                            <h3 class="truncate text-sm font-medium text-gray-900">{{ $moment(staticNew.published).calendar() }}</h3>
                        </div>
                    </div>
                    <div v-if="staticNew.links.length">
                        <div class="flex items-center space-x-3">
                            <h3 class="truncate text-sm font-medium text-gray-900">Leer mas en {{ staticNew.links.map(f => f.link).join(', ') }}</h3>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div v-if="pagination.totalPage > 1" class="flex items-center justify-end border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-5">
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
                <div>
                    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button v-if="pagination.urlPrevPage" href="#" class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20" @click="page(pagination.urlPrevPage)">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <button v-for="i in pagination.totalPage" :key="i" aria-current="page" :class="{'border-cyan-500 text-cyan-600 bg-cyan-50': pagination.currentPage == i, 'border-gray-300 text-gray-500 hover:bg-gray-50': pagination.currentPage != i}" class="relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium  focus:z-20" @click="page(`api/news?page=${i}`)">
                            {{ i }}                            
                        </button>
                        <button v-if="pagination.urlNextPage" href="#" class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20" @click="page(pagination.urlNextPage)">
                            <!-- Heroicon name: mini/chevron-right -->
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </main>
    <div v-else class="w-full flex flex-col mb-4 text-center">
        <h1 class="text-2xl font-medium text-center">No hay noticias nuevas</h1>
    </div>
    <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="modalDelete" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div class="sm:flex sm:items-start">
                            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Eliminar noticia</h3>
                                <div class="mt-2">
                                <p class="text-sm text-gray-500">¿Realmente quiere eliminar la noticia?</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="loadingDelete" class="grid grid-cols-1 items-center">
                            <div class="-mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" class="w-20 h-20" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                    <circle cx="50" cy="50" r="18" stroke-width="5" stroke="#1d6472" stroke-dasharray="28.274333882308138 28.274333882308138" fill="none" stroke-linecap="round">
                                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.0204081632653061s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                                    </circle>
                                </svg>
                            </div>
                            <h4 class="text-center text-xl font-medium">Cargando...</h4>
                        </div>
                        <div v-else class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click="deleteNew()">Eliminar</button>
                            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm" @click="closeModal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <!-- Global notification live region, render this permanently at the end of the document -->
    <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="alertDelete" aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
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
                                <p class="text-sm font-medium text-gray-900">Noticia eliminada</p>
                                <p class="mt-1 text-sm text-gray-500">Se elimino correctamente la noticia</p>
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
import { ref, computed, reactive } from "vue";
import axios from '@/axiosConfig.js';
import { useStore } from 'vuex'

const store = useStore();
const loading = ref(true);
const loadingDelete = ref(false);
const modalDelete = ref(false);
const alertDelete = ref(false);
const dataDelete = ref({});
const news = ref([]);
const url = ref('api/news');
const pagination = reactive({
    currentPage: 1,
    totalPage: 0,
    urlNextPage: null,
    urlPrevPage: null,
});
const validateLogin = computed(() => {
    return store.state.login;
});
const getNews = async () => {
    loading.value = true;
    let res = await axios.get(url.value);
    news.value = res.data.data;
    pagination.currentPage = res.data.current_page;
    pagination.totalPage = res.data.total > res.data.per_page ? Math.ceil(res.data.total / res.data.per_page) : 1;
    pagination.urlNextPage = res.data.next_page_url;
    pagination.urlPrevPage = res.data.prev_page_url;
    loading.value = false;
};
getNews();

const page = async (urlNext) => {
    console.log(urlNext);
    url.value = urlNext;
    await getNews();
}

const showModalDelete = (id, i) => {
    dataDelete.value = {id, index: i};
    modalDelete.value = true;
};
const closeModal = () => {
    modalDelete.value = false;
};
const closeAlert = () => {
    alert.value = false;
};
const deleteNew = async () => {
    loadingDelete.value = true;
    let res = await axios.delete(`api/news/${dataDelete.value.id}`);
    news.value.splice(dataDelete.value.index, 1);
    loadingDelete.value = false;
    modalDelete.value = false;
    alertDelete.value = true;
    setTimeout(() => {
        alertDelete.value = false;
    }, 1000);
};

</script>
