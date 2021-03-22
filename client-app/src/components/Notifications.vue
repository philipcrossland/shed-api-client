<template>
  <button><font-awesome-icon :icon="['far', 'bell']" /></button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell } from "@fortawesome/free-regular-svg-icons";

library.add(faBell);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
})
export default class Notifications extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button {
  font-size: 1.5rem;
  background-color: transparent;
  border: none;
  transition: color 0.4s;
  color: rgba(#fff, 0.4);
}

button:focus {
  outline: none;
}

button.has-unread-notifications {
  color: rgba(#fff, 0.8);
}
</style>
