<template>
  <div>
    <command-button
      name="link"
      :is-active="editorContext.isActive.link()"
      :readonly="et.isCodeViewMode"
      :command="openAddLinkDialog"
      :enable-tooltip="et.tooltip"
      :tooltip="et.t('editor.extensions.Link.add.tooltip')"
      icon="fas fa-link"
    />
    <b-modal
      :title="et.t('editor.extensions.Link.add.control.title')"
      v-model="addLinkDialogVisible"
      modal-class="el-tiptap-edit-link-dialog"
    >
      <b-form>
        <b-form-group
          :label="et.t('editor.extensions.Link.add.control.href')"
          label-for="href-input"
        >
          <b-form-input
            id="href-input"
            v-model="linkAttrs.href"
            autocomplete="off"
          />
        </b-form-group>
          <b-form-checkbox v-model="linkAttrs.openInNewTab">
            {{ et.t('editor.extensions.Link.add.control.open_in_new_tab') }}
          </b-form-checkbox>
      </b-form>

      <template #modal-footer>
        <b-button
          size="sm"
          @click="closeAddLinkDialog"
        >
          {{ et.t('editor.extensions.Link.add.control.cancel') }}
        </b-button>
        <b-button
          variant="primary"
          size="sm"
          @mousedown.prevent
          @click="addLink"
        >
          {{ et.t('editor.extensions.Link.add.control.confirm') }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';
import { Dialog, Form, FormItem, Input, Checkbox, Button } from 'element-ui';
import { MenuData } from 'tiptap';
import CommandButton from '../CommandButton.vue';

@Component({
  components: {
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button,
    CommandButton,
  },
})
export default class AddLinkCommandButton extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly editorContext!: MenuData;

  @Inject() readonly et!: any;

  linkAttrs = {};

  addLinkDialogVisible = false;

  @Watch('addLinkDialogVisible', { immediate: true })
  onDialogVisibleChange () {
    this.linkAttrs = { href: '', openInNewTab: true };
  }

  private addLink () {
    this.editorContext.commands.link(this.linkAttrs);

    this.closeAddLinkDialog();
  }

  private openAddLinkDialog () {
    this.addLinkDialogVisible = true;
  }

  private closeAddLinkDialog () {
    this.addLinkDialogVisible = false;
  }
};
</script>
