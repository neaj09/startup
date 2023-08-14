import Axios from "./caller.service";

let getAllThreads = () => {
  return Axios.get('/chat/threads');
}

let getThreadById = (id) => {
  return Axios.get('/chat/threads/' + id);
}

let updateThread = (id, data) => {
  return Axios.put('/chat/threads/' + id, data);
}

let createThread = (data) => {
  return Axios.post('/chat/threads', data);
}

let deleteThread = (id) => {
  return Axios.delete('/chat/threads/' + id);
}

let getAllComments = () => {
  return Axios.get('/chat/comments');
}

let getCommentById = (id) => {
  return Axios.get('/chat/comments/' + id);
}

let updateComment = (id, data) => {
  return Axios.put('/chat/comments/' + id, data);
}

let createComment = (id, data) => {
  return Axios.post('/chat/comments/'+ id, data);
}

let deleteComment = (id) => {
  return Axios.delete('/chat/comments/' + id);
}

export const chatService = {
  getAllThreads,
  getThreadById,
  updateThread,
  createThread,
  deleteThread,
  getAllComments,
  getCommentById,
  updateComment,
  createComment,
  deleteComment
}
