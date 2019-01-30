<template>
    <div class="app">
        <app-header/>
        hello world
        <app-content/>
    </div>
</template>

<script>
import AppHeader from "./components/header/AppHeader.vue";
import AppContent from "./components/content/AppContent.vue";
export default {
    components:{
        AppHeader,
        AppContent
    }
}
</script>

<style>
    .app{
        color:red;
        animation: animations 3s  infinite;
    }
    @keyframes animations{
        0%{color:red}
        100%{color:green}
    }
</style>
