<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :title="
      optionsAccountOperation.type === 1
        ? `Пополнение счета № ${optionsAccountOperation.id}`
        : `Спсиание со счета № ${optionsAccountOperation.id}`
    "
    :visible="optionsAccountOperation.visible"
    width="50%"
    :before-close="handleClose"
  >
    <template v-if="optionsAccountOperation.visible">
      <el-form
        v-if="optionsAccountOperation.type === 1"
        :model="addForm"
        status-icon
        :rules="rulesAddForm"
        ref="addForm"
      >
        <el-form-item label="Сумма внесения" prop="amount">
          <el-input
            type="text"
            v-model="addForm.amount"
            autocomplete="off"
            :clearable="true"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-form
        v-if="optionsAccountOperation.type === 2"
        :model="removeForm"
        status-icon
        :rules="rulesRemoveForm"
        ref="removeForm"
      >
        <el-form-item label="Сумма списание" prop="amount">
          <el-input
            type="text"
            v-model="removeForm.amount"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="Товар" prop="merchant">
          <el-input
            type="text"
            v-model="removeForm.merchant"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleOk(optionsAccountOperation.type)"
          >Провести</el-button
        >
        <el-button @click="handleClose()">Отмена</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "AccountOperationModal",
  data() {
    return {
      addForm: { amount: null },
      rulesAddForm: {
        amount: [
          {
            required: true,
            validator: this.amountValidator,
            trigger: "change",
          },
        ],
      },
      removeForm: { amount: null, merchant: null },
      rulesRemoveForm: {
        amount: [
          {
            required: true,
            validator: this.amountValidator,
            trigger: "change",
          },
        ],
        merchant: [
          {
            required: true,
            type: "string",
            trigger: "change",
            message: "Введите товар.",
          },
        ],
      },
    };
  },
  computed: {
    optionsAccountOperation() {
      return this.$store.getters.accountOperationModal;
    },
  },
  methods: {
    amountValidator(rule, value, callback) {
      if (isNaN(parseInt(value, 10))) {
        callback(new Error("Внесите сумму."));
        return;
      } else {
        callback();
      }
    },
    handleClose() {
      if (this.optionsAccountOperation.type === 1) {
        this.$refs.addForm.resetFields();
      }
      if (this.optionsAccountOperation.type === 2) {
        this.$refs.removeForm.resetFields();
      }
      this.$store.dispatch("operationModal", {
        visible: false,
      });
    },
    handleOk(type) {
      if (type === 1) {
        this.handleAddAmount();
      }
      if (type === 2) {
        this.handleRemoveAmount();
      }
    },
    handleAddAmount() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch("handleAddAmount");
          this.handleClose();
        }
      });
    },
    handleRemoveAmount() {
      this.$refs.removeForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch("handleRemoveAmount");
          this.handleClose();
        }
      });
    },
  },
};
</script>
