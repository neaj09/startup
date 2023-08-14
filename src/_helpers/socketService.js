import io from 'socket.io-client';

const socket = io(process.env.VUE_APP_SOCKET_URL || 'http://localhost:3000');

const socketService = {
  connect: () => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });
  },

  onThreadChange: (callback) => {
    socket.on('threadChange', (change) => {
      callback(change);
    });
  },

  onCommentChange: (callback) => {
    socket.on('commentChange', (change) => {
      callback(change);
    });
  },


  offCommentChange: (callback) => {
    socket.off('commentChange', callback);
  },

  
  emitEvent: (eventName, data) => {
    socket.emit(eventName, data);
  },

  disconnect: () => {
    socket.disconnect();
  },
};

export default socketService;
