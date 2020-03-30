<template>
  <div class="info">
    <section class="info__meta">
      <h3 class="info__meta__header">Общая информация</h3>
      <ul class="info__meta__list">
        <li class="info__meta__item">Общее число каналов: {{meta.channels}}</li>
        <li class="info__meta__item">Общее число отсчетов: {{meta.samples}}</li>
        <li class="info__meta__item">Частота дискретизации: {{meta.sampleRate.toFixed(4)}}Гц (шаг между отсчетами {{frequencyToFixed}} сек)</li>
        <li class="info__meta__item">Дата и время начала записи: {{meta.startTime}}</li>
        <li class="info__meta__item">Дата и время окончания записи: {{meta.endTime}}</li>
        <li class="info__meta__item">Длительность: {{meta.recordingLength}}</li>
      </ul>
    </section>
    <section class="info__channels">
      <h3 class="info__channels__header">Информация о каналах</h3>
      <table
          class="info__channels__table"
      >
        <thead>
        <tr class="info__channels__table__row info__channels__table__row-head">
          <th class="info__channels__table__ceil info__channels__table__ceil-head">#</th>
          <th class="info__channels__table__ceil info__channels__table__ceil-head">Имя</th>
          <th class="info__channels__table__ceil info__channels__table__ceil-head">Источник</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(channel, idx) in channels"
            :key="idx"
            class="info__channels__table__row"
        >
          <td class="info__channels__table__ceil">{{idx}}</td>
          <td class="info__channels__table__ceil">{{channel}}</td>
          <td class="info__channels__table__ceil">Исходный файл</td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter} from "vuex-class";
  import {ResponseDataArraySpecMeta} from "@/types/responseDataArray.spec";

  @Component
  export default class FileInfo extends Vue {
    @Getter meta!: ResponseDataArraySpecMeta;
    @Getter channels!: string[];

    get localeStartTime(): string {
      return this.meta.startTime.toLocaleTimeString();
    }

    get localeEndTime(): string {
      return this.meta.endTime.toLocaleTimeString();
    }

    get frequencyToFixed() {
      return (1/this.meta.sampleRate).toFixed(4)
    }
  }
</script>

<style scoped lang="scss">
  @mixin header {
    text-align: center;
  }

  .info {
    &__meta {
      &__header {
        @include header;
      }

      &__list {

      }

      &__item {
        list-style: disc;
        margin-bottom: .25rem;
        line-height: 1.5rem;
      }
    }

    &__channels {
      &__header {
        @include header;
      }

      &__table {
        width: 100%;
        font-size: 1rem;
        border: 1px solid rgba(0,0,0,.1);
        border-spacing: 2px;
        border-collapse: collapse;
        border-radius: 10px;
        /*border: 1px solid rgba(0,0,0,.25);*/

        &__row {
          height: 100%;
          cursor: pointer;
          transition: .1s all ease-out;

          &-head {
            background-color: rgba(0,0,0,.04);
          }

          &:hover {
            background-color: rgba(0,0,0,.04);
          }
        }

        &__ceil {
          padding: .75rem;
          border-top: 1px solid rgba(0,0,0,.1);

          &-head {
            text-align: left;
            border-bottom: 2px solid rgba(0,0,0,.1);
          }
        }
      }
    }

  }
</style>