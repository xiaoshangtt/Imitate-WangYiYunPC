import { Module } from "vuex";
import { IDiscoverState } from "@/store/discover/types";
import { IRootState } from "@/store/types"

import {
  getBanner,
  getDayRecommend,
  getNewSong,
  getPlaylistDetail,
  getToplist,
  getPlaylistDetailNetFriend,
  getAllPlaylistCategory,
  getDjCatelist,
  getDjCategoryRecomment,
  getDjHotToplist,
  getRecommendProgram,
  getProgramToplist,
  getArtistList,
  getHotArtistList,
  getAllAlbum,
  getNewAlbum,
  getToplistPopular
} from "@/network/discover/discover";

import { getPlaylistComment, getArtistDetail } from "@/network/com";

export const discoverModule: Module<IDiscoverState, IRootState> = {
  namespaced: true,
  state() {
    return {
      bannerList: [],
      dayRecommendList: [],
      newSongList: [],
      categorySongList: [],
      categorySongListTotal: 0,

      recommendArtist: [],

      //  最热主播榜
      toplistPopular: [],

      hotPlaylistList: [],
      allPlaylistCategoryList: [],

      toplist: [],
      toplistDetail: [],
      toplistComment: {
        comments: [],
        more: true,
        total: 0
      },
      // 前三榜单的数据
      threeToplist: [],

      djCategory: [],
      djCategoryRecommend: [],
      djToplist: {
        djRadios: [],
        total: 0
      },


      // djradio页面的首页推荐的数据
      djRecommend: {
        djMusicRecommend: {},
        djLifeRecommend: {},
        djEmotionRecommend: {},
        djCreateCoverRecommend: {},
        djKnowledgeRecommend: {}
      },

      // 推荐节目
      recommendProgram: [],
      // 节目榜
      programToplist: [],

      // 分类歌手列表数据
      artistList: [],
      // 热门歌手列表
      hotArtistList: [],

      // 全部新碟
      allAlbum: [],
      allAlbumTotal: 0,
      // 热门新碟（本周）
      newAlbumWeekData: [],

    };
  },
  getters: {
    getCurrentShowToplist(state) {
      return (id: number) => {
        return state.toplistDetail.find(item => item.id == id) || {};
      }
    },
    // 获取programToplist对比成绩（就是第一名成绩）
    ge_getProgramToplistScoreCon(state) {
      return state.programToplist[0]?.score || 0;
    }
  },
  mutations: {
    changeBannerList(state, bannerList) {
      state.bannerList = bannerList
    },
    changeDayRecommendList(state, dayRecommendList) {
      state.dayRecommendList = dayRecommendList;
    },
    changenewSongList(state, newSongList) {
      state.newSongList = newSongList;
    },
    clearPlaylistDetailList(state) {
      state.playlistDetailList = [];
    },
    changeCategorySongList(state, categorySongList) {
      state.categorySongList = categorySongList;
    },
    clearCategorySongList(state) {
      state.categorySongList = [];
      state.categorySongListTotal = 0
    },
    changeCategorySongListTotal(state, total) {
      state.categorySongListTotal = total;
    },

    // 修改default页面推荐歌手数据
    mu_changeRecommendArtist(state, recommendArtist) {
      state.recommendArtist = recommendArtist;
    },

    // 修改最热主播榜数据
    mu_changeToplistPopular(state, toplistPopular) {
      state.toplistPopular = toplistPopular;
    },

    // 未使用
    changeHotPlaylistList(state, hotPlaylistList) {
      state.hotPlaylistList = hotPlaylistList
    },
    changeAllPlaylistCategoryList(state, allPlaylistCategoryList) {
      state.allPlaylistCategoryList = allPlaylistCategoryList;
    },
    changeToplist(state, toplist) {
      state.toplist = toplist;
    },
    pushToplistDetail(state, toplistDetail) {
      if (state.toplistDetail.findIndex((item) => item.id === toplistDetail.id) == -1) {
        state.toplistDetail.push(toplistDetail);
      }
    },
    changeToplistComment(state, toplistComment) {
      state.toplistComment.comments = toplistComment.comments || [];
      state.toplistComment.more = toplistComment.more || false;
      state.toplistComment.total = toplistComment.total || 0
    },

    // 修改前三榜单的数据
    changeThreeToplist(state, threeToplist) {
      state.threeToplist = threeToplist;
    },


    // 修改电台分类列表
    mu_changeDjCategory(state, djCategory) {
      state.djCategory = djCategory;
    },
    // 修改电台分类推荐
    mu_changeDjCategoryRecommend(state, djCategoryRecommend) {
      state.djCategoryRecommend = djCategoryRecommend;
    },
    // 修改电台排行榜
    mu_changeDjToplist(state, djToplist) {
      state.djToplist = {
        djRadios: djToplist.djRadios,
        total: djToplist.count
      };
    },

    // 修改djradio页面的首页推荐的数据
    mu_changeDjRecommend(state, djRecommend) {
      state.djRecommend = djRecommend
    },
    // 修改推荐节目
    mu_changeRecommendProgram(state, recommendProgram) {
      state.recommendProgram = recommendProgram;
    },
    // 修改节目排行榜
    mu_changeProgramToplist(state, programToplist) {
      state.programToplist = programToplist;
    },

    // 修改分类歌手列表
    mu_changeArtistList(state, artistList) {
      state.artistList = artistList;
    },
    // 修改热门歌手列表
    mu_chnageHotArtist(state, hotArtistList) {
      state.hotArtistList = hotArtistList;
    },

    // 修改全部新碟
    mu_changeAllAlbum(state, { allAlbum, allAlbumTotal }) {
      state.allAlbum = allAlbum;
      state.allAlbumTotal = allAlbumTotal;
    },
    // 修改热门新碟（本周）
    mu_changeNewAlbumWeekData(state, newAlbumWeekData) {
      state.newAlbumWeekData = newAlbumWeekData;
    }
  },
  actions: {
    // 获取歌手详情
    async ac_getArtistDetail(context, id) {
      const artistDetail = await getArtistDetail(id);
      return Promise.resolve(artistDetail.data.data);
    },
    // 获取歌单详情，需要传入歌单id
    async getPlaylistDetailId(context, id) {
      const playlistDetailResult = await getPlaylistDetail(id);
      return playlistDetailResult;
    },
    async getPlaylistDetailNetFirend(context, payload) {
      const playlist = await getPlaylistDetailNetFriend(payload);
      return playlist;
    },


    // 获取轮播图图片
    async getBannerList(context) {
      const bannerResult = await getBanner();
      context.commit("changeBannerList", bannerResult.data.banners);
    },
    // 获取每日推荐
    async getDayRecommendList(context) {
      context.state.dayRecommendList = [];
      const dayRecommendResult = await getDayRecommend(8);
      context.commit("changeDayRecommendList", dayRecommendResult.data.result);
    },
    // 获取新歌列表
    async getNewSongList(context) {
      context.state.newSongList = [];
      const newSongListResult = await getNewSong(6);
      context.commit("changenewSongList", newSongListResult.data.result);
    },

    // 获取分类歌单详情
    async getCategorySongList(context, payload) {
      context.commit("clearCategorySongList");
      const categorySongList = await context.dispatch("getPlaylistDetailNetFirend", payload);
      context.commit("changeCategorySongList", categorySongList.data.playlists);
      context.commit("changeCategorySongListTotal", categorySongList.data.total)
    },

    async getAllPlaylistCategoryList(context) {
      const allPlaylistCategoryList = await getAllPlaylistCategory();

      // 分类对应的类别
      const categories = allPlaylistCategoryList.data.categories
      // 所有分类
      const sub = allPlaylistCategoryList.data.sub
      // 对分类进行处理
      const newAllPlaylistCategoryList: any = {};
      newAllPlaylistCategoryList.list = [];
      for (const k in categories) {
        newAllPlaylistCategoryList.list.push({
          categoryId: k,
          name: categories[k],
          sub: []
        })
      }
      for (const i of sub) {
        const currentSub = newAllPlaylistCategoryList.list.find((item: any) => {
          return item.categoryId == i.category;
        })
        if (currentSub) {
          currentSub.sub.push({ ...i });
        }
      }

      context.commit("changeAllPlaylistCategoryList", newAllPlaylistCategoryList.list)
    },


    // 获取所有榜单
    async getToplist(context) {
      const toplist = await getToplist();
      context.commit('changeToplist', toplist.data.list)
      context.dispatch("getToplistDetailId", toplist.data.list[0].id);
      return Promise.resolve();
    },
    // 获取排行榜的歌曲
    async getToplistDetailId(context, id) {
      if (context.state.toplistDetail.findIndex(item => item.id === id) == -1) {
        const toplistDetail = await getPlaylistDetail(id);
        context.commit("pushToplistDetail", toplistDetail.data?.playlist || []);
      }
    },
    // 获取排行榜评论 使用获取歌单评论接口
    async getToplistComment(context, query) {
      const toplistComment = await getPlaylistComment(query);
      context.commit("changeToplistComment", toplistComment.data)
    },
    // 获取前三的榜单。在default页面使用
    async ac_getThreeToplist(context) {
      await context.dispatch("getToplist");
      const toplistThree = context.state.toplist.slice(0, 3);
      toplistThree.forEach(item => {
        context.dispatch("getToplistDetailId", item.id);
      })
    },


    // 获取电台分类列表
    async ac_getDjCategory(context) {
      const djCategory = await getDjCatelist();
      context.commit("mu_changeDjCategory", djCategory.data.categories);
    },
    // 获取类别电台推荐
    async ac_getDjCategoryRecommend(context, type) {
      const djCategoryRecommend = await getDjCategoryRecomment(type);
      context.commit("mu_changeDjCategoryRecommend", djCategoryRecommend.data.djRadios);
      return Promise.resolve(djCategoryRecommend.data.djRadios);
    },
    // 获取类别电台的最热电台排行榜
    async ac_getDjHotToplist(context, query) {
      const hotToplist = await getDjHotToplist(query);
      context.commit("mu_changeDjToplist", hotToplist.data);
    },


    // 获取djradio页面的首页推荐的数据
    async ac_getDjRecommend(context) {

      const djMusicRecommend = await getDjCategoryRecomment(2);
      const djLifeRecommend = await getDjCategoryRecomment(6);
      const djEmotionRecommend = await getDjCategoryRecomment(3);
      const djCreateCoverRecommend = await getDjCategoryRecomment(2001);
      const djKnowledgeRecommend = await getDjCategoryRecomment(11)

      context.commit("mu_changeDjRecommend", {
        djMusicRecommend: { list: djMusicRecommend.data.djRadios.slice(0, 4), id: 2 },
        djLifeRecommend: { list: djLifeRecommend.data.djRadios.slice(0, 4), id: 6 },
        djEmotionRecommend: { list: djEmotionRecommend.data.djRadios.slice(0, 4), id: 3 },
        djCreateCoverRecommend: { list: djCreateCoverRecommend.data.djRadios.slice(0, 4), id: 2001 },
        djKnowledgeRecommend: { list: djKnowledgeRecommend.data.djRadios.slice(0, 4), id: 11 }
      })
    },
    // 获取推荐节目数据
    async ac_getRecommendProgram(context) {
      const recommendProgram = await getRecommendProgram(50);
      context.commit("mu_changeRecommendProgram", recommendProgram.data.programs);
    },
    // 获取节目排行榜
    async ac_getProgramToplist(context, query) {
      const programToplist = await getProgramToplist(query);
      // 获取的排行榜信息，每个对象包含了一层program，需要将里面的属性，拿出来
      programToplist.data.toplist = programToplist.data.toplist.map((item: any) => {
        return {
          ...item.program,
          rank: item.rank,
          score: item.score,
        }
      })
      context.commit("mu_changeProgramToplist", programToplist.data.toplist);
    },
    // 获取分类歌手列表数据
    async ac_getArtistList(context, query) {
      const artistList = await getArtistList(query);
      context.commit("mu_changeArtistList", artistList.data.artists);
    },
    // 获取热门歌手列表
    async ac_getHotArtistList(context, query = {}) {
      const hotArtistList = await getHotArtistList(query);
      context.commit("mu_chnageHotArtist", hotArtistList.data.artists);
      return Promise.resolve();
    },

    // default页面中获取热门歌手列表推荐  没有找到歌手信息，还要获取歌手详情 ac_getArtistDetail
    async ac_getArtistDetailList(context) {
      await context.dispatch("ac_getHotArtistList");
      const hotArtistList = context.state.hotArtistList.slice(0, 5);
      const proall: any[] = [];
      hotArtistList.forEach((item) => {
        proall.push(new Promise((resolve, reject) => {
          (context.dispatch("ac_getArtistDetail", item.id)).then(res => {
            resolve(res)
          })
        }))
      })
      const recommendArtist = await Promise.all(proall)
      context.commit("mu_changeRecommendArtist", recommendArtist);
    },


    // 获取最热主播榜
    async getToplistPopular(context) {
      const toplistPopular = await getToplistPopular({ limit: 5 });
      context.commit('mu_changeToplistPopular', toplistPopular.data.data.list);
    },


    // 获取全部新碟
    async ac_getAllAlbum(context, query) {
      const AllAlbumResult = await getAllAlbum(query);
      context.commit("mu_changeAllAlbum", {
        allAlbum: AllAlbumResult.data.albums,
        allAlbumTotal: AllAlbumResult.data.total
      });
    },
    // 获取热门新碟
    async ac_getNewAlbum(context, query = {}) {
      const newAlbumResult = await getNewAlbum(query);
      context.commit("mu_changeNewAlbumWeekData", newAlbumResult.data.weekData);
    }


  },
};