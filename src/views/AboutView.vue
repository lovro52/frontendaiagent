<template>
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
