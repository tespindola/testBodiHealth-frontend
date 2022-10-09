<template>
    <div class="mt-1 flex items-center">
        <div class="relative mt-1 w-96">
            <input v-model="search" id="combobox" type="text" class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" role="combobox" aria-controls="options" aria-expanded="false">
            <button type="button" class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                </svg>
            </button>

            <ul class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" id="options" role="listbox" v-if="getOptions.length && activeOptions">
                <li v-for="(option, i) in getOptions" :key="i" class="relative z-50 cursor-pointer select-none py-2 pl-8 pr-4 text-gray-900" id="option-0" role="option" tabindex="-1" @click="select(option)">
                    <span class="block truncate">{{ option }}</span>
                </li>
            </ul>
        </div>
        <button :class="{'bg-gray-200 hover:bg-gray-200 focus:ring-0': !validateLimit}" class="inline-flex items-center rounded border border-transparent bg-cyan-700 px-2 py-2 text-xs font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 ml-2" :disabled="!validateLimit" @click="sendOption">
            <span class="text-md font-medium m-0 p-0">{{ textButton }}</span>
        </button>
    </div>
    <div v-if="!validateLimit">
        <p class="mt-2 text-sm text-red-600" id="email-error">Deben ser {{limit.value}} caracteres como maximo</p>
    </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue';

const props = defineProps(['options', 'textButton', 'limit']);
const emits = defineEmits({
    optionSelect(val){
        return val;
    }
});

const options = ref(props.options);
const textButton = ref(props.textButton);
const limit = ref(props.limit ?? 150);
const validateLimit = computed(() => {
    return search.value.length <= limit.value;
});
const search = ref('');
const getOptions = computed(() => {
    if(search.value == ''){
        return options.value;
    }
    return options.value.filter(f => {
        return f.toLowerCase().includes(search.value);
    });
});
const activeOptions = ref(false);

const select = (val) => {
    search.value = val;
    sendOption();
};

const sendOption = () => {
    if(search.value.length <= limit.value){
        let val = search.value;
        search.value = '';
        activeOptions.value = false;
        emits('optionSelect', val)
    }
};

watch(search, () => {
    activeOptions.value = search.value != '' ? true : false;
});

</script>