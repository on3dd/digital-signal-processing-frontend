import axios from "axios";
import {Commit, ModuleTree} from "vuex";
import {ResponseDataArraySpecJSON} from "@/types/responseDataArray.spec";
import {objToStrMap} from "@/utils";

interface FileState {
  file: ResponseDataArraySpecJSON;
}

export default {
  state: {
    file: new ResponseDataArraySpecJSON(),
  },
  actions: {
    async processFile({commit}: {commit: Commit}, files: FileList) {
      const data = new FormData();

      for (const file of files) {
        console.log(file);
        data.append('file', file);
      }

      // Display the key/value pairs
      for (const pair of data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
      }

      const response = await axios.post("http://localhost:8080/api/file", data);
      commit('updateData', response.data);
    }
  },
  mutations: {
    updateData(state: FileState, file: ResponseDataArraySpecJSON) {
      state.file = file;
      console.log('state.file:', state.file);
    }
  },
  getters: {
    file: (state: FileState) => state.file,
    meta: (state: FileState) => state.file.meta,
    channels: (state: FileState) => {
      return Array.from(objToStrMap(state.file.names).values());
    }
  }
} as ModuleTree<{}>;
