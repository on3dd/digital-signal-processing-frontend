<template>
  <div>
    <label for="file-input">Открыть</label>
    <input id="file-input" name="file-input" type="file" accept="text/plain" @change="submitFile">
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Action} from "vuex-class";

  @Component
  export default class FileInput extends Vue {
    @Action processFile!: (files: FileList) => void;

    submitFile(evt: InputEvent) {
      const input = evt.target as HTMLInputElement;
      this.processFile(input.files!);
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/nav-item";

  div {
    label {
      @include nav-item;
      white-space: nowrap;
    }

    input[type=file] {
      display: none;
    }
  }
</style>