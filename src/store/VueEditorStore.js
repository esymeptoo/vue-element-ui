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
            // axios({
            //     method: 'get',
            //     url: url
            //     })
            //     .then((res) => {
            //         console.log(res.request.response)
            //     })
            fetch('/api/getProvince', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data)
            })
        },
    }
}