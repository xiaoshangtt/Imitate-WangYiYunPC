<template>
  <div class="songs">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Songs",
});
</script>

<style scoped></style>
