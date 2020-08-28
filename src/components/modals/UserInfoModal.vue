<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :visible="optionsError.visible || optionsConfirm.visible"
    width="50%"
    :before-close="handleClose"
  >
    <template v-if="optionsError.visible">
      <el-alert
        :title="optionsError.message"
        type="error"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">OK</el-button>
      </span>
    </template>

    <template v-if="optionsConfirm.visible">
      <el-alert
        :title="`Действительно удалить счет номер ${optionsConfirm.id} ?`"
        type="warning"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDeleteOk()">Да</el-button>
        <el-button @click="handleDeleteClose()">Отмена</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "UserInfoModal",
  data() {
    return {};
  },
  computed: {
    optionsError() {
      return this.$store.getters.errorModal;
    },
    optionsConfirm() {
      return this.$store.getters.confirmModal;
    },
  },
  methods: {
    handleDeleteOk() {
      this.optionsConfirm.cd(true);
      this.handleClose();
    },
    handleDeleteClose() {
      this.optionsConfirm.cd(false);
      this.handleClose();
    },
    handleClose() {
      if (this.optionsError.visible) {
        this.$store.dispatch("errorModal", {
          visible: false,
        });
      } else {
        this.$store.dispatch("confirmModal", {
          visible: false,
        });
      }
    },
  },
};
</script>
