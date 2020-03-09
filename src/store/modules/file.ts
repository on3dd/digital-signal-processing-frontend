import axios from "axios";

export default {
  state: {},
  mutations: {},
  actions: {
    async processFile({commit}: any, files: FileList) {
      const data = new FormData();

      for (const file of files) {
        console.log(file);
        data.append('file', file)
      }

      const response = await axios.post("http://localhost:8080/api/file", data);
      console.log(response);
    }
  },
  getters: {}
}