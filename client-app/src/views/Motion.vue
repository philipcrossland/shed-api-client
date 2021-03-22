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
        <tr v-for="motion in motions" v-bind:key="motion.id">
          <td></td>
          <td>{{ motion.sensedUtcDateTime }}</td>
          <td>{{ motion.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { ApiResult } from "@/models/api-result";
import { MotionSensed } from "@/models/motion-sensed";

@Component({
  components: {
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
    const url = `/motionsensor?page=${this.page}&pageSize=${this.pageSize}`;

    axios.get<ApiResult<MotionSensed>>(url).then((x) => {
      this.motions = x.data.results;
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