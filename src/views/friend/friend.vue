<template>
  <div class="friend">
    <div class="friend-wamp notlogin">
      <div class="welc">
        你可以关注明星和好友品味他们的私房歌单
        <br/>
        通过他们的动态发现更多精彩音乐
      </div>
      <a href="" class="login-click notlogin"></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Friend"
  }
</script>

<style scoped lang="less">
  .friend {
    width: var(--default-banner-width);
    min-height: 700px;
    background: #fff;
    border: 1px solid #d3d3d3;
    margin: 0 auto;

    .friend-wamp {
      width: 902px;
      height: 414px;
      margin: 0 auto;
      padding-top: 70px;
      background-position: 0 70px;

      .welc {
        padding: 178px 0 0 535px;
        line-height: 23px;
        color: #666;
        font-size: 14px;
      }

      .login-click {
        display: block;
        width: 157px;
        height: 48px;
        margin: 36px 0 0 535px;
        background-position: 0 9999px;
      }

      .login-click:hover {
        background-position: 0 -430px;
      }
    }
  }
</style>