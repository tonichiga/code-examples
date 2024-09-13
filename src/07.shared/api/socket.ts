/* eslint-disable no-unused-vars */
import io, { Socket } from "socket.io-client";
import { HASH } from "../const";

const isClient = typeof window !== "undefined";

class WebSocket {
  instance: Socket;
  registeredEvents: { [key: string]: (...args: any[]) => void };
  on: (eventName: string, handler: (...params: any[]) => void) => void;
  emit: (...params: any[]) => void;
  off: (eventName: string, handler: (...params: any[]) => void) => void;
  token: string;
  callback: (status: boolean) => void;

  constructor() {
    if (!isClient) return;

    this.instance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      autoConnect: false,
      withCredentials: true,
      reconnectionDelayMax: 4000,
      reconnectionDelay: 4000,
      retries: 3,

      auth: (cb) => {
        cb({ hash: window.Telegram.WebApp.initData || HASH });
        // cb({ token: cookie.getCookie("token") });
      },
    });

    this.instance.on("connect", () => {
      console.log("%c Socket connect ", "color: green");
      this.callback?.(true);
    });

    this.instance.on("reconnect", () => {
      console.log("%c Socket reconnect ", "color: green");
    });

    this.instance.on("disconnect", (reason) => {
      console.log("REASON", reason);
      console.log("%c Socket disconnect ", "color: red");
    });

    this.on = (eventName, handler) => {
      this.instance.on(eventName, handler);
    };

    this.emit = (emitName: string, ...args) => {
      console.log("%c Socket emit ", "color: teal", emitName, ...args);
      this.instance.emit(emitName, ...args);
    };

    this.off = (eventName, listener) => {
      this.instance.off(eventName, listener);
    };

    this.instance.on("disconnected", async (reason) => {
      console.log("REASON", reason);
      if (reason === "invalidToken") {
        try {
          const hash = window.Telegram.WebApp.initData || HASH;
          //   const token = await authApi.refresh(hash);
          //   this.instance.auth = { token: token };
          this.instance.disconnect().connect();
        } catch (error) {}
      }
    });
  }

  connect(callback?: (status: boolean) => void) {
    if (!this.instance.connected) {
      if (callback) {
        this.callback = callback;
      }
      this.instance.connect();
    }
  }
}

const socket = new WebSocket();
export default socket;
