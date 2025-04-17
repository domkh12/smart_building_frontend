import { Stomp } from "@stomp/stompjs";
import { useEffect, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import {useSelector} from "react-redux";

function useWebsocketServer(destination) {
  const socketClient = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState({});
  const connect = useCallback(async () => {
    if ( destination != null){
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
      }
    }

  }, [destination]);

  const onConnected = (destination) => {
    setLoading(false);
    socketClient.current.subscribe(destination, async (message) => {
      const update = JSON.parse(message.body);
      setMessages(update);
    });
  };
  // console.log("messages", messages);
  const onError = (err) => {
    setLoading(false);
    console.error("Failed to connect to WebSocket:", err);
    setError(err);
  };

  // Function to send a message
  const sendMessage = useCallback(
    (message = {}) => {
      if (socketClient.current && socketClient.current.connected) {
        socketClient.current.send(
          destination, {},
          JSON.stringify(message)
        );
      } else {
        console.warn("WebSocket is not connected.  Message not sent.");
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
        });
        socketClient.current = null;
      }
    };
  }, [connect]); // Only re-run when connect function changes

  return { loading, error, messages, sendMessage };
}

export default useWebsocketServer;
