<template>
  <div class="home">
    <div class="intro">
      <h1>Welcome to <span class="highlight">AI Assistant</span></h1>
      <p>
        This <span class="highlight">AI-powered assistant</span> helps you
        upload and analyze documents such as PDFs and CSV files. You can ask
        questions about the content, and the AI will assist you with summaries,
        insights, and much more.
      </p>
      <a
        class="cta-button"
        href="https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/"
        target="_blank"
      >
        Learn More
      </a>
    </div>

    <!-- Show logout button if user is authenticated -->
    <div v-if="isAuthenticated">
      <button @click="logout">Logout</button>
    </div>

    <!-- Show login/register cards if user is not authenticated -->
    <div v-else class="card-container">
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
          <div class="card-back" @click.stop>
            <form @submit.prevent="login">
              <h2>Login</h2>
              <input
                type="text"
                v-model="loginEmailUsername"
                placeholder="Email/Username"
                required
                @click.stop
              />
              <input
                type="password"
                v-model="loginPassword"
                placeholder="Password"
                required
                @click.stop
              />
              <button type="submit" @click.stop>Login</button>
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
          <div class="card-back" @click.stop>
            <form @submit.prevent="register">
              <h2>Register</h2>
              <input
                type="email"
                v-model="registerEmail"
                placeholder="Email"
                required
                @click.stop
              />
              <input
                type="text"
                v-model="registerUsername"
                placeholder="Username"
                required
                @click.stop
              />
              <input
                type="password"
                v-model="registerPassword"
                placeholder="Password"
                required
                @click.stop
              />
              <input
                type="password"
                v-model="registerPasswordConfirm"
                placeholder="Repeat Password"
                required
                @click.stop
              />
              <button type="submit" @click.stop>Register</button>
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
  computed: {
    // Check if the user is authenticated
    isAuthenticated() {
      return !!localStorage.getItem("accessToken");
    },
  },
  methods: {
    toggleFlip(card) {
      this.flippedCard = this.flippedCard === card ? null : card;
    },

    async register() {
      if (this.registerPassword === this.registerPasswordConfirm) {
        const userData = {
          email: this.registerEmail,
          username: this.registerUsername,
          password: this.registerPassword,
        };

        try {
          const response = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          const result = await response.json();

          if (response.ok) {
            console.log("User registered successfully:", result);
            alert("User registered successfully!");
            this.$router.push("/chat");
          } else {
            console.error("Error registering user:", result.error);
            alert("Error registering user: " + result.error);
          }
        } catch (error) {
          console.error("Error during registration:", error);
          alert("An error occurred during registration. Please try again.");
        }
      } else {
        alert("Passwords do not match!");
      }
    },

    async login() {
      const loginData = {
        username: this.loginEmailUsername,
        password: this.loginPassword,
      };

      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("User logged in successfully:", result);
          localStorage.setItem("accessToken", result.access_token);
          alert("Logged in successfully!");
          this.$router.push("/ai-chat");
        } else {
          console.error("Error logging in:", result.error);
          alert("Error logging in: " + result.error);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      }
    },

    logout() {
      localStorage.removeItem("accessToken");
      alert("You have been logged out.");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Your existing styles remain unchanged */
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
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f0f0 25%, #d1e8e4 100%);
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.intro {
  text-align: center;
  margin-bottom: 40px;
  max-width: 800px;
  animation: fadeIn 2s ease-in-out;
}

.intro h1 {
  font-size: 3em;
  margin-bottom: 10px;
  color: #333;
  font-family: "Montserrat", sans-serif;
}

.intro p {
  font-size: 1.4em;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.intro .highlight {
  color: #42b983;
  font-weight: bold;
}

.cta-button {
  padding: 15px 30px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  text-decoration: none; /* Remove underline */
  display: inline-block;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-5px);
  background-color: #218838; /* Optional: Darken on hover */
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
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
