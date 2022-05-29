import { computed, ref } from "vue";

// store对象的类型 Store<IRootState> IRootState是在store对象上的state属性的对象，也是createStore传入的对象
import { Store } from "vuex";
import { IRootState } from "@/store/types";

// 路由对象route的类型
import { RouteLocationNormalizedLoaded } from "vue-router";


export function useUserRecord(store: Store<IRootState>, route: RouteLocationNormalizedLoaded) {
    const uid = route?.query?.id || 0;
    const UserRecordType = ref(1);

    const userRecord = computed(() => {
        if (UserRecordType.value == 1) {
            return store.state.user.userRecord?.weekData || [];
        } else if (UserRecordType.value == 0) {
            return store.state.user.userRecord?.allData || [];
        }
        return [];
    });
    const getUserRecordData = () => {
        store.dispatch("user/ac_getUserRecord", {
            uid,
            type: UserRecordType.value,
        });
    }
    const changeUserRecordType = (type: number) => {
        UserRecordType.value = type;
        getUserRecordData();
    };

    const peopleCanSeeMyPlayRecord = computed(
        () => store.getters["user/g_peopleCanSeeMyPlayRecord"]
    );

    getUserRecordData();

    // 如果返回的是数组，那么拿取值的顺序也不能变，不然名称与值对不上，推荐用对象写法
    // return [
    //     uid,
    //     UserRecordType,
    //     userRecord,
    //     peopleCanSeeMyPlayRecord,
    //     changeUserRecordType
    // ];
    return {
        uid,
        UserRecordType,
        userRecord,
        peopleCanSeeMyPlayRecord,
        changeUserRecordType
    };
}