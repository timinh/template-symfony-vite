<template>
    <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'">
            <component :is="Component" :key="route" />
        </transition>
    </router-view>
</template>