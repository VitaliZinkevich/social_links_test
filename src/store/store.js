import Vue from 'vue';
import Vuex from 'vuex';
import { Loading } from 'element-ui';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    token: 'Token db85852a1a615bdcf663aedfa88cc5ffb1e19c7e',
    loading: null,
    accounts: []
  },
  actions:{
    getClientAccounts(context) {
      context.dispatch ('startLoading')
      return new Promise ((resolve) => {
        return setTimeout (() => {
          context.commit ('SET_ACCOUNTS', [
            {
              "id": 11,
              "balance": "0.00",
              "actions": [
                  
              ]
            },
            {
            "id": 12,
            "balance": "0.00",
            "actions": [
                
            ]
            },
            {
                "id": 1,
                "balance": "0.00",
                "actions": [
                    1
                ]
            },
            {
                "id": 2,
                "balance": "1000.00",
                "actions": [
                    2
                ]
            },
            {
                "id": 3,
                "balance": "10000.00",
                "actions": [
                    3
                ]
            },
            {
                "id": 4,
                "balance": "9900.00",
                "actions": [
                    4
                ]
            },
            {
                "id": 5,
                "balance": "9900.00",
                "actions": [
                    5
                ]
            },
            {
                "id": 6,
                "balance": "10000.00",
                "actions": [
                    6
                ]
            },
            {
                "id": 7,
                "balance": "9900.00",
                "actions": [
                    7
                ]
            },
            {
                "id": 8,
                "balance": "0.00",
                "actions": []
            },
            {
                "id": 9,
                "balance": "0.00",
                "actions": []
            },
            {
                "id": 10,
                "balance": "0.00",
                "actions": []
            }
         ])
          context.dispatch ('stopLoading');
         resolve ();
        }, 2000)
      })
    },
    startLoading() {
      this.loading = Loading.service({
        lock: true,
        text: 'Загрузка...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    stopLoading () {
      this.loading.close();
    }
  },
  mutations: {
    SET_ACCOUNTS(state, payload) {
      state.accounts = payload;
    }
  },
  getters: {
    token(state) {
      return state.token;
    },
    accounts (state) {
      return state.accounts;
    }
  }
});

export { store };
