export default {
    state: {
        projectName: '后台管理系统',
        navList: [
            '前端', '后台'
        ]
    },
    actions: {

    },
    mutations: {
        getUsername: function () {
            return (localStorage.getItem('username'))
        }
    }
}