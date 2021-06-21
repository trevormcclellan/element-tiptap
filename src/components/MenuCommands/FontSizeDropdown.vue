<template>
  <!-- <el-dropdown
    placement="bottom"
    trigger="click"
    @command="toggleFontSize"
  >
    <command-button
      :enable-tooltip="et.tooltip"
      :tooltip="et.t('editor.extensions.FontSize.tooltip')"
      :readonly="et.isCodeViewMode"
      icon="text-width"
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
      icon="fas fa-text-width"
    />
    </template>
      <!-- default size -->
      <b-dropdown-item-button
        @click="toggleFontSize(defaultSize)"
        :class="{
          'el-tiptap-dropdown-menu__item--active': activeFontSize === defaultSize,
        }"
        class="el-tiptap-dropdown-menu__item"
      >
        <span data-font-size="default">{{ et.t('editor.extensions.FontSize.default') }}</span>
      </b-dropdown-item-button>

      <b-dropdown-item-button
        v-for="fontSize in fontSizes"
        :key="fontSize"
        @click="toggleFontSize(fontSize)"
        :class="{
          'el-tiptap-dropdown-menu__item--active': fontSize === activeFontSize,
        }"
        class="el-tiptap-dropdown-menu__item"
      >
        <span :data-font-size="fontSize">{{ fontSize }}</span>
      </b-dropdown-item-button>
  </b-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue } from 'vue-property-decorator';
import { MenuData } from 'tiptap';
//import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import { DEFAULT_FONT_SIZE, findActiveFontSize } from '@/utils/font_size';
import CommandButton from './CommandButton.vue';

@Component({
  components: {
    // [Dropdown.name]: Dropdown,
    // [DropdownMenu.name]: DropdownMenu,
    // [DropdownItem.name]: DropdownItem,
    CommandButton,
  },
})
export default class FontSizeDropdown extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly editorContext!: MenuData;

  defaultSize = DEFAULT_FONT_SIZE;

  @Inject() readonly et!: any;

  private get editor () {
    return this.editorContext.editor;
  }

  private get fontSizes () {
    return this.editor.extensions.options.font_size.fontSizes;
  }

  private get activeFontSize (): string {
    return findActiveFontSize(this.editor.state);
  }

  private toggleFontSize (size: string) {
    if (size === this.activeFontSize) {
      this.editorContext.commands.font_size(DEFAULT_FONT_SIZE);
    } else {
      this.editorContext.commands.font_size(size);
    }
  }
};
</script>
