import Vue from "vue";
import Vuex from "vuex";
import { Loading } from "element-ui";
import axios from "axios";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    token: "Token db85852a1a615bdcf663aedfa88cc5ffb1e19c7e",
    loading: null,
    accounts: [],
    modals: {
      errorModal: {
        visible: false,
        message: "",
      },
      confirmModal: {
        visible: false,
      },
      accountOperationModal: {
        visible: false,
        type: 0,
      },
    },
  },
  actions: {
    deleteAccaunt(context, id) {
      console.log("deleteAccaunt", context, id);
    },
    handleAddAmount() {
      console.log("handleAddAmount");
    },
    handleRemoveAmount() {
      console.log("handleRemoveAmount");
    },

    async createAccount(context) {
      try {
        await axios.post(
          "/user",
          {},
          { headers: { Autarization: context.getters.token } }
        );
      } catch (e) {
        context.dispatch("errorModal", {
          visible: true,
          message: "Не удалось создать счет. Попробуйте позже.",
        });
      }
    },
    getClientAccounts(context) {
      // try {
      //   let res = await
      //   if (res) {
      //     console.log(res);
      //   }
      // } catch (e) {
      //   console.log(e);
      //   this.$store.dispatch("errorModal", {
      //     visible: true,
      //     message: "Не удалось обновить список. Попробуйте позже.",
      //   });
      // }
      context.dispatch("startLoading");
      return new Promise((resolve /*reject*/) => {
        return setTimeout(() => {
          context.commit("SET_ACCOUNTS", [
            {
              id: 11,
              balance: "0.00",
              actions: [],
            },
            {
              id: 12,
              balance: "0.00",
              actions: [],
            },
            {
              id: 1,
              balance: "0.00",
              actions: [1],
            },
            {
              id: 2,
              balance: "1000.00",
              actions: [2],
            },
            {
              id: 3,
              balance: "10000.00",
              actions: [3],
            },
            {
              id: 4,
              balance: "9900.00",
              actions: [4],
            },
            {
              id: 5,
              balance: "9900.00",
              actions: [5],
            },
            {
              id: 6,
              balance: "10000.00",
              actions: [6],
            },
            {
              id: 7,
              balance: "9900.00",
              actions: [7],
            },
            {
              id: 8,
              balance: "0.00",
              actions: [],
            },
            {
              id: 9,
              balance: "0.00",
              actions: [],
            },
            {
              id: 10,
              balance: "0.00",
              actions: [],
            },
          ]);
          context.dispatch("stopLoading");
          resolve();
          // if (false) {
          //   resolve()
          // }
          // reject()
          // context.dispatch ('stopLoading');
          // throw new Error ()
        }, 2000);
      });
    },
    startLoading() {
      this.loading = Loading.service({
        lock: true,
        text: "Загрузка...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    stopLoading() {
      this.loading.close();
    },
    errorModal(context, options) {
      context.commit("OPEN_ERROR_DIALOG", options);
    },
    operationModal(context, options) {
      context.commit("OPEN_OPERATION_DIALOG", options);
    },
    confirmModal(context, options) {
      context.commit("OPEN_CONFIRM_DIALOG", options);
    },
  },
  mutations: {
    SET_ACCOUNTS(state, payload) {
      state.accounts = payload;
    },
    OPEN_ERROR_DIALOG(state, options) {
      state.modals.errorModal = options;
    },
    OPEN_OPERATION_DIALOG(state, options) {
      state.modals.accountOperationModal = options;
    },
    OPEN_CONFIRM_DIALOG(state, options) {
      state.modals.confirmModal = options;
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
    accounts(state) {
      return state.accounts;
    },
    errorModal(state) {
      return state.modals.errorModal;
    },
    accountOperationModal(state) {
      return state.modals.accountOperationModal;
    },
    confirmModal(state) {
      return state.modals.confirmModal;
    },
  },
});

export { store };
