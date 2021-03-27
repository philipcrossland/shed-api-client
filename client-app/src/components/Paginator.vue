<template>
  <div>
    <p>Showing page {{ currentPage }} of {{ $store.getters.totalPages }}</p>
    <button :disabled="currentPage === 1 || $store.getters.totalPages <= 1" @click="$emit('pageChanged', 1)">
      <font-awesome-icon :icon="['fas', 'angle-double-left']" />
    </button>
    <button :disabled="currentPage === 1 || $store.getters.totalPages <= 1" @click="$emit('pageChanged', currentPage - 1)">
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>
    <button :disabled="currentPage === $store.getters.totalPages || $store.getters.totalPages <= 1" @click="$emit('pageChanged', currentPage + 1)">
      <font-awesome-icon :icon="['fas', 'angle-right']" />
    </button>
    <button :disabled="currentPage === $store.getters.totalPages || $store.getters.totalPages <= 1" @click="$emit('pageChanged', $store.getters.totalPages)">
      <font-awesome-icon :icon="['fas', 'angle-double-right']" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleDoubleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(faAngleLeft, faAngleDoubleLeft, faAngleRight, faAngleDoubleRight);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
  props: {
    currentPage: Number
  },
  data: () => ({}),
})
export default class Paginator extends Vue {
  
  currentPage = 1;
  totalPages = 0;

  mounted(): void {
    console.log("Paginator mounted");
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  display: inline;
  padding-right: 1em
}

button {
  font-size: 1.2em;
}
</style>
