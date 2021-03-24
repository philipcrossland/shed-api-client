export enum NotificationType {
    MotionSensed = 0
}

export class RealtimeNotification {

    constructor(public type: NotificationType, public name: string, public utcDateTime: string) {

    }

}