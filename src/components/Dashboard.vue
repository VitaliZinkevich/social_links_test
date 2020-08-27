<template>
<el-container>
  <el-container>
    <el-header class="header">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Создать счет</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{token}}</span>
    </el-header>
    
    <el-main>
      <el-table :data="accounts" :default-sort = "{prop: 'id', order: 'descending'}">
        <el-table-column prop="id" label="Номер счета">
        </el-table-column>
        <el-table-column prop="balance" label="Баланс счета">
        </el-table-column>
        <el-table-column label="Операций по счету">
          <template slot-scope="scope">
            {{scope.row.actions.length ? scope.row.actions + '' : 0}}
          </template>
        </el-table-column>
      </el-table>
      <div class="pagintor-container">
        <el-pagination
          v-show="accounts.length > 10"
          small
          layout="prev, pager, next"
          :total="accounts.length">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
      return {
      }
  },
  computed: {
    token (){
      return this.$store.getters.token;
    },
    accounts () {
      return this.$store.getters.accounts;
    }
  },
  created: function () {
    this.$store.dispatch('getClientAccounts');
  }
}
</script>

<style>
  .header {
    text-align: right; 
    font-size: 16px
  }

  .pagintor-container {
    display: flex;
    justify-content: flex-end;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
