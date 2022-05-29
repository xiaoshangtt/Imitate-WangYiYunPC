<template>
  <div class="preloader">
    <div ref="loadingRef" class="loader"></div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  name: "Loading",
  props: {
    outerColor: {
      type: String,
      default: () => "#ba55d3",
    },
    innerColor: {
      type: String,
      default: () => "#ff00ff",
    },
    middleColor: {
      type: String,
      default: () => "#9370d8",
    },
  },
  setup(props) {
    const loadingRef = ref(null);
    onMounted(() => {
      // const outerStyle = window.getComputedStyle(loadingRef.value, "before");
      // const innerStyle = window.getComputedStyle(loadingRef.value, "after");
      // const middleStyle = window.getComputedStyle(loadingRef.value);
      // outerStyle.borderTopColor = props.outerColor;
      // innerStyle.borderTopColor = props.innerColor;
      loadingRef.value.style.borderTopColor = props.middleColor;
      // middleStyle.borderTopColor = props.middleColor;
    });
    return {
      loadingRef,
    };
  },
});
</script>

<style scoped>
.preloader {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
}
.loader {
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #9370d8;
  animation: spin 1.5s linear infinite;
}
.loader::before {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #ba55d3;
  animation: spin 1.9s linear infinite;
}
.loader::after {
  content: "";
  position: absolute;
  top: 13px;
  left: 13px;
  right: 13px;
  bottom: 13px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #ff00ff;
  animation: spin 1.1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
