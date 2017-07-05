import axios from 'axios';
export default {
    state: {
        list: {
            name: '获取中国的省列表'
        }
    },
    mutations: {
        testSth(state) {
            alert(1)
        }
    },
    actions: {
        getProvince({ commit, state }, url) {
            console.log(url)
            axios({
                method: 'get',
                url: url
                })
                .then((res) => {
                    // console.log(res.request.response)
                })
        },
    }
}