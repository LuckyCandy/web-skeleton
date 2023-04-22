import { defineStore } from "pinia";
import userApi from "~/api/user";

interface UserState {
  id: string | null
  name: string | null
  token: string | null
  expire: string | null
}

const storagePrefix = 'jnc-cd-'

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    id: localStorage.getItem(storagePrefix + "id"),
    name: localStorage.getItem(storagePrefix + "name"),
    token: localStorage.getItem(storagePrefix + "token"),
    expire: localStorage.getItem(storagePrefix + "expire"),
  }),
  actions: {
    login(credentials: { telephone: string; password: string }) {
        // return userApi.login(credentials.telephone, credentials.password).then((data) => {
        //     //mock
        //     this.setUserData({
        //         id: "1", name: "Damon", token: "12121"
        //     })
        // })
        setTimeout(() => {
            this.setUserData({
                id: "1", name: "Damon", token: "12121", expire: Date.now() + 3600000 + ""
            })
        }, 3000);
    },
    logout() {
      localStorage.removeItem(storagePrefix + "id");
      localStorage.removeItem(storagePrefix + "name");
      localStorage.removeItem(storagePrefix + "token");
      localStorage.removeItem(storagePrefix + "expire");

      this.$patch({ id: null, name: null, token: null, expire: null });
    },
    setUserData(data: { id: string, name: string; token: string, expire: string}) {
      localStorage.setItem(storagePrefix + "id", data.id);
      localStorage.setItem(storagePrefix + "name", data.name);
      localStorage.setItem(storagePrefix + "token", data.token);
      localStorage.setItem(storagePrefix + "expire", data.expire)
      this.$patch({ id: data.id, name: data.name, token: data.token, expire: data.expire });
    },
  },
});