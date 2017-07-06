export default {
    state: {
        province: [],      //省列表
        currentProvince: [],    //当前页面展示的省列表
        originProvince: [],     //拷贝省列表
        currentPage: 1,    //当期页码
        pageSize: 5,     //页面显示条数
        ruleForm: {
            id: '',
            name: ''
        },
        loadingShow: true           //loading状态
    },
    getters: {
        //计算场景 
        //计算分页每页的数据
        // getCurrentPageData(state) {
        //     // const list = state.province.filter((item, index) => {
        //     //     // return (index >= (state.pageSize * (state.currentPage -1)) && index <= (state.pageSize * state.currentPage) - 1) 
        //     //     return item.id !== '110000'
        //     // })
        //     // console.log(list)
        //     console.log(`当前是${state.currentPage}页`)
        //     let list = [];
        //     state.province.forEach((item, index) => {
        //         if (index >= ((state.currentPage -1) * (state.pageSize)) && index < (state.currentPage) * (state.pageSize)) {
        //             list.push(item)
        //         }
        //     })
        //     console.log(list)
        //     return list;
        // }
    },
    //类似redux中的reducer
    mutations: {
        //获取微信接口
        getProvinceSuccess(state, payload) {
            let list = [];
            payload.forEach((item, index) => {
                if (index >= ((state.currentPage -1 ) * (state.pageSize)) && index < (state.currentPage) * (state.pageSize)) {
                    list.push(item)
                }
            })
            state.originProvince = payload;
            Object.assign(state, {
                province: payload,
                currentProvince: list,
                totalPage: Math.ceil(payload.length / state.pageSize),
                loadingShow: false
            })
        },
        //改变页码
        currentPageChange(state, payload) {
            Object.assign(state, {
                currentPage: payload
            })
        },
        //获取当前页码数据
        getCurrentPageData(state, payload) {
            console.log(`当前是${state.currentPage}页`)
            let list = [];
            state.province.forEach((item, index) => {
                if (index >= ((payload -1) * (state.pageSize)) && index < (payload) * (state.pageSize)) {
                    list.push(item)
                }
            })
            Object.assign(state, {
                currentProvince: list
            })
        },
        //删除记录
        deleteRecord(state, payload) {
            let province = state.province.filter((item) => {
                return item.id !== payload;
            })
            console.log(province)
            let list = [];
            province.forEach((item, index) => {
                if (index >= ((state.currentPage -1 ) * (state.pageSize)) && index < (state.currentPage) * (state.pageSize)) {
                    list.push(item)
                }
            })
            Object.assign(state, {
                province: province,
                currentProvince: list,
                originProvince: state.province
            })
        },
        //添加记录
        addData(state, payload) {
            //判断id是否存在
            let list = state.province.filter((item) => {
                return item.id == payload.id
            })
            if (list.length == 0) {
                //加入表格
                // var { id, name } = payload;
                var id = payload.id;
                var name = payload.name;
                let _list = [];
                state.province.push({
                    id: id, 
                    name: name
                })
                state.originProvince = state.province;
                state.province.forEach((item, index) => {
                    if (index >= ((state.currentPage -1 ) * (state.pageSize)) && index < (state.currentPage) * (state.pageSize)) {
                        _list.push(item)
                    }
                })
                state.currentProvince = _list;
                //guanbi
            } else {
                alert('该id已存在，请重新输入')
            }
        },
        //显示loading
        loadingShow(state, payload) {
            Object.assign(state, {
                loadingShow: true,
                currentProvince: []
            })
        },
        //隐藏loading
        loadingHide(state, payload) {
            Object.assign(state, {
                loadingShow: false,
                currentProvince: payload,
                province: payload,
            })
        }, 
        //搜索值为空时 回复全部记录
        cover: function (state, payload) {
            let list = [];
            state.originProvince.forEach((item, index) => {
                if (index >= ((state.currentPage -1 ) * (state.pageSize)) && index < (state.currentPage) * (state.pageSize)) {
                    list.push(item)
                }
            })
            Object.assign(state, {
                currentProvince: list,
                loadingShow: false
            })
        }
    },
    //类似effects异步
    actions: {
        getData({ commit, state }) {
            console.log('请求数据')
            fetch('/api/getProvince')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                commit('getProvinceSuccess', data)
            }) 
        },
        searchData({ commit, state }, search) {
            commit('loadingShow')
            console.log(search)
            if (search == '') {
                // commit('cover')
            } else {
                setTimeout(function () {
                    let list = state.province.filter((item, index) => {
                        return (item.name.indexOf('search') > -1 || search.indexOf(item.name) > -1)
                    })
                    commit('loadingHide', list)
                }, 1000)
            }
        }
    }
}