<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/ai-chat">AI-Chat</router-link>
      <button v-if="isAuthenticated" @click="logout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem("accessToken"), // Check initial authentication state
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("accessToken");
      this.isAuthenticated = false;
      this.$router.push("/");
      alert("Logged out successfully!");
    },
  },
  watch: {
    // Watch for route changes to update authentication state
    $route() {
      this.isAuthenticated = !!localStorage.getItem("accessToken");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #42b983, #3a506b);
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 10px 10px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
  margin: 0 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #ffcb77;
}

nav a.router-link-exact-active {
  color: #ffcb77;
}

nav button {
  background: none;
  border: none;
  color: #ffffff;
  margin-left: 15px;
  cursor: pointer;
  font-size: 16px;
}

nav button:hover {
  color: #ffcb77;
}
</style>
