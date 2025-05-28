<script setup>
    import AnniversaryCountdown from 'src/components/AnniversaryCountdown.vue';
</script>

<template>
    <q-page class="flex flex-center custom-bg">
        <AnniversaryCountdown />
    </q-page>
</template>

<style scoped>
    .custom-bg{
        background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)
    }
</style>