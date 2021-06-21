<template>
  <!-- <el-dropdown
    placement="bottom"
    trigger="click"
    @command="toggleFontType"
  >
    <command-button
      :enable-tooltip="et.tooltip"
      :tooltip="et.t('editor.extensions.FontType.tooltip')"
      :readonly="et.isCodeViewMode"
      icon="font"
    /> -->
    <b-dropdown
    variant="link"
    toggle-class="text-decoration-none b-tiptap-dropdown" no-caret
    slot="dropdown"
  >
  <template #button-content>
    <command-button
      :enable-tooltip="et.tooltip"
      :tooltip="et.t('editor.extensions.Heading.tooltip')"
      :readonly="et.isCodeViewMode"
      icon="fas fa-font"
    />
    </template>
      <b-dropdown-item-button
        v-for="name in fontTypes"
        :key="name"
        @click="toggleFontType(name)"
        :class="{
          'el-tiptap-dropdown-menu__item--active': name === activeFontType,
        }"
        class="el-tiptap-dropdown-menu__item"
      >
        <span
          :data-font="name"
          :style="{ 'font-family': name }"
        >{{ name }}</span>
      </b-dropdown-item-button>
  </b-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue } from 'vue-property-decorator';
import { MenuData } from 'tiptap';
//import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import { DEFAULT_FONT_TYPE_MAP, findActiveFontType } from '@/utils/font_type';
import { isPlainObject } from '@/utils/shared';
import Logger from '@/utils/logger';
import CommandButton from './CommandButton.vue';

@Component({
  components: {
    // [Dropdown.name]: Dropdown,
    // [DropdownMenu.name]: DropdownMenu,
    // [DropdownItem.name]: DropdownItem,
    CommandButton,
  },
})
export default class FontTypeDropdown extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly editorContext!: MenuData;

  @Inject() readonly et!: any;

  private get editor () {
    return this.editorContext.editor;
  }

  private get fontTypes () {
    const { fontTypes } = this.editor.extensions.options.font_type;

    if (!isPlainObject(fontTypes)) {
      Logger.error('\'fontTypes\' should be an object');
      return DEFAULT_FONT_TYPE_MAP;
    }

    return fontTypes;
  }

  private get activeFontType (): string {
    return findActiveFontType(this.editor.state);
  }

  private toggleFontType (name: string) {
    if (name === this.activeFontType) {
      this.editorContext.commands.font_type('');
    } else {
      this.editorContext.commands.font_type(name);
    }
  }
};
</script>
