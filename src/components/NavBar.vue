<template>
    <div class="navbar">
        <Menubar :model="nav_items" class="menubar">
            <template #start>
                <h1 class="text-xl font-bold">Harshdeep Singh</h1>
            </template>
            
            <template #item="{ item }">
                <a v-ripple class="flex items-center p-2" @click.prevent="scrollTo(item.to)">
                    <i :class="item.icon" class="text-lg"></i>
                    <span class="sr-only">{{ item.label }}</span> <!-- Screen reader only text -->
                </a>
            </template>

            <template #end>
                <Button 
                    @click="toggleDarkMode" 
                    text 
                    rounded
                    :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'" 
                    class="w-10 h-10"
                    aria-label="Toggle Dark Mode"
                />
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import 'primeicons/primeicons.css';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import Menu from 'primevue/menu';
import { ref, onMounted, provide,defineProps } from 'vue';
import tooltip from 'primevue/tooltip';

const isDarkMode = ref(false);
const toggle = (event) => {
    menu.value.toggle(event);
};


function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle('app-dark', isDarkMode.value);

    // Save the preference in localStorage
    localStorage.setItem('darkMode', isDarkMode.value ? 'enabled' : 'disabled');
}

onMounted(() => {
    const savedMode = localStorage.getItem('darkMode');
    isDarkMode.value = savedMode === 'enabled' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDarkMode.value) {
        document.documentElement.classList.add('app-dark');
    }
});

provide('isDarkMode', isDarkMode);


const nav_items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        to: 'home'
    },
     {
                separator: true
            },
    {
        label: 'About',
        icon: 'pi pi-user',
        to: 'about'
    },
     {
                separator: true
            },
    {
        label: 'Skills',
        icon: 'pi pi-star',
        to: 'skills'
    }, {
                separator: true
            },
    {
        label: 'Portfolio',
        icon: 'pi pi-briefcase',
        to: 'portfolio'
    },
     {
                separator: true
            },
    {
        label: 'Contact',
        icon: 'pi pi-envelope',
        to: 'contact'
    }
]);
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 2px 15px var(--primary-300);
    transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}

.menubar {
    background: transparent !important;
    border: none;
}

.dark .navbar {
    box-shadow: 0 2px 15px var(--primary-950);
}

/* Menu items styling */
.p-menubar-root-list {
    margin-left: auto !important; /* Push items to the right */
    gap: 0.5rem;
}

.p-menuitem-link {
    padding: 0.75rem !important;
    border-radius: 50% !important;
    transition: background-color 0.2s;
}

.p-menuitem-link:hover {
    background-color: var(--primary-color-100) !important;
}

.dark .p-menuitem-link:hover {
    background-color: var(--primary-color-700) !important;
}

/* Dark mode toggle button */
.p-button {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Accessibility improvements */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
</style>