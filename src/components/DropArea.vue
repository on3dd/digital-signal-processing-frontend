<template>
  <div ref="dropArea" class="drop-area">
    <span class="drop-area__text">Перетащите файл сюда</span>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Action} from "vuex-class";

  @Component
  export default class DropArea extends Vue {
    $refs!: {
      dropArea: HTMLDivElement;
    };

    @Action processFile!: (files: FileList) => void;

    mounted() {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        this.$refs.dropArea.addEventListener(eventName, (e: Event) => e.preventDefault(), false);
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        this.$refs.dropArea.addEventListener(eventName, this.highlight, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        this.$refs.dropArea.addEventListener(eventName, this.unhighlight, false);
      });

      this.$refs.dropArea.addEventListener('drop', this.submitDroppedFile, false);
    }

    highlight = () => {
      this.$refs.dropArea.classList.add('highlight')
    };

    unhighlight = () => {
      this.$refs.dropArea.classList.remove('highlight')
    };

    submitDroppedFile = (evt: DragEvent) => {
      const dataTransfer = evt.dataTransfer;
      if (dataTransfer === null) return;

      this.processFile(dataTransfer.files);
    };
  }
</script>

<style scoped lang="scss">
  .drop-area {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border: 3px dashed rgba(0, 0, 0, .2);
    border-radius: 20px;
    color: rgba(0, 0, 0, .25);
    cursor: pointer;
    /*transition: all .1s ease-out;*/

    &.highlight {
      border-color: rgba(0, 0, 0, .3);
      background-color: #fafafa;
      color: rgba(0, 0, 0, .3);
    }

    &__text {
      font-size: 1.5rem;
    }
  }
</style>