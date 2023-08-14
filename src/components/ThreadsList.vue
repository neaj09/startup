

<template>

  <h1>ChatCopro'</h1>

  <div class="chat-feed">
    <ul class="feed">
      <li class="feedItem" v-for="thread in threads" :key="thread._id">
        <h2>{{ thread.title }}</h2>
        <p class="feedAuthor">le {{formatDate(thread.createdAt)}} par {{ thread.author.name }}</p>
        <!-- <p class="feedContent">{{ thread.content }}</p> -->
        <button class="btn" @click="showThread(thread._id)">Ouvrir le fil</button>
      </li>
    </ul>
    <ThreadCommentsModal :threadId="selectedThreadId" :showModal="showModal" @close="closeModal" />
    <CreateThreadModal :showModal="showCreateThreadModal" @close="showCreateThreadModal = false" />
  </div>

  <div class="action-footer">
    <button class="btn" @click="showCreateThreadModal = true">
      <img src="../assets/icons/edit.png" style="width: 30px">
    </button>
  </div>
</template>

<script>
import { chatService } from '@/services/chat.service';
import ThreadCommentsModal from './ThreadCommentsModal.vue';
import CreateThreadModal from './CreateThreadModal.vue';

import { formatDate } from '../_helpers/Format-date';
import socketService from '../_helpers/socketService';

export default {
  components: {
    ThreadCommentsModal,
    CreateThreadModal
  },
  data() {
    return {
      threads: [],
      showModal: false,
      selectedThreadId: null,
      showCreateThreadModal: false
    };
  },

  methods: {
    formatDate,


    fetchThreads() {
      chatService.getAllThreads()
        .then(({ data }) => {
          this.threads = data;
        })
        .catch(error => {
          console.error("An error occurred while fetching threads:", error);
          // Affichez éventuellement un message d'erreur à l'utilisateur ici
        });
    },

    showThread(threadId) {
      this.selectedThreadId = threadId;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedThreadId = null;
    }
  },

mounted() {
  this.fetchThreads();

  socketService.connect();
  socketService.onThreadChange((change) => {
    console.log('changement thread')
    // Traitez le changement ici, par exemple, rechargez les threads
    this.fetchThreads();
  });
},
beforeDestroy() {
  socketService.disconnect();
},
  
};
</script>

<style scoped>


.chat-feed {
  margin-bottom: 11px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 80%;
  width: 96%;
  align-items: center;

}

.feed {
  display: flex;
  width: 95%;
  flex-direction: column-reverse;
  align-items: center;
}

.feedItem {
  background-color: #ffffff61;
  display: block;
  width: 90%;
  border-radius: 14px;
  box-shadow: 0px 2px 2px 0px #75234114;
  padding: 10px 0 10px 0;
  margin-bottom: 8px;

}


.action-footer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  width: 100%;
}


</style>