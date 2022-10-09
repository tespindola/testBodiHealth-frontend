<template>
    <div class="w-full flex justify-center">
        <div class="w-1/2 bg-white p-8 overflow-visible border border-gray-200 sm:rounded-lg shadow-md">
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
            <div v-else class="flex flex-col divide-y-2 divide-cyan-800 space-y-4">
                <div class="w-full">
                    <h3 class="truncate text-xl font-medium text-gray-900">Crear nueva noticia</h3>
                </div>
                <div class="w-full pt-5">
                    <label for="email" class="block text-md font-medium text-gray-700">Titulo</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <input type="text" v-model="title" name="text" id="text" class="block w-full rounded-md border border-gray-100 pl-2 focus:outline-none text-lg" placeholder="Titulo de la noticia" aria-invalid="true" aria-describedby="email-error">
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="!validateLimitTitle || (!validateForSave && !title.length)">
                        <!-- Heroicon name: mini/exclamation-circle -->
                            <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <p v-if="!validateLimitTitle" class="mt-2 text-sm text-red-600" id="email-error">Deben ser 150 caracteres como maximo</p>
                    <p v-if="!validateForSave && !title.length" class="mt-2 text-sm text-red-600" id="email-error">La noticia no puede estar sin titulo</p>
                </div>
                <div class="w-full pt-5">
                    <label for="email" class="block text-md font-medium text-gray-700 mb-2">Contenido</label>
                    <button class="inline-flex items-center rounded border border-transparent bg-cyan-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 mr-2" @click="setLink">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <editor-content :editor="editor" class="mt-2" />
                    <p v-if="!validateForSave && !editor.getText().length" class="mt-2 text-sm text-red-600" id="email-error">La noticia no puede estar sin contenido</p>
                </div>
                <div class="w-full pt-5">
                    <label for="email" class="block text-md font-medium text-gray-700">Categorias</label>
                    <SelectDropdown :options="categories.map(f => f.name)" @optionSelect="add($event, 'categories')" :textButton="'Agregar Categoria'" />
                    <div class="mt-2">
                        <h4 v-for="(op, i) in categoriesSelect" :key="i" class="inline-flex items-center rounded-full bg-cyan-800 px-2 py-0.5 text-sm text-white mr-1">
                            <span class="mr-1">{{op}}</span>
                            <span class="cursor-pointer" @click="removeOption(i, 'categories')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        </h4>
                    </div>
                    <div>
                        <p v-if="!validateForSave && !categoriesSelect.length" class="mt-2 text-sm text-red-600" id="email-error">Deben agregar una categoria</p>
                    </div>
                </div>
                <div class="w-full pt-5">
                    <label for="email" class="block text-md font-medium text-gray-700">Etiquetas</label>
                    <SelectDropdown :options="[]" @optionSelect="add($event, 'labels')" :textButton="'Agregar Etiqueta'" />
                    <div class="mt-2">
                        <h4 v-for="(op, i) in labelsSelect" :key="i" class="inline-flex items-center rounded-full bg-cyan-800 px-2 py-0.5 text-sm text-white mr-1">
                            <span class="mr-1">{{op}}</span>
                            <span class="cursor-pointer" @click="removeOption(i, 'labels')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        </h4>
                    </div>
                </div>
                <div class="w-full pt-5">
                    <label for="email" class="block text-md font-medium text-gray-700">Regiones</label>
                    <SelectDropdown :options="regions.map(f => f.name)" @optionSelect="add($event, 'regions')" :textButton="'Agregar Region'" />
                    <div class="mt-2">
                        <h4 v-for="(op, i) in regionsSelect" :key="i" class="inline-flex items-center rounded-full bg-cyan-800 px-2 py-0.5 text-sm text-white mr-1">
                            <span class="mr-1">{{op}}</span>
                            <span class="cursor-pointer" @click="removeOption(i, 'regions')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        </h4>
                    </div>
                </div>
                <div class="w-full pt-5">
                    <label for="email" class="block text-md font-medium text-gray-700">Referencias (links)</label>
                    <SelectDropdown :options="links.map(f => f.links)" @optionSelect="add($event, 'links')" :textButton="'Agregar Link'" />
                    <div class="mt-2">
                        <h4 v-for="(op, i) in linksSelect" :key="i" class="inline-flex items-center rounded-full bg-cyan-800 px-2 py-0.5 text-sm text-white mr-1">
                            <span class="mr-1">{{op}}</span>
                            <span class="cursor-pointer" @click="removeOption(i, 'links')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        </h4>
                    </div>
                </div>
                <div class="w-full pt-5">
                    <label for="email" class="block text-md font-medium text-gray-700">Perfiles</label>
                    <SelectDropdown :options="profiles.map(f => f.link)" @optionSelect="add($event, 'profiles')" :textButton="'Agregar Perfil'" />
                    <div class="mt-2">
                        <h4 v-for="(op, i) in profilesSelect" :key="i" class="inline-flex items-center rounded-full bg-cyan-800 px-2 py-0.5 text-sm text-white mr-1">
                            <span class="mr-1">{{op}}</span>
                            <span class="cursor-pointer" @click="removeOption(i, 'profiles')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        </h4>
                    </div>
                    <div class="mt-7">
                        <div v-if="loadingSave" class="grid grid-cols-1 items-center">
                            <div class="-mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" class="w-20 h-20" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                    <circle cx="50" cy="50" r="18" stroke-width="5" stroke="#1d6472" stroke-dasharray="28.274333882308138 28.274333882308138" fill="none" stroke-linecap="round">
                                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.0204081632653061s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                                    </circle>
                                </svg>
                            </div>
                            <h4 class="text-center text-xl font-medium">Cargando...</h4>
                        </div>
                        <button v-else @click="saveNew" class="block w-full items-center rounded-md border-2 border-cyan-700 bg-white px-4 py-2 text-base font-medium text-cyan-700 shadow-sm hover:bg-cyan-50 focus:outline-none focus:cyan-2 focus:cyan-indigo-500 focus:cyan-offset-2">Guardar</button>
                    </div>
                </div>

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
import {ref, onMounted, computed} from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import SelectDropdown from '@/components/SelectDropdown.vue';
import axios from '@/axiosConfig.js';

