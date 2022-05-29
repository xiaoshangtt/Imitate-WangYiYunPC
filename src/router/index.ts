import { createRouter, createWebHistory } from "vue-router";
import type { Router, RouteRecordRaw } from "vue-router";


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/discover"
  },
  {
    path: "/discover",
    component: () => import("@/views/discover/discover.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/discover/children/default/default.vue")
      },
      {
        path: "playlist",
        component: () => import("@/views/discover/children/playlist/playlist.vue")
      },
      {
        path: "toplist",
        component: () => import("@/views/discover/children/toplist/toplist.vue")
      },
      {
        path: "djradio",
        component: () => import("@/views/discover/children/djradio/djradio.vue"),
        children: [
          {
            path: "",
            component: () => import("@/views/discover/children/djradio/children/default.vue"),
            meta: {
              isShowNav: true
            }
          },
          {
            path: "category",
            component: () => import("@/views/discover/children/djradio/children/category.vue"),
            meta: {
              isShowNav: true
            }
          },
          {
            path: "recommend",
            component: () => import("@/views/discover/children/djradio/children/recommend.vue"),
            meta: {
              isShowNav: false
            }
          },
          {
            path: "rank",
            component: () => import("@/views/discover/children/djradio/children/rank.vue"),
            meta: {
              isShowNav: false
            }
          },
        ]
      },
      {
        path: "artist",
        component: () => import("@/views/discover/children/artist/artist.vue"),
        children: [
          {
            path: "",
            component: () => import("@/views/discover/children/artist/children/default.vue")
          },
          {
            path: "signed",
            component: () => import("@/views/discover/children/artist/children/signed.vue")
          },
          {
            path: "cat",
            component: () => import("@/views/discover/children/artist/children/cat.vue"),
          }
        ]
      },
      {
        path: "album",
        component: () => import("@/views/discover/children/album/album.vue")
      }
    ]
  },
  {
    path: "/user",
    component: () => import("@/views/user/user.vue"),
    children: [
      {
        path: "/",
        redirect: "/user/home"
      },
      {
        path: "home",
        component: () => import("@/views/user/children/home.vue")
      },
      {
        path: "follows",
        component: () => import("@/views/user/children/follows.vue")
      },
      {
        path: "fans",
        component: () => import("@/views/user/children/fans.vue")
      },
      {
        path: "event",
        component: () => import("@/views/user/children/event.vue")
      },
      {
        path: "songs",
        component: () => import("@/views/user/children/songs/songs.vue"),
        children: [
          {
            path: "/",
            redirect: "/user/songs/rank"
          },
          {
            path: "rank",
            component: () => import("@/views/user/children/songs/children/rank.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/artist",
    component: () => import("@/views/artist/artist.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/artist/children/works.vue")
      },
      {
        path: "album",
        component: () => import("@/views/artist/children/album.vue")
      },
      {
        path: "mv",
        component: () => import("@/views/artist/children/mv.vue")
      },
      {
        path: "desc",
        component: () => import("@/views/artist/children/desc.vue")
      }
    ]
  },
  {
    path: "/my",
    component: () => import("@/views/my/my.vue")
  },
  {
    path: "/friend",
    component: () => import("@/views/friend/friend.vue")
  },
  {
    path: "/playlist",
    component: () => import("@/views/playlist/playlist.vue")
  },
  {
    path: "/song",
    component: () => import("@/views/song/song.vue")
  },
  {
    path: "/album",
    component: () => import("@/views/album/album.vue")
  },
  {
    path: "/program",
    component: () => import("@/views/program/program.vue")
  },
  {
    path: "/djradio",
    component: () => import("@/views/djradio/djradio.vue")
  },
  {
    path: "/search",
    component: () => import("@/views/search/search.vue")
  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;