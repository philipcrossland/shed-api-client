<template>
  <div>
    <h2>Motion Sensors</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Motion Detected</th>
          <th>Sensor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(motion, index) in $store.getters.motionResults" v-bind:key="motion.id">
          <td>{{ (index + 1) + ((page - 1) * pageSize) }}</td>
          <td>{{ formatDate(motion.sensedUtcDateTime) }}</td>
          <td>{{ motion.name }}</td>
        </tr>
      </tbody>
    </table>
    <footer>
      <Paginator v-if="$store.getters.motionResults" :currentPage="page" @pageChanged="pageChanged" />
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MotionSensed } from "@/models/motion-sensed";
import Paginator from '@/components/Paginator.vue';
import { DateTime } from 'luxon';

@Component({
  components: {
    Paginator
  },
  data: () => ({
    page: 1,
    pageSize: 20,
    motions: [],
  }),
})
export default class Motion extends Vue {
  page = 1;
  pageSize = 20;
  motions!: MotionSensed[];

  mounted(): void {
    this.pageChanged(1);
  }

  formatDate(utcIsoDate: string) : string {

    return DateTime.fromISO(utcIsoDate).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

  }

  pageChanged(newPage: number): void {

    this.page = newPage;

    this.$store.dispatch("getSensedMotion", {
      page: newPage,
      pageSize: this.pageSize,
    });

  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  counter-reset: row-num;
}

td,
th {
  padding: 0.75rem;
  vertical-align: top;
  text-align: left;
  border-top: 1px solid #dee2e6;
}

thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

tr :first-child {
  text-align: center;
}

footer {
  text-align: end;
}
</style>>