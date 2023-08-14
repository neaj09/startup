<template>
    <div v-if="showModal" class="modal">
    <div class="modal-content">



      <div class="feed-header">
        <h1 class="feed-title">Création d'un sujet</h1>
        <span class="close btn" @click="closeModal">&times;</span>
      </div>

      <label for="title">Titre:</label>
        <input type="text" id="title" v-model="newThread.title" required />
  
      <label for="content">Contenu:</label>
      <textarea id="content" class="input-area" v-model="newThread.content" required></textarea>
  
      <label for="expirationDate">Date d'expiration:</label>
      <input type="date" id="expirationDate" v-model="expirationDate" />

      <label for="comment-content">Commentaire:</label>
  <textarea id="commentContent" class="input-area" v-model="newThread.commentContent" required></textarea>
  
      
    </div>

    <div class="action-footer">
      <button @click="submitNewThread">Créer un thread</button>
    
    </div>


  </div>
  </template>
  
  <script>
  import { chatService } from "@/services/chat.service";
  
  export default {
    props: {
    showModal: {
      type: Boolean,
      default: false
    }
    },
    data() {
      return {
        newThread: {
          title: "",
          content: "",
          expirationDate: "",
          commentContent: ""
        },
        expirationDate: ""
      };
    },
    methods: {
      closeModal() {
      this.$emit("close");
    },

      submitNewThread() {




        // Vérification de la date d'expiration
        if (this.expirationDate) {
          const currentDate = new Date();
          const expirationDateObject = new Date(this.expirationDate);
          expirationDateObject.setHours(currentDate.getHours());
          expirationDateObject.setMinutes(currentDate.getMinutes());
          this.newThread.expirationDate = expirationDateObject;
        }

        // Appel au service pour créer le thread
        chatService.createThread(this.newThread)
          .then(response => {
            // Gérer la réponse du serveur
            console.log("Thread créé avec succès", response.data);
            this.newThread = { title: "", content: "", expirationDate: "" };
            this.expirationDate = "";
            this.closeModal();
          })
          .catch(error => {
            // Gérer l'erreur
            console.error("Erreur lors de la création du thread", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>

  h1{
    color: #fda2a7;;
  }

.modal {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #835c58f5;
    flex-direction: column;
    align-items: center;
}

.modal-content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 86%;
    padding: 0px 8px;
    height: 88%;
    align-items: center;
    overflow: auto;
}

.feed-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 16px;
    border-bottom: solid 2px #fda2a7;
}

.input-area{
  margin: 0px 5px 0px 0px;
    border-radius: 14px;
    font-family: 'Poetsen One';
    padding: 10px;
    font-size: 1em;
    max-width: 100%;
    border: none;
    resize: none;

}


  </style>
  