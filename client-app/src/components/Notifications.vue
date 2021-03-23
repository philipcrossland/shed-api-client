<template>
  <div>
    <button
      @click="toggleNotifications"
      v-bind:class="{ 'has-notifications': notifications.length }">
      <font-awesome-icon v-if="!hasUnreadNotifications" :icon="['far', 'bell']" />
      <font-awesome-icon v-if="hasUnreadNotifications" :icon="['fas', 'bell']" />
    </button>
    <nav v-if="notifications.length" v-bind:class="{ shown: showNotifications }" 
    role="navigation">
    <div>Notifications</div>
      <ul>
        <li v-for="(notification, index) in notifications" v-bind:key="index" title="Motion Sensed">
          <font-awesome-icon :icon="['fas', 'user-ninja']" /><div>{{ notification.utcDateTime }}<small>{{ notification.name }}</small></div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBell as faSolidBell, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import * as signalR from "@microsoft/signalr";
import {
  NotificationType,
  RealtimeNotification,
} from "@/models/realtime-notification";

library.add(faBell, faSolidBell, faUserNinja);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
  data: () => ({
    showNotifications: false,
    hasUnreadNotifications: false,
    notifications: [],
  }),
})
export default class Notifications extends Vue {
  showNotifications!: boolean;
  hasUnreadNotifications!: boolean;
  notifications!: RealtimeNotification[];

  mounted(): void {
    const baseUrl: string = process.env.VUE_APP_API_BASE_URL as string;
    const hubUrl = `${baseUrl}/realtimehub`;

    let connection = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();

    connection.on("motionsensed", (sensorName) => {
      this.notifications.push(
        new RealtimeNotification(
          NotificationType.MotionSensed,
          sensorName,
          new Date().toISOString()
        )
      );

      this.hasUnreadNotifications = true;
    });

    connection.start().then(() => console.log("SignalR connection started"));
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;

    if (this.showNotifications) this.hasUnreadNotifications = false;
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

button.has-notifications {
  color: rgba(#fff, 0.8);
  transform: translate3d(0, 0, 0);
  animation: shake 1s;
  cursor: pointer;
}

nav {
    opacity: 0;
    position: absolute;
    right: 0.5rem;
    top: 3.5rem;
    background-color: #2980b9;
    border: 1px #dee2e6 solid;
    border-top-left-radius: 0.2em;
    border-top-right-radius: 0.2em;
    box-shadow: 0.25em 0.25em 0.25em #dee2e6;
    transition: opacity 0.2s;
    visibility: hidden;

  > div {
    color: rgba(#fff, 0.6);
    text-transform: uppercase;
    padding: 0.25em;
  }

  ul {
    list-style: none;
    padding: 0.25em;
    margin: 0;
    background-color: #fff;
    min-width: 200px;
  }

  ul li {
    padding: 0.1em;
  }
}

li div {
  padding-left: 0.5em;
  display: inline;
}

nav.shown {
  opacity: 1;
  visibility: visible;
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
