import { ref, onMounted, onUnmounted } from 'vue';
import io from 'socket.io-client';

export function useSocket() {
  const socket = ref(null);
  // const endpoint = 'http://localhost:6001';
  // const endpoint = 'wss://os-socket.db.app.br';
  const connect = () => {
    if (!socket.value) {
      socket.value = io(endpoint);
    }
  };

  const listenToNotification = (channel, callback) => {
    if (socket.value) {
      socket.value.on(channel, (message) => {
        callback(message);
      });
    }
  };

  onMounted(() => {
    connect();
  });

  onUnmounted(() => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  });

  return {
    listenToNotification
  };
}