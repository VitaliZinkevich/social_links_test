<template>
  <el-container>
    <el-container>
      <el-header class="header">
        <el-dropdown @command="createAccount()">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="'create account'"
              >Создать счет</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ token }}</span>
      </el-header>

      <el-main>
        <el-table
          :data="tableData"
          :default-sort="{ prop: 'id', order: 'descending' }"
          @row-dblclick="seeAccountOperations"
        >
          <el-table-column label="Пополнить счет" align="center">
            <template v-if="!!scope.row" slot-scope="scope">
              <el-button
                icon="el-icon-circle-plus"
                :plain="true"
                size="mini"
                @click="handleAdd(scope.row.id)"
                >Пополнить</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="Списать со счета" align="center">
            <template v-if="!!scope.row" slot-scope="scope">
              <el-button
                icon="el-icon-remove"
                :plain="true"
                size="mini"
                @click="handleRemove(scope.row.id)"
                >Удалить</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="Номер счета"
            align="center"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="balance"
            label="Баланс счета"
          ></el-table-column>
          <el-table-column label="Операций по счету" align="center">
            <template slot-scope="scope">{{
              scope.row.actions.length ? scope.row.actions + "" : 0
            }}</template>
          </el-table-column>
          <el-table-column label="Пополнить счет" align="center">
            <template v-if="!!scope.row" slot-scope="scope">
              <el-button
                icon="el-icon-delete"
                :plain="true"
                size="mini"
                @click="handleDelete(scope.row.id)"
                >Удалить</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="pagintor-container">
          <el-pagination
            v-show="accounts.length > 10"
            small
            layout="sizes, jumper, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pgnData.currentPage"
            :page-sizes="pgnData.pageSizes"
            :page-size="pgnData.pageSize"
            :page-count="pgnData.pageCount"
            :total="pgnData.total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>
    <UserInfoModal />
    <AccountOperationModal />
  </el-container>
</template>

<script>
import UserInfoModal from "./modals/UserInfoModal.vue";
import AccountOperationModal from "./modals/AccountOperationModal.vue";
export default {
  name: "Dashboard",
  data() {
    return {
      pgnData: {
        currentPage: 1,
        pageSizes: [10, 15, 20, 25],
        pageSize: 10,
        total: 0,
        pageCount: 0,
        curPageCount: 0,
      },
    };
  },
  components: {
    UserInfoModal,
    AccountOperationModal,
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },
    accounts() {
      return this.$store.getters.accounts;
    },
    tableData() {
      let tabData = this.accounts;
      let data = [];
      if (tabData) {
        let start = (this.pgnData.currentPage - 1) * this.pgnData.pageSize;
        let end = start + this.pgnData.pageSize;
        data = tabData.slice(start, end);
      }
      return data;
    },
  },
  watch: {
    tableData: {
      deep: true,
      handler: function(newVal) {
        this.pgnData.curPageCount = newVal.length;
        this.pgnData.total = this.accounts.length;
      },
    },
  },
  methods: {
    handleDelete: function(accId) {
      this.$store.dispatch("confirmModal", {
        visible: true,
        id: accId,
        cd: (state) => {
          if (state) {
            this.$store.dispatch("deleteAccaunt", accId);
          }
        },
      });
    },
    seeAccountOperations(row) {
      console.log(row);
    },
    handleRemove(accId) {
      this.$store.dispatch("operationModal", {
        visible: true,
        type: 2,
        id: accId,
      });
    },
    handleAdd(accId) {
      this.$store.dispatch("operationModal", {
        visible: true,
        type: 1,
        id: accId,
      });
    },
    resetPagination() {
      this.pgnData.currentPage = 1;
    },
    handleSizeChange(val) {
      this.pgnData.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pgnData.currentPage = val;
    },
    createAccount() {
      this.$store.dispatch("createAccount");
    },
  },
  created: async function() {
    try {
      let res = await this.$store.dispatch("getClientAccounts");
      if (res) {
        console.log(res);
      }
    } catch (e) {
      console.log(e);
      let what = await this.$store.dispatch("errorModal", {
        visible: true,
        message: "Не удалось обновить список. Попробуйте позже.",
      });
      if (what) {
        this.$store.dispatch("getClientAccounts");
      }
    }
  },
};
</script>

<style>
.header {
  text-align: right;
  font-size: 16px;
}

.pagintor-container {
  display: flex;
  justify-content: flex-end;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
