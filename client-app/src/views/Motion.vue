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
      <tr>
        <td>1</td>
        <td>20/03/2021 12:34:21</td>
        <td>Shed - Indoor</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Motion extends Vue {}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
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
</style>>