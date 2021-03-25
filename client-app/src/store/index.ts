import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import axios from "axios";
import { ApiResult } from '@/models/api-result'
import { MotionSensed } from '@/models/motion-sensed'
import { AppState } from './types';

Vue.use(Vuex)

const store: StoreOptions<AppState> = {
  state: {
    motionResults: new ApiResult<MotionSensed>()
  },
  mutations: {
    SET_MOTIONRESULTS(state, motionResults) {
      state.motionResults = motionResults;
    }
  },
  getters: {
    motionResults: state => state.motionResults.results,
    currentPage: state => state.motionResults.page,
    totalPages: state => state.motionResults.totalPages
  },
  actions: {
    getSensedMotion(state, { page, pageSize }) {

      const url = `/motionsensor?page=${page}&pageSize=${pageSize}`;

      axios.get<ApiResult<MotionSensed>>(url).then((x) => {
        state.commit('SET_MOTIONRESULTS', x.data);
      });

    }
  }
};

export default new Vuex.Store(store);
