<template>
  <div
    class="sub-nav"
    :class="subnavList && subnavList.length > 0 ? 'sub-nav-active' : ''"
  >
    <div class="sub-nav-main">
      <ul class="nav">
        <li v-for="subnav in subnavList" class="nav-item" :key="subnav.name">
          <router-link href="#" hidefocusv :to="subnav.to">
            <i
              :class="subnav.to === this.$route.path ? 'subnav-active' : ''"
              >{{ subnav.name }}</i
            >
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubNav",
  props: {
    subnavList: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<style lang="less" scoped>
.sub-nav-active {
  height: 46px !important;
}
.sub-nav {
  height: 5px;
  background: var(--defualt-subnav-bgc);
  border-bottom: 1px solid #a40011;
  .sub-nav-main {
    margin: 0 auto;
    width: var(--default-main-width);
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    .nav {
      margin-left: 170px;
      .nav-item,
      .nav-item a {
        float: left;
        height: 34px;
        text-align: center;
        a {
          color: white;
          i {
            display: block;
            padding: 0 20px;
            height: 35px;
            margin: 5px 17px 0;
            line-height: 35px;
            border-radius: 20px;
          }
          i.subnav-active {
            background: #9b0909;
          }
        }
      }
      .nav-item:hover {
        i {
          background: #9b0909;
        }
      }
    }
  }
}
</style>
