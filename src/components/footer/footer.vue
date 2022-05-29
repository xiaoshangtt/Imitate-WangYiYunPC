<template>
  <div class="footer">
    <div class="footer-wamp">
      <div class="wamp-bx clearfix">
        <div class="copy">
          <p class="link">
            <a href="//st.music.163.com/official-terms/service" target="_blank"
              >服务条款</a
            ><span class="line">|</span>
            <a href="//st.music.163.com/official-terms/privacy" target="_blank"
              >隐私政策</a
            ><span class="line">|</span>
            <a href="//st.music.163.com/official-terms/children" target="_blank"
              >儿童隐私政策</a
            ><span class="line">|</span>
            <a
              href="//music.163.com/st/staticdeal/complaints.html"
              target="_blank"
              >版权投诉</a
            ><span class="line">|</span>
            <a href="http://ir.music.163.com" target="_blank">投资者关系</a
            ><span class="line">|</span>
            <a
              href="https://music.163.com/ui/resource"
              rel="noopener noreferrer"
              target="_blank"
              >广告合作</a
            >
            <span class="line">|</span>
            <a
              href="https://jubao.163.com"
              rel="noopener noreferrer"
              target="_blank"
              >廉正举报</a
            ><span class="line">|</span>
            <a
              onclick="nm.x.biLog('click', {mspm:'61f261f4b99b0d5882ce3a78',page:'web_netease_music_homepage',target:'base_fast_access'});return true;"
              href="//mp.music.163.com/600948c936c13f4d09752e73/contact-us-web/index.html?source=Music-Main-Station"
              target="_blank"
              >联系我们</a
            >
          </p>
          <p>
            <span>网易公司版权所有©1997-2022</span>
            <span>杭州乐读科技有限公司运营：</span>
            <a
              href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png"
              target="_blank"
              class="alink s-fc3"
              >浙网文[2021] 1186-054号</a
            >
          </p>
          <p>
            <a
              href="https://beian.miit.gov.cn/#/Integrated/index"
              target="_blank"
              >粤B2-20090191-18&nbsp;&nbsp;工业和信息化部备案管理系统网站</a
            >
            <a
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564"
              target="_blank"
            >
              <span class="logo"></span>
              <span>浙公网安备 33010902002564号</span>
            </a>
          </p>
        </div>
        <ul class="enter clearfix">
          <li>
            <a
              href="https://web-amped.music.163.com/"
              class="foot_enter_new logo logo-amped"
            ></a>
            <span class="foot_enter_tt tt tt-amped"></span>
          </li>
          <li>
            <a
              href="//music.163.com/st/userbasic#/auth"
              class="foot_enter_new logo logo-auth"
            ></a>
            <span class="foot_enter_tt tt tt-auth"></span>
          </li>
          <li>
            <a
              href="//music.163.com/musician/artist"
              class="foot_enter_new logo logo-musician"
            ></a>
            <span class="foot_enter_tt tt tt-musician"></span>
          </li>
          <li>
            <a
              href="//music.163.com/web/reward"
              class="foot_enter_new logo logo-reward"
            ></a>
            <span class="foot_enter_tt tt tt-reward"></span>
          </li>
          <li>
            <a
              href="//music.163.com/st/ncreator/revenue-plan"
              class="foot_enter_new logo logo-cash"
            ></a>
            <span class="foot_enter_tt tt tt-cash"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<style lang="less" scoped>
.footer {
  position: relative;
  height: 172px;
  overflow: hidden;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
  font-size: 12px;
  .footer-wamp {
    width: var(--default-banner-width);
    margin: 0 auto;
    .wamp-bx {
      a:hover {
        text-decoration: underline;
      }
      .copy {
        float: left;
        width: 520px;
        padding-top: 15px;
        line-height: 24px;
        p {
          a,
          span {
            color: #666;
          }
          .logo {
            display: inline-block;
            width: 14px;
            height: 14px;
            background: url(~@/assets/images/police.png) no-repeat;
            background-size: cover;
            display: inline-block;
            margin-right: 2px;
            vertical-align: -2px;
            margin-left: 5px;
          }
        }
        .link {
          a {
            color: #999;
          }
          .line {
            margin: 0 3px;
            color: #c2c2c2;
          }
        }
      }
      .enter {
        float: left;
        width: 420px;
        height: 70px;
        margin-top: 33px;
        overflow: hidden;
        li {
          float: left;
          width: 60px;
          height: 70px;
          box-sizing: border-box;
          text-align: center;
          color: #666;
          &:nth-child(n + 2) {
            margin-left: 30px;
          }
        }
        .logo {
          display: block;
          width: 50px;
          height: 45px;
          margin: 0 auto;
        }
        .tt {
          display: inline-block;
          margin: 5px 15px 0 0;
          width: 72px;
          height: 14px;
        }
        .logo-amped {
          background-position: -60px -456.5px;
        }
        .logo-auth {
          background-position: -60px -101px;
        }
        .logo-musician {
          background-position: 0 0;
        }
        .logo-reward {
          background-position: -60px -50px;
        }
        .logo-cash {
          background-position: 0 -101px;
        }
        .tt-amped {
          background-position: 0 -108px;
          margin-right: -6px;
        }
        .tt-auth {
          background-position: -1px -91px;
          margin-left: 6px;
        }
        .tt-musician {
          background-position: 0 0;
          margin-left: 3px;
        }
        .tt-reward {
          background-position: 0 -54px;
          margin-left: 6px;
        }
        .tt-cash {
          background-position: -1px -72px;
          margin-left: 1px;
        }
      }
    }
  }
}
</style>