const editor = new Editor({
    content: '<p>Contenido de la noticia...</p>',
    extensions: [StarterKit, Link.configure({
        openOnClick: false,
        HTMLAttributes: {
            class: 'text-blue-500 underline'
        }
    })],
    editorProps: {
        attributes: {
            class: 'border border-gray-300 rounded h-24 focus:outline-none focus:border-2 focus:border-gray-400 p-2 shadow-sm'
        }
    }
});

const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
        return
    }

    // empty
    if (url === '') {
        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .unsetLink()
            .run()

        return
    }

    // update link
    editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
};

const title = ref('');
const validateLimitTitle = computed(() => {
    return title.value.length <= 150;
});
const validateLimitContent = ref(true);
editor.on('update', ({editor}) => {
    validateLimitContent.value = editor.getText().length <= 255;
});

const add = (val, type) => {
    if(type == 'categories'){
        categoriesSelect.value.push(val);
    }
    if(type == 'labels'){
        labelsSelect.value.push(val);
    }
    if(type == 'links'){
        linksSelect.value.push(val);
    }
    if(type == 'regions'){
        regionsSelect.value.push(val);
    }
    if(type == 'profiles'){
        profilesSelect.value.push(val);
    }
};

const categoriesSelect = ref([]);
const labelsSelect = ref([]);
const regionsSelect = ref([]);
const linksSelect = ref([]);
const profilesSelect = ref([]);

const removeOption = (i, type) => {
    if(type == 'categories'){
        categoriesSelect.value.splice(i, 1);
    }
    if(type == 'labels'){
        labelsSelect.value.splice(i, 1);
    }
    if(type == 'links'){
        linksSelect.value.splice(i, 1);
    }
    if(type == 'regions'){
        regionsSelect.value.splice(i, 1);
    }
    if(type == 'profiles'){
        profilesSelect.value.splice(i, 1);
    }
};

