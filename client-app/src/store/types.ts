import { ApiResult } from "@/models/api-result";
import { MotionSensed } from "@/models/motion-sensed";

export interface AppState {
    motionResults: ApiResult<MotionSensed>;
}