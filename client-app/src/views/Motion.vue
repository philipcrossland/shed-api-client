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
        <tr v-for="motion in $store.getters.motionResults" v-bind:key="motion.id">
          <td></td>
          <td>{{ formatDate(motion.sensedUtcDateTime) }}</td>
          <td>{{ motion.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MotionSensed } from "@/models/motion-sensed";
import { DateTime } from 'luxon';

@Component({
  components: {},
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
    this.$store.dispatch("getSensedMotion", {
      page: this.page,
      pageSize: this.pageSize,
    });
  }

  formatDate(utcIsoDate: string) : string {

    return DateTime.fromISO(utcIsoDate).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

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

tbody tr {
  counter-increment: row-num;
}

tr :first-child {
  text-align: center;
}

tr td:first-child::before {
  content: counter(row-num);
}
</style>>