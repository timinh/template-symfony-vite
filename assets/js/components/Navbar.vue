<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#"><img src="https://cdn.uca.fr/images/logos/UCA_logo_long_blanc.png"
                alt="UCA"></a>
        <button class="navbar-toggler" @click="menuCollapsed = !menuCollapsed" type="button" data-toggle="collapse"
            data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse" :class="(menuCollapsed) ? 'collapse' : ''" id="navbarColor01">
            <ul class="navbar-nav mr-auto" v-if="nav">
                <li class="nav-item" v-for="(n, index) in nav" :key="index">
                    <router-link tag="a" class="nav-link" :to="n.path">
                        {{n.name.toUpperCase()}}
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script setup>
import {useRouter} from 'vue-router'
    const {getRoutes} = useRouter()
    const nav = computed( () => {
        let routes = getRoutes()
        return routes.filter( (r) => r.meta.nav)
    })

    const menuCollapsed = ref(true)
</script>