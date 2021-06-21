<template>
  <div>
    <command-button
      :command="openEditLinkDialog"
      :enable-tooltip="et.tooltip"
      :tooltip="et.t('editor.extensions.Link.edit.tooltip')"
      icon="fas fa-edit"
    />

    <!-- <el-dialog
      :title="et.t('editor.extensions.Link.edit.control.title')"
      :visible.sync="editLinkDialogVisible"
      :append-to-body="true"
      width="400px"
      custom-class="el-tiptap-edit-link-dialog"
    > -->
    <b-modal
      :title="et.t('editor.extensions.Link.edit.control.title')"
      :v-model="editLinkDialogVisible"
      modal-class="el-tiptap-edit-link-dialog"
    >
      <!-- <el-form
        :model="linkAttrs"
        label-position="right"
        size="small"
      > -->
      <b-form>
        <b-form-group
          :label="et.t('editor.extensions.Link.edit.control.href')"
          label-for="href-input"
        >
          <b-form-input
            id="href-input"
            v-model="linkAttrs.href"
            autocomplete="off"
          />
          </b-form-group>
        <!-- </el-form-item> -->

        <b-form-checkbox v-model="linkAttrs.openInNewTab">
            {{ et.t('editor.extensions.Link.edit.control.open_in_new_tab') }}
        </b-form-checkbox>
      </b-form>
      <!-- </el-form> -->

      <template #modal-footer>
        <b-button
          size="sm"
          @click="closeEditLinkDialog"
        >
          {{ et.t('editor.extensions.Link.edit.control.cancel') }}
        </b-button>
        <b-button
          variant="primary"
          size="sm"
          @mousedown.prevent
          @click="updateLinkAttrs"
        >
          {{ et.t('editor.extensions.Link.edit.control.confirm') }}
        </b-button>
      </template>
    </b-modal>
    <!-- </el-dialog> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue } from 'vue-property-decorator';
//import { Dialog, Form, FormItem, Input, Checkbox, Button } from 'element-ui';
import { MenuData } from 'tiptap';
import CommandButton from '../CommandButton.vue';

@Component({
  components: {
    // [Dialog.name]: Dialog,
    // [Form.name]: Form,
    // [FormItem.name]: FormItem,
    // [Input.name]: Input,
    // [Checkbox.name]: Checkbox,
    // [Button.name]: Button,
    CommandButton,
  },
})
export default class EditLinkCommandButton extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly editorContext!: MenuData;

  @Prop({
    type: Object,
    required: true,
  })
  readonly initLinkAttrs!: object;

  @Inject() readonly et!: any;

  linkAttrs = this.initLinkAttrs;
  editLinkDialogVisible = false;

  private updateLinkAttrs () {
    this.editorContext.commands.link(this.linkAttrs);

    this.closeEditLinkDialog();
  }

  private openEditLinkDialog () {
    this.editLinkDialogVisible = true;
  }

  private closeEditLinkDialog () {
    this.editLinkDialogVisible = false;
  }
};
</script>
