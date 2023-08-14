<template>
    <div v-if="showModal && thread" class="modal">
        <div class="modal-content">


            <div class="feed-header">
                <h3 class="feed-title">{{ thread.title }}</h3>
                <span class="close btn" @click="closeModal">&times;</span>
            </div>
            <div class="chatCopro">



            <div class="feedCopro">
                <div class="feedItem" v-for="comment in comments" :key="comment._id">

                    <h3 class="author-comment">{{ comment.author.name }}</h3>
                    <p class="comment-content">{{ comment.content }}</p>
                </div>
            </div>
        </div>
        <div class="action-footer">
                <textarea class="sender" v-model="newComment.content"></textarea>
                <button class="btn" @click="addComment"><img class="send-icon" src="../assets/icons/send.png" alt="Icône Envoyez" style="
    height: 27px"/></button>
            </div>
    </div>
    </div>
</template>
  
<script>
import { chatService } from "@/services/chat.service";
import socketService from '../_helpers/socketService';

export default {
    props: {
        threadId: {
            type: [String, null],
            required: true
        },
        showModal: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            comments: [],
            thread: null,
            newComment: {
                content: "",
                date: "",
            },
        };
    },

    watch: {
        showModal: {
            handler: "fetchComments",
            immediate: true
        }
    },

    methods: {
        fetchComments() {
            if (!this.showModal) return;

            chatService.getThreadById(this.threadId).then(response => {
                this.thread = response.data;
                this.comments = response.data.comments;


            });
        },

        addComment() {

            if (!this.newComment.content.trim()) return; // Vérifie que le commentaire n'est pas vide

            const currentDate = new Date();
            this.newComment.date = currentDate

            // Appellez votre service pour sauvegarder le commentaire
            chatService.createComment(this.threadId, this.newComment).then(response => {
                this.newComment.content = ''; // Réinitialisez le champ de commentaire

            });
        },

        closeModal() {
            this.thread = null,
                this.$emit("close");
        }
    },

    mounted() {

        socketService.onCommentChange((change) => {

            // Traitement du changement: rechargez les commentaires
            console.log('changement comment')
            this.fetchComments();
        });

    },

    beforeDestroy() {

        socketService.offCommentChange(this.handleCommentChange);
    },

};
</script>


  
<style scoped>

.modal {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #916f6f;
    flex-direction: column;
    align-items: center;
}

.modal-content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding-right: 7px;
    height: 100%;
    align-items: center;
    overflow: auto;
}

.feed-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
    padding-left: 10px;
    padding-bottom: 16px;
    border-bottom: solid 2px #fda2a7;
}

.close {
    font-family: monospace;
    font-size: 34px;
    padding: 3px 10px;
    cursor: pointer;
}

.feed-title {
    color: #fda2a7;
    font-size: 2em;
    padding-right: 11px;
}

.feed-comment {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.author-comment {
    margin-bottom: 0;
    padding-top: 5px;
    padding-left: 16px;
    padding-bottom: 5px;
    text-align: left;
    font-size: 1em;
    color: #ffffff;
}

.comment-content {
    color: #835c58;
    box-sizing: border-box;
    display: block;
    width: 100%;
    border-radius: 14px;
    padding: 5px 8px 5px 8px;
    text-align: end;
}

.chatCopro {
    /* margin-bottom: 11px; */
    /* display: flex; */
    flex-direction: column;
    overflow: auto;
    height: 80%;
    width: 100%;
    /* padding: 0 0px 0px 0px; */
    /* box-sizing: border-box; */
    align-items: center;

}

.feedCopro {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

}

.feedItem {
    background-color: #ffffff61;
    display: block;
    width: 92%;
    border-radius: 14px;
    padding: 5px 0 5px 0;
    margin-bottom: 8px;
}

.action-footer {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: 26px 10px 26px 10px;
    box-sizing: border-box;
}

.sender{
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
