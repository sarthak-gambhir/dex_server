const messageForm = document.getElementById("message-form");
const messageFormSubmitButton = document.getElementById(
  "message-form-submit-button"
);
const messageInput = document.getElementById("message-input");

const connectionURLInput = document.getElementById("connection-url-input");
const connStatusValueSpan = document.getElementById("connection-status-value");
const connectWebSocketButton = document.getElementById(
  "connect-websocket-button"
);

const messageList = document.getElementById("message-list");

let ws = null;

const messageHandler = (message) => {
  let li = document.createElement("li");
  li.classList.add("message");

  li.innerText = message.data;
  messageList.appendChild(li);
  console.log(message);
};

const connectWebSocket = () => {
  let connectionUrl = connectionURLInput.value;

  if (connectionUrl.length) {
    ws = new WebSocket("ws://" + connectionUrl);
    ws.onopen = updateConnStatus;
    ws.onclose = updateConnStatus;
    ws.onmessage = messageHandler;
  } else {
    alert(
      "Please enter connection url first.\nThe format is <HOST>:<PORT>.\n\n" +
        "Example: localhost:5000"
    );
  }
};

const disconnectWebSocket = () => {
  ws.close();
};

const updateConnStatus = () => {
  let connStatus = ws?.readyState === 1;

  if (connStatus) {
    connStatusValueSpan.innerText = "Connected";
    connStatusValueSpan.classList = "status-connected";
    connectWebSocketButton.innerText = "Disconnect";
    connectWebSocketButton.onclick = disconnectWebSocket;
    messageInput.disabled = false;
    messageFormSubmitButton.disabled = false;
    connectionURLInput.disabled = true;
  } else {
    connStatusValueSpan.innerText = "Disconnected";
    connStatusValueSpan.classList = "status-disconnected";
    connectWebSocketButton.innerText = "Connect";
    connectWebSocketButton.onclick = connectWebSocket;
    messageInput.disabled = true;
    messageFormSubmitButton.disabled = true;
    connectionURLInput.disabled = false;
  }
};

messageInput.addEventListener("keydown", (e) => {
  e.key === "enter" && messageForm.onsubmit();
});

updateConnStatus();

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message = messageInput.value;
  if (String(message).trim().length > 0) {
    ws.send(message);

    messageInput.value = "";
  }

  messageInput.focus();
});