const categories = ref([]);
const regions = ref([]);
const links = ref([]);
const profiles = ref([]);
const loading = ref(true);
const loadingSave = ref(false);
const validateForSave = ref(true);
const alert = ref(false);

const saveNew = async () => {
    if(title.value.length == 0 || editor.getText().length == 0 || categoriesSelect.value.length == 0){
        validateForSave.value = false;
        return;
    }else{
        validateForSave.value = true;
    }
    loadingSave.value = true;
    let categoryIds = categories.value.filter(f => categoriesSelect.value.includes(f.name)).map(f => f.id);
    if(categoryIds.length < categoriesSelect.value.length){
        categoriesSelect.value.filter(f => categories.value.map(f => f.name).includes(f.name))
        let res = await axios.post('api/category/create', {
            insert: categoriesSelect.value.filter(f => !categories.value.map(f => f.name).includes(f)).map(f => {return {name: f}})
        });
        res.data.forEach(category => {
            categoryIds.push(category.id);
        });
    }
    let regionIds = [];
    if(regionsSelect.value.length){
        regionIds = regions.value.filter(f => regionsSelect.value.includes(f.name)).map(f => f.id);
        if(regionIds.length < regionsSelect.value.length){
            regionsSelect.value.filter(f => regions.value.map(f => f.name).includes(f.name))
            let res = await axios.post('api/region/create', {
                insert: regionsSelect.value.filter(f => !regions.value.map(f => f.name).includes(f)).map(f => {return {name: f}})
            });
            res.data.forEach(region => {
                regionIds.push(region.id);
            });
        }
    }
    let linkIds = [];
    if(linksSelect.value.length){
        linkIds = links.value.filter(f => linksSelect.value.includes(f.link)).map(f => f.id);
        if(linkIds.length < linksSelect.value.length){
            linksSelect.value.filter(f => links.value.map(f => f.link).includes(f.link))
            let res = await axios.post('api/link/create', {
                insert: linksSelect.value.filter(f => !links.value.map(f => f.link).includes(f)).map(f => {return {link: f}})
            });
            res.data.forEach(link => {
                linkIds.push(link.id);
            });
        }
    }
    let profileIds = [];
    if(profilesSelect.value.length){
        profileIds = profiles.value.filter(f => profilesSelect.value.includes(f.link)).map(f => f.id);
        if(profileIds.length < profilesSelect.value.length){
            profilesSelect.value.filter(f => profiles.value.map(f => f.link).includes(f.link))
            let res = await axios.post('api/profile/create', {
                insert: profilesSelect.value.filter(f => !profiles.value.map(f => f.link).includes(f)).map(f => {return {link: f}})
            });
            res.data.forEach(profile => {
                profileIds.push(profile.id);
            });
        }
    }
    let resNew = await axios.post('api/news/create', {
        title: title.value,
        content: editor.getHTML(),
        labels: labelsSelect.value,
        category_id: categoryIds,
        link_id: linkIds,
        profile_id: profileIds,
        region_id: regionIds,
    });
    title.value = '';
    editor.commands.setContent('<p>Contenido de la noticia...</p>');
    labelsSelect.value = [];
    categoriesSelect.value = [];
    labelsSelect.value = [];
    regionsSelect.value = [];
    linksSelect.value = [];
    profilesSelect.value = [];
    await data();
    alert.value = true;
    loadingSave.value = false;
    setTimeout(() => {
        alert.value = false;
    }, 1000);
};

const closeAlert = () => {
    alert.value = false;
};

const data = async () => {
    let res = await axios.get('api/news/create');
    categories.value = res.data.categories;
    links.value = res.data.regions;
    links.value = res.data.links;
    profiles.value = res.data.profiles;
    loading.value = false;
};

onMounted(async () => {
    await data();
});
</script>