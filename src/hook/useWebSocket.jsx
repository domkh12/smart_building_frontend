import { useEffect, useRef, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/feature/auth/authSlice";
import {useGetUserProfileQuery} from "../redux/feature/auth/authApiSlice.js";

const useWebSocket = (destination) => {
  const socketClient = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const token = useSelector(selectCurrentToken);
  const {data: user} = useGetUserProfileQuery("profileList");

  const connect = async () => {
    setLoading(true);
    if (socketClient.current) {
      // console.warn("WebSocket connection already exists.");
      setLoading(false);
      return;
    }

    socketClient.current = Stomp.over(
      () => new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws`)
    );

    // close console debug
    socketClient.current.debug = () => {};

    socketClient.current.connect(
      { Authorization: `Bearer ${token}`, id: user.id },
      () => onConnected(destination),
      onError
    );
  };

  const onConnected = (destination) => {
    // console.log("Connected successfully to WebSocket for user:", uuid);
    setLoading(false);
    socketClient.current.subscribe(destination, async (message) => {
      const update = JSON.parse(message.body);
      setMessages(update);
    });
  };

  const onError = (err) => {
    console.log("Failed to connect to WebSocket:", err);
    setError(err);
    setLoading(false);
  };

  useEffect(() => {
    if (!user?.id || !token) return;

    connect();

    return () => {
      if (socketClient.current) {
        socketClient.current.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
        socketClient.current = null;
      }
    };
  }, [user?.id, token]);

  return { loading, error, messages };
};

export default useWebSocket;
