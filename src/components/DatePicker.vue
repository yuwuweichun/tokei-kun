<script setup>
import { computed } from 'vue'
import { useDateStore } from 'src/stores/useDateStore.js'

const dateStore = useDateStore()

const date = computed({
    get: () => dateStore.dateStr,
    set: (newDateStr) => dateStore.updateDate(newDateStr)
})

const text = "Our love began its timeless count on"
</script>



<template>
    <div class="responsive-layout">
        <div class="q-pa-md text-h6">{{ text }}</div>

        <div class="q-pa-md" style="max-width: 300px">
            <q-input filled v-model="date" :input-style="{ textAlign: 'center' }">
                <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>

                <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                            </q-time>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
        </div>
    </div>
</template>

<style scoped>
.responsive-layout {
    /* 窄屏幕默认样式（column + 水平居中） */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 水平居中 */
    justify-content: center;
    /* 备用：竖直方向也居中 */

    /* 宽屏幕样式（row + 竖直居中） */
    @media (min-width: 768px) {
        /* 通常 768px 是平板/PC 的分界点 */
        flex-direction: row;
        align-items: center;
        /* 竖直居中 */
        justify-content: center;
        /* 水平方向也居中 */
        gap: 16px;
        /* 可选：添加子组件间距 */
    }

    /* 背景渐变色 */
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

</style>
