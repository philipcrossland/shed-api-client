<template>
  <button
    @click="hasUnreadNotifications = !hasUnreadNotifications"
    v-bind:class="{ 'has-unread-notifications': hasUnreadNotifications }"
  >
    <font-awesome-icon v-if="!hasUnreadNotifications" :icon="['far', 'bell']" />
    <font-awesome-icon v-if="hasUnreadNotifications" :icon="['fas', 'bell']" />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBell as faSolidBell } from "@fortawesome/free-solid-svg-icons";
import * as signalR from "@microsoft/signalr";

library.add(faBell, faSolidBell);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
  data: () => ({
    hasUnreadNotifications: false,
  }),
})
export default class Notifications extends Vue {
  hasUnreadNotifications!: boolean;

  mounted(): void {
    const baseUrl: string = process.env.VUE_APP_API_BASE_URL as string;
    const hubUrl = `${baseUrl}/realtimehub`;

    let connection = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();

    connection.on("motionsensed", (sensorName) => {
      this.hasUnreadNotifications = true;
      console.log(`Motion Sensed: ${sensorName}`);
    });

    connection.start().then(() => console.log("SignalR connection started"));
  }
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
  transform: translate3d(0, 0, 0);
  animation: shake 1s;
  cursor: pointer;
}

@keyframes shake {
  20%,
  80% {
    transform: translate3d(1px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-3px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(3px, 0, 0);
  }
}
</style>
