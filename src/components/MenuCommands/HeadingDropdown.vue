<template>
  <!-- <el-dropdown
    placement="bottom"
    trigger="click"
    @command="i => i > 0
      ? editorContext.commands.heading({ level: i })
      : editorContext.commands.paragraph()
    "
  > -->
  <b-dropdown
    variant="link"
    toggle-class="text-decoration-none b-tiptap-dropdown" no-caret
    slot="dropdown"
  >
  <template #button-content>
    <command-button
      :is-active="isHeadingActive()"
      :enable-tooltip="et.tooltip"
      :tooltip="et.t('editor.extensions.Heading.tooltip')"
      :readonly="et.isCodeViewMode"
      icon="fas fa-heading"
    />
    </template>
      <b-dropdown-item-button
        @click="editorContext.commands.paragraph()"
        :class="{
          'el-tiptap-dropdown-menu__item--active': editorContext.isActive.paragraph(),
        }"
        class="el-tiptap-dropdown-menu__item"
      >
        <span>{{ et.t('editor.extensions.Heading.buttons.paragraph') }}</span>
      </b-dropdown-item-button>
      <b-dropdown-item-button
        v-for="i in level"
        :key="i"
        @click="editorContext.commands.heading({ level: i })"
        :class="{
          'el-tiptap-dropdown-menu__item--active': isHeadingActive(i),
        }"
        class="el-tiptap-dropdown-menu__item"
      >
        <component
          :is="'h' +i"
          data-item-type="heading"
        >
          {{ et.t('editor.extensions.Heading.buttons.heading') }} {{ i }}
        </component>
      </b-dropdown-item-button>
  </b-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue } from 'vue-property-decorator';
import { MenuData } from 'tiptap';
//import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import { isHeadingActive } from '@/utils/heading';
import CommandButton from './CommandButton.vue';

@Component({
  components: {
    // [Dropdown.name]: Dropdown,
    // [DropdownMenu.name]: DropdownMenu,
    // [DropdownItem.name]: DropdownItem,
    CommandButton,
  },
})
export default class HeadingDropdown extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly editorContext!: MenuData;

  @Inject() readonly et!: any;

  private get editor () {
    return this.editorContext.editor;
  }

  private get level () {
    return this.editor.extensions.options.heading.level;
  }

  private isHeadingActive (level: number): boolean {
    return isHeadingActive(this.editor.state, level);
  }
};
</script>
