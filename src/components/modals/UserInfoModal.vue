<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :visible="optionsError.visible"
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
  },
  methods: {
    handleClose() {
      if (this.optionsError.visible) {
        this.$store.dispatch("errorModal", {
          visible: false,
        });
      }
    },
  },
};
</script>
