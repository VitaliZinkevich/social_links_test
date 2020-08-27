<template>
<el-container style="height: 500px; border: 1px solid #eee">
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Создать счет</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{token}}</span>
    </el-header>
    
    <el-main>
      <el-table :data="accounts">
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
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
      return {
        accounts: []
      }
  },
  computed: {
    token (){
      return this.$store.getters.token;
    }
  },
  mounted: async function () {
    let a = await this.$store.dispatch('getClientAccounts')
    if (a) {
      this.accounts = a;
    }
    
    // .then ( r => {
    //   this.$store.dispatch ('stopLoading');
    //   if (r) {
    //     this.accounts = r;
    //   }
    // });
  }
}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
