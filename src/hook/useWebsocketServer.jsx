import { Stomp } from "@stomp/stompjs";
import { useEffect, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";

function useWebsocketServer(destination) {
  const socketClient = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(async () => {
    if (destination != null) {
      setLoading(true);
      setError(null); // Reset error on new connection attempt

      try {
        socketClient.current = Stomp.over(
          () => new SockJS(`${import.meta.env.VITE_WB_URL}/ws`)
        );

        socketClient.current.connect(
          {},
          () => onConnected(destination),
          (err) => onError(err)
        );
      } catch (err) {
        console.error("Error during connection:", err);
        setError(err);
        setLoading(false);
        setIsConnected(false);
      }
    }
  }, [destination]);

  const onConnected = (destination) => {
    setLoading(false);
    setIsConnected(true);
    socketClient.current.subscribe(destination, async (message) => {
      const update = JSON.parse(message.body);
      setMessages(typeof update === "string" ? JSON.parse(update) : update);
    });
  };

  const onError = (err) => {
    setLoading(false);
    setIsConnected(false);
    console.error("Failed to connect to WebSocket:", err);
    setError(err);
  };

  const sendMessage = useCallback(
    (message = {}) => {
      if (socketClient.current && socketClient.current.connected) {
        socketClient.current.send(
          destination,
          {},
          JSON.stringify(message)
        );
      } else {
        console.warn("WebSocket is not connected. Message not sent.");
      }
    },
    [destination]
  );

  useEffect(() => {
    connect();

    return () => {
      if (socketClient.current) {
        socketClient.current.disconnect(() => {
          console.log("Disconnected from WebSocket");
          setLoading(true);
        });
        socketClient.current = null;
      }
      setLoading(true);
    };
  }, [connect]);

  return { loading, error, messages, sendMessage, isConnected };
}

export default useWebsocketServer;