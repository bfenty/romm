import { defineStore } from "pinia";

export default defineStore("gallerySorting", {
  state: () => ({ active: false, orderBy: "name" }),

  actions: {
    set(value) {
      this.active = value;
    },
  },
});
