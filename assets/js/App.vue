<template>
    <navbar></navbar>
    <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <component :is="Component" :key="route" />
        </transition>
    </router-view>
</template>