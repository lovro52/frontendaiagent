<template>
  <div class="ai-chat">
    <div class="chat-window">
      <div class="chat-header">
        <h1><i class="fas fa-robot"></i> Ask the AI</h1>
      </div>
      <div class="chat-input">
        <input v-model="question" placeholder="Enter your question here" />
        <button @click="askAi"><i class="fas fa-paper-plane"></i> Ask</button>
        <div v-if="answer" class="answer-box">
          <h2>Answer:</h2>
          <p>{{ answer }}</p>
        </div>
        <h2>Upload Files</h2>
        <div class="upload-section">
          <input type="file" @change="onFileChange" multiple />
          <button @click="uploadFiles">
            <i class="fas fa-upload"></i> Upload
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      question: "",
      answer: null,
      files: [],
    };
  },
  methods: {
    async askAi() {
      try {
        const response = await axios.post("http://localhost:5000/api/ask_ai", {
          question: this.question,
        });
        this.answer = response.data.answer;
      } catch (error) {
        console.error("Error asking AI:", error);
      }
    },
    onFileChange(event) {
      this.files = event.target.files;
    },
    async uploadFiles() {
      try {
        const formData = new FormData();
        for (let i = 0; i < this.files.length; i++) {
          formData.append("files", this.files[i]);
        }
        await axios.post("http://localhost:5000/api/upload_files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Files uploaded successfully");
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    },
  },
};
</script>

<style scoped>
.ai-chat {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(120deg, #e2f0f1 0%, #c7dfe6 100%);
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
}

.ai-chat::before {
  content: "";
  position: absolute;
  top: 10%;
  left: -100px;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  animation: rotate 10s infinite linear;
}

.ai-chat::after {
  content: "";
  position: absolute;
  bottom: 10%;
  right: -100px;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  animation: rotate 12s infinite linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.chat-window {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(
    135deg,
    #42b983,
    #3a506b
  ); /* Navbar Gradient Background */
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  text-align: center;
  color: #ffffff; /* Text Color for contrast */
}

.chat-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.chat-header h1 {
  font-size: 24px;
  display: flex;
  align-items: center;
}

.chat-header i {
  margin-right: 10px;
}

.chat-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chat-input input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.chat-input button {
  padding: 12px 20px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.chat-input button i {
  margin-right: 5px;
}

.chat-input button:hover {
  background-color: #0056b3;
}

.answer-box {
  margin-top: 20px;
  background-color: #ffffff; /* Light background for readability */
  color: #333333; /* Dark text for contrast */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow to make it stand out */
  text-align: left; /* Align text to the left for better readability */
}

.upload-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-section input[type="file"] {
  margin-bottom: 10px;
}

.upload-section button {
  background-color: #28a745;
}

.upload-section button:hover {
  background-color: #218838;
}

h2 {
  margin-bottom: 10px;
}
</style>

<!-- <template>
  <div class="ai-chat">
    <h1>Ask the AI</h1>
    <input v-model="question" placeholder="Enter your question here" />
    <button @click="askAi">Ask</button>
    <div v-if="answer">
      <h2>Answer:</h2>
      <p>{{ answer }}</p>
    </div>
    <h2>Upload Files</h2>
    <input type="file" @change="onFileChange" multiple />
    <button @click="uploadFiles">Upload</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      question: "",
      answer: null,
      files: [],
    };
  },
  methods: {
    async askAi() {
      try {
        const response = await axios.post("http://localhost:5000/api/ask_ai", {
          question: this.question,
        });
        this.answer = response.data.answer;
      } catch (error) {
        console.error("Error asking AI:", error);
      }
    },
    onFileChange(event) {
      this.files = event.target.files;
    },
    async uploadFiles() {
      try {
        const formData = new FormData();
        for (let i = 0; i < this.files.length; i++) {
          formData.append("files", this.files[i]);
        }
        await axios.post("http://localhost:5000/api/upload_files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Files uploaded successfully");
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    },
  },
};
</script>

<style scoped>
.ai-chat {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

input[type="file"] {
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  margin: 10px;
}

h2 {
  margin-top: 20px;
}
</style>
 -->
