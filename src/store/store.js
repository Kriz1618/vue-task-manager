import { reactive } from "vue";

const store = reactive({
  userData: null,
  logout() {
    localStorage.removeItem('user');
  },
  login(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
    this.userData = userData;
    location.reload();
  },
  getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  isUserLogged() {
    const user = this.getUserData();

    if (!user) {
      return false;
    }

    return true;
  }
});

export default store;