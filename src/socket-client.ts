import { io } from "socket.io-client";

const webSocketInstance = io("http://localhost:8080");

webSocketInstance.on("connect", () => {
  console.log(webSocketInstance.id); // x8WIv7-mJelg7on_ALbx
});
webSocketInstance.on("hello", (data) => {
  console.log("Received hello:", data);
});
export { webSocketInstance };
