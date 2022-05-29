export const ArtistNavConfig = [
    {
        title: "推荐",
        subnav: [
            {
                title: "推荐歌手",
                url: "/discover/artist",
                selectId: 9999
            },
            {
                title: "入驻歌手",
                url: "/discover/artist/signed",
                selectId: 8888
            },
        ],
    },
    {
        title: "华语",
        subnav: [
            {
                title: "华语男歌手",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 1,
                    area: 7,
                },
                selectId: 1001
            },
            {
                title: "华语女歌手",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 2,
                    area: 7,
                },
                selectId: 1002
            },
            {
                title: "华语组合/乐队",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 3,
                    area: 7,
                },
                selectId: 1003
            },
        ],
    },
    {
        title: "欧美",
        subnav: [
            {
                title: "欧美男歌手",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 1,
                    area: 96,
                },
                selectId: 2001
            },
            {
                title: "欧美女歌手",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 2,
                    area: 96,
                },
                selectId: 2002
            },
            {
                title: "欧美组合/乐队",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 3,
                    area: 96,
                },
                selectId: 2003
            },
        ],
    },
    {
        title: "日本",
        subnav: [
            {
                title: "日本男歌手",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 1,
                    area: 8,
                },
                selectId: 3001
            },
            {
                title: "日本女歌手",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 2,
                    area: 8,
                },
                selectId: 3002
            },
            {
                title: "日本组合/乐队",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 3,
                    area: 8,
                },
                selectId: 3003
            },
        ],
    },
    {
        title: "韩国",
        subnav: [
            {
                title: "韩国男歌手",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 1,
                    area: 16,
                },
                selectId: 4001
            },
            {
                title: "韩国女歌手",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 2,
                    area: 16,
                },
                selectId: 4002
            },
            {
                title: "韩国合/乐队",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 3,
                    area: 16,
                },
                selectId: 4003
            },
        ],
    },
    {
        title: "其他",
        subnav: [
            {
                title: "其他男歌手",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 1,
                    area: 0,
                },
                selectId: 5001
            },
            {
                title: "其他女歌手",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 2,
                    area: 0,
                },
                selectId: 5002
            },
            {
                title: "其他合/乐队",
                url: "/discover/artist/cat",
                // params是发送请求的参数
                params: {
                    type: 3,
                    area: 0,
                },
                selectId: 5003
            },
        ],
    },
];