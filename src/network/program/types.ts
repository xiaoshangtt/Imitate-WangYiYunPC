export interface IProgramCommentType {
    code: number;
    cnum: number;
    userId: number;
    topComments: any[];
    moreHot: boolean;
    hotComments: any[];
    commentBanner: null;
    comments: any[];
    total: number;
    more: true;
}

export interface IProgramDetailType {
    code: number;
    program: any[];
}