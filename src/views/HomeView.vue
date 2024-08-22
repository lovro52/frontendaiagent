<template>
  <div class="home">
    <div class="card-container">
      <div
        class="card"
        :class="{ flipped: flippedCard === 'login' }"
        @click="toggleFlip('login')"
        @mouseover="hover = 'login'"
        @mouseleave="hover = null"
      >
        <div class="card-inner">
          <div class="card-front">
            <h2>Login</h2>
          </div>
          <div class="card-back">
            <form @submit.prevent="login">
              <h2>Login</h2>
              <input
                type="text"
                v-model="loginEmailUsername"
                placeholder="Email/Username"
                required
              />
              <input
                type="password"
                v-model="loginPassword"
                placeholder="Password"
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
      <div
        class="card"
        :class="{ flipped: flippedCard === 'register' }"
        @click="toggleFlip('register')"
        @mouseover="hover = 'register'"
        @mouseleave="hover = null"
      >
        <div class="card-inner">
          <div class="card-front">
            <h2>Register</h2>
          </div>
          <div class="card-back">
            <form @submit.prevent="register">
              <h2>Register</h2>
              <input
                type="email"
                v-model="registerEmail"
                placeholder="Email"
                required
              />
              <input
                type="text"
                v-model="registerUsername"
                placeholder="Username"
                required
              />
              <input
                type="password"
                v-model="registerPassword"
                placeholder="Password"
                required
              />
              <input
                type="password"
                v-model="registerPasswordConfirm"
                placeholder="Repeat Password"
                required
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flippedCard: null,
      hover: null,
      loginEmailUsername: "",
      loginPassword: "",
      registerEmail: "",
      registerUsername: "",
      registerPassword: "",
      registerPasswordConfirm: "",
    };
  },
  methods: {
    toggleFlip(card) {
      this.flippedCard = this.flippedCard === card ? null : card;
    },
    login() {
      console.log("Login:", this.loginEmailUsername, this.loginPassword);
      this.$router.push("/chat");
    },
    register() {
      if (this.registerPassword === this.registerPasswordConfirm) {
        console.log(
          "Register:",
          this.registerEmail,
          this.registerUsername,
          this.registerPassword
        );
        this.$router.push("/chat");
      } else {
        alert("Passwords do not match!");
      }
    },
  },
};
</script>

<style scoped>
/* Ensure no gap or overflow on the page */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f0f0 25%, #d1e8e4 100%);
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.home::before {
  content: "";
  position: absolute;
  top: -50px;
  left: -50px;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  animation: floating 6s infinite ease-in-out;
}

.home::after {
  content: "";
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  animation: floating 8s infinite ease-in-out;
}

@keyframes floating {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 20px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  width: 80%;
  max-width: 1000px;
}

.card {
  width: 350px;
  height: 400px;
  perspective: 1000px;
  cursor: pointer;
  position: relative; /* Ensure proper stacking */
}

.card-inner {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 15px;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background: linear-gradient(
    135deg,
    #42b983,
    #3a506b
  ); /* Consistent background */
  color: #ffffff; /* Text color for contrast */
}

.card-back {
  transform: rotateY(180deg);
}

.card-back h2 {
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input {
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #218838;
}
</style>
