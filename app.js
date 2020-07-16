// ------------------------------------------ Make a connection with the server --------------------------------------------------------
let socket = io("http://localhost:4500");

// ---------------------------------------------------      Links       ----------------------------------------------------------------
let msg_input = document.querySelector(".form-control");
let send_button = document.querySelector("#button-addon2");
let viewing_screen = document.querySelector(".screen_space");
let audio_alert = new Audio("sounds/msg_tone.mp3");

// ----------------------------------------------------    Join chat    ----------------------------------------------------------------
let user_name = prompt("Please enter your name");
socket.emit("new-user-joined", user_name);

// ---------------------------------------------------- Event Listeners ----------------------------------------------------------------

// On joining the group 
socket.on("user-joined", (data) => {

  let server_message = document.createElement("div");
  server_message.class = "server_line";
  server_message.style = "text-align: center; margin-top: 20px; margin-left: 30%";

  server_message.innerHTML = `<div
    class="server_msg"
    style="
      padding: 10px;
      margin-right: 38%;
      background-color: rgb(185, 214, 20);
      border-radius: 15px;
    "
    >
    ${data} has joined this chat.
  </div>`;

   viewing_screen.append(server_message);
});

// On sending a message 
send_button.addEventListener('click', (e) => {
    e.preventDefault();

    let client_message = document.createElement("div");
    client_message.class = "client_line";
    client_message.style = "text-align: left; margin-top: 20px;"
  
    client_message.innerHTML = `<div
    class="client"
    style="
      padding: 10px;
      margin-left: 65%;
      background-color: rgb(158, 235, 158);
      border-radius: 15px;
    "
    >
    Me: ${msg_input.value}
    </div>`;
  
     viewing_screen.append(client_message);

     if (msg_input.value == "quit") {
        socket.emit("disconnect", "quit");
     } else {
        socket.emit("send", msg_input.value);
     }

     msg_input.value = "";
});

// On receiving a message
socket.on("receive", (data) => {

    let server_message = document.createElement("div");
    server_message.class = "server_line";
    server_message.style = "text-align: left; margin-top: 20px;";
  
    server_message.innerHTML = `<div
    class="server_msg"
    style="
      padding: 10px;
      margin-right: 65%;    
      background-color: rgb(189, 199, 135);
      border-radius: 15px;
    "
    >
    ${data.name}: ${data.message}
    </div>`;
  
     viewing_screen.append(server_message);

     audio_alert.play();
});

// On leaving the group 
socket.on("member-left-group", (data) => {

    let server_message = document.createElement("div");
    server_message.class = "server_line";
    server_message.style = "text-align: center; margin-top: 20px; margin-left: 30%";
  
    server_message.innerHTML = `<div
      class="server_msg"
      style="
        padding: 10px;
        margin-right: 38%;
        background-color: rgb(185, 214, 20);
        border-radius: 15px;
      "
      >
      ${data} has left this chat.
    </div>`;
  
     viewing_screen.append(server_message);
  });
