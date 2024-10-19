(function () {
 // Retrieve the chatbotId from the global window object
 var chatbotId = window.chatbotId || "default"; 
 var allowedDomain = window.allowedDomain || "";

 // Ensure the chatbotId exists
 if (!chatbotId) {
   console.error("No chatbot ID provided.");
   return;
 }

 // Extract the current domain from the website
 var currentDomain = window.location.hostname;

 // Validate if the bot ID matches the expected domain (based on the logic you used to generate botId)
 // Assuming the bot ID is generated from the domain using the same logic as in the frontend.
// var domainFromBotId = atob(chatbotId.replace("bot-", ""));

 if (!currentDomain.includes(domainFromBotId)) {
   console.error("Domain mismatch: the chatbot cannot be initialized for this domain.");
   return;
 }
// Add Google Fonts link for Roboto to the document head
var fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
document.head.appendChild(fontLink);
// Inject global style to remove :focus-visible outline
var style = document.createElement('style');
style.innerHTML = `
  .input-widget-chat:focus-visible {
    outline: 2px solid #009A73;
  }
    @keyframes pulse-ring {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 154, 115, 0.5);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(0, 154, 115, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(0, 154, 115, 0);
      }
    }

    .pulse-effect {
      animation: pulse-ring 1.5s infinite;
    }
      /* Custom scrollbar */
    #chatArea::-webkit-scrollbar {
      width: 8px;
      background-color: #f1f1f1; /* Scrollbar background */
      border-radius: 10px;
    }
    
    #chatArea::-webkit-scrollbar-thumb {
      background-color: #009A73; /* Scroll handle color */
      border-radius: 10px;
    }

    #chatArea::-webkit-scrollbar-thumb:hover {
      background-color: #007a5c; /* Hover color */
    }

    /* Firefox custom scrollbar */
    #chatArea {
      scrollbar-width: thin;
      scrollbar-color: #009A73 #f1f1f1;
    }
`;
document.head.appendChild(style);
  // Create bot icon
  var botIcon = document.createElement('div');
  botIcon.style.position = 'fixed';
  botIcon.style.bottom = '20px';
  botIcon.style.right = '20px';
  botIcon.style.width = '61px';
  botIcon.style.height = '62px';
  botIcon.style.borderRadius = '100%';
  botIcon.style.backgroundImage = 'url("https://jade-sawine-353d8b.netlify.app/botIcon.svg")';  // Replace with correct absolute URL or relative path
  botIcon.style.backgroundSize = 'cover';
  botIcon.style.cursor = 'pointer';
  botIcon.style.zIndex = '1001';
  botIcon.classList.add('pulse-effect');
  document.body.appendChild(botIcon);

  // Create chatbox container (hidden initially)
  var chatBox = document.createElement('div');
  chatBox.style.position = 'fixed';
  chatBox.style.bottom = '100px';
  chatBox.style.right = '20px';
  chatBox.style.width = '390px';
  chatBox.style.height = '540px';
  chatBox.style.boxShadow = '0px 0px 8px 0px rgba(0,0,0,0.15)';
  chatBox.style.borderRadius = '9px';
  chatBox.style.backgroundColor = 'white';
  chatBox.style.display = 'none'; // Initially hidden
  chatBox.style.fontFamily = 'Roboto, sans-serif';  // Apply the Roboto font
  chatBox.style.zIndex = 9999;
  chatBox.id = `chatbot-widget-${chatbotId}`;

  // Create header with minimize button
  var header = document.createElement('div');
  header.style.backgroundColor = '#009A73'; // WhatsApp-like green header
  header.style.color = '#fff';
  header.style.padding = '0 20px';
  header.style.height = '56px';
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.style.borderTopLeftRadius = '9px';
  header.style.fontFamily = 'Roboto, sans-serif';  // Apply the Roboto font
  header.style.borderTopRightRadius = '9px';

  var headerTextContainer = document.createElement('div');
  headerTextContainer.style.display = 'flex';
  headerTextContainer.style.gap = '14px';
  headerTextContainer.style.alignItems = 'center';

  var headerImage = document.createElement('img');
  headerImage.src = "https://jade-sawine-353d8b.netlify.app/botIconWhite.svg"; // Replace with correct absolute URL or relative path
  headerImage.alt = 'botIcon';
  headerImage.style.height = '45px';
  headerImage.style.width = '45px';

  var headerTextWrapper = document.createElement('div');

  var headerText = document.createElement('h3');
  headerText.innerText = `ChatBot - ( ${chatbotId} )`;
  headerText.style.color = 'white';
  headerText.style.fontWeight = '400';
  headerText.style.fontSize = '16px';
  headerText.style.lineHeight = '16px';
  headerText.style.margin = '0px';
  headerText.style.fontFamily = 'Roboto, sans-serif';  // Apply the Roboto font

  var onlineStatusContainer = document.createElement('div');
  onlineStatusContainer.style.display = 'flex';
  onlineStatusContainer.style.gap = '3px';
  onlineStatusContainer.style.alignItems = 'center';
  onlineStatusContainer.style.marginTop = '4px';

  var onlineCircle = document.createElement('span');
  onlineCircle.style.display = 'flex';
  onlineCircle.style.height = '10px';
  onlineCircle.style.width = '10px';
  onlineCircle.style.borderRadius = '10px';
  onlineCircle.style.backgroundColor = '#81C784';
  onlineCircle.style.border = '1px solid white';

  var onlineText = document.createElement('p');
  onlineText.innerText = 'online';
  onlineText.style.color = 'white';
  onlineText.style.fontSize = '13px';
  onlineText.style.lineHeight = '13px';
  onlineText.style.margin = '0px';
  onlineText.style.fontFamily = 'Roboto, sans-serif';  // Apply the Roboto font

  onlineStatusContainer.appendChild(onlineCircle);
  onlineStatusContainer.appendChild(onlineText);
  headerTextWrapper.appendChild(headerText);
  headerTextWrapper.appendChild(onlineStatusContainer);

  headerTextContainer.appendChild(headerImage);
  headerTextContainer.appendChild(headerTextWrapper);

  var minimizeBtn = document.createElement('button');
  minimizeBtn.style.cursor = 'pointer';
  minimizeBtn.style.border = 'none';
  minimizeBtn.style.height = '30px';
  minimizeBtn.style.width = '22px';
  minimizeBtn.style.display = 'flex';
  minimizeBtn.style.alignItems = 'center';
  minimizeBtn.style.backgroundColor = 'transparent';
  minimizeBtn.innerHTML = '<span style="background: white;height: 2px;width: 10px;display: flex;"></span>';

  header.appendChild(headerTextContainer);
  header.appendChild(minimizeBtn);
  chatBox.appendChild(header);

  // Create chat area
  var chatArea = document.createElement('div');
  chatArea.style.backgroundColor = 'white';
  chatArea.style.maxHeight = '360px';
  chatArea.style.height = '360px';
  chatArea.style.minHeight = '360px';
  chatArea.style.overflowY = 'auto';
  chatArea.style.padding = '25px 30px';
  chatArea.style.display = 'flex';
  chatArea.style.boxSizing = 'content-box';
  chatArea.style.flexDirection = 'column';
  chatArea.style.gap = '20px';
  chatArea.id = 'chatArea';

  var userMessage = document.createElement('div');
  userMessage.style.display = 'flex';
  userMessage.style.gap = '16px';

  var userIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  userIconSvg.setAttribute('width', '22');
  userIconSvg.setAttribute('height', '22');
  userIconSvg.setAttribute('viewBox', '0 0 22 22');
  userIconSvg.setAttribute('fill', 'none');
  userIconSvg.innerHTML = `
    <path d="M20.75 9.69446V6.47154C20.75 5.89691 20.5217 5.34581 20.1154 4.93948C19.7091 4.53315 19.158 4.30488 18.5833 4.30488H12.0833V2.88355C12.4138 2.58671 12.625 2.15988 12.625 1.68105C12.625 1.25007 12.4538 0.836744 12.1491 0.531997C11.8443 0.22725 11.431 0.0560455 11 0.0560455C10.569 0.0560455 10.1557 0.22725 9.85096 0.531997C9.54621 0.836744 9.37501 1.25007 9.37501 1.68105C9.37501 2.15988 9.58626 2.58671 9.91667 2.88355V4.30488H3.41667C2.84204 4.30488 2.29094 4.53315 1.88461 4.93948C1.47828 5.34581 1.25001 5.89691 1.25001 6.47154V9.71938L1.17201 9.72479C0.898883 9.74425 0.64329 9.86652 0.456734 10.0669C0.270178 10.2674 0.166528 10.5311 0.166672 10.8049V12.9715C0.166672 13.2589 0.280808 13.5344 0.483973 13.7376C0.687137 13.9407 0.962687 14.0549 1.25001 14.0549V19.4715C1.25001 20.0462 1.47828 20.5973 1.88461 21.0036C2.29094 21.4099 2.84204 21.6382 3.41667 21.6382H18.5833C19.158 21.6382 19.7091 21.4099 20.1154 21.0036C20.5217 20.5973 20.75 20.0462 20.75 19.4715V14.0549C21.0373 14.0549 21.3129 13.9407 21.516 13.7376C21.7192 13.5344 21.8333 13.2589 21.8333 12.9715V10.872C21.8459 10.7039 21.8192 10.5352 21.7553 10.3791C21.5365 9.85046 21.0674 9.72371 20.75 9.69446ZM5.58334 10.8049C5.58334 9.60888 6.31134 8.63821 7.20834 8.63821C8.10534 8.63821 8.83334 9.60888 8.83334 10.8049C8.83334 12.0009 8.10534 12.9715 7.20834 12.9715C6.31134 12.9715 5.58334 12.0009 5.58334 10.8049ZM15.3312 17.3049C14.2468 17.3016 6.66667 17.3049 6.66667 17.3049V15.1382C6.66667 15.1382 14.2511 15.136 15.3355 15.1382L15.3312 17.3049ZM14.7917 12.9715C13.8947 12.9715 13.1667 12.0009 13.1667 10.8049C13.1667 9.60888 13.8947 8.63821 14.7917 8.63821C15.6887 8.63821 16.4167 9.60888 16.4167 10.8049C16.4167 12.0009 15.6887 12.9715 14.7917 12.9715Z" fill="#009A73"/>
  `;

  var userMessageWrapper = document.createElement('div');
  var userMessageBubble = document.createElement('div');
  userMessageBubble.style.background = '#E5F5F1';
  userMessageBubble.style.padding = '13px 15px';
  userMessageBubble.style.color = '#484848';
  userMessageBubble.style.fontSize = '14px';
  userMessageBubble.style.lineHeight = '16px';
  userMessageBubble.style.fontWeight = '400';
  userMessageBubble.style.fontFamily = 'Roboto, sans-serif'; 
  userMessageBubble.style.borderRadius = '0px 9px 9px 9px';
  userMessageBubble.innerText = 'I want a refund';

  var userMessageTime = document.createElement('p');
  userMessageTime.style.color = '#484848';
  userMessageTime.style.fontSize = '12px';
  userMessageTime.style.fontWeight = '300';
  userMessageTime.style.fontFamily = 'Roboto, sans-serif'; 
  userMessageTime.style.lineHeight = '14px';
  userMessageTime.style.marginTop = '6px';
  userMessageTime.innerText = '9:45 AM';

  //userMessageWrapper.appendChild(userMessageBubble);
  //userMessageWrapper.appendChild(userMessageTime);
  //userMessage.appendChild(userIconSvg);
  userMessage.appendChild(userMessageWrapper);
  chatArea.appendChild(userMessage);

  var botResponse = document.createElement('div');
  botResponse.style.background = '#EDEDED';
  botResponse.style.padding = '13px 15px';
  botResponse.style.color = '#484848';
  botResponse.style.fontFamily = 'Roboto, sans-serif'; 
  botResponse.style.fontSize = '14px';
  botResponse.style.lineHeight = '16px';
  botResponse.style.fontWeight = '400';
  botResponse.style.borderRadius = '9px 0px 9px 9px';
  botResponse.innerText = 'Sorry to hear that something went wrong with your order. Please provide the order number for which you want refund.';
  //chatArea.appendChild(botResponse);

  chatBox.appendChild(chatArea);

  // Input area
  var inputBoxWrapper = document.createElement('div');
  inputBoxWrapper.style.display = 'flex';
  inputBoxWrapper.style.alignItems = 'center';
  inputBoxWrapper.style.gap = '14px';
  inputBoxWrapper.style.padding = '14px 20px';
  inputBoxWrapper.style.backgroundColor = '#F2F2F7';
  inputBoxWrapper.style.borderBottomLeftRadius = '9px';
  inputBoxWrapper.style.borderBottomRightRadius = '9px';

  var addIconBtn = document.createElement('button');
  addIconBtn.style.padding = '0px';
  addIconBtn.style.border = 'none';
  addIconBtn.style.cursor = 'pointer';
  addIconBtn.innerHTML = '<img src="https://jade-sawine-353d8b.netlify.app/AddIcon.svg" alt="AddIcon">';  // Replace with correct absolute URL or relative path

  var imageIconBtn = document.createElement('button');
  imageIconBtn.style.padding = '0px';
  imageIconBtn.style.border = 'none';
  imageIconBtn.style.cursor = 'pointer';
  imageIconBtn.innerHTML = '<img src="https://jade-sawine-353d8b.netlify.app/ImageIcon.svg" alt="ImageIcon">';  // Replace with correct absolute URL or relative path

  var inputBox = document.createElement('input');
  inputBox.type = 'text';
  inputBox.style.backgroundColor = 'white';
  inputBox.style.borderRadius = '34px';
  inputBox.style.border = 'none';
  inputBox.style.padding = '14px 18px';
  inputBox.style.fontSize = '16px';
  inputBox.style.color = '#AAAAAA';
  inputBox.style.fontFamily = 'Roboto, sans-serif'; 
  inputBox.placeholder = 'Type a message...';
  inputBox.classList.add('input-widget-chat');

  var sendButton = document.createElement('button');
  sendButton.style.cursor = 'pointer';
  sendButton.style.border = 'none';
  sendButton.style.backgroundColor = 'transparent';
  sendButton.innerHTML = `
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.4214 10.0874C20.4228 10.6346 20.2648 11.1703 19.9668 11.6292C19.6776 12.0926 19.2581 12.4605 18.761 12.6867L4.77637 19.4665C4.38693 19.6621 3.95702 19.7637 3.52121 19.763C3.33839 19.7633 3.15609 19.7435 2.97764 19.7037C2.36711 19.5891 1.81137 19.2765 1.39633 18.8143C0.978305 18.3525 0.721462 17.7675 0.664426 17.1474C0.607401 16.5271 0.753266 15.9052 1.08008 15.3749L4.47988 10.6508C4.55842 10.463 4.59873 10.2614 4.59847 10.0578C4.59884 9.83829 4.54809 9.62175 4.45023 9.42528L1.30738 4.97787C0.982653 4.43777 0.847037 3.80488 0.921941 3.17913C0.989492 2.57827 1.24597 2.01436 1.65446 1.56857C2.06296 1.12279 2.60238 0.818129 3.19507 0.698473C3.79108 0.581605 4.40861 0.6506 4.96414 0.896136L18.8005 7.48817C19.2867 7.72657 19.6963 8.0965 19.9828 8.55596C20.2693 9.01542 20.4212 9.54595 20.4214 10.0874Z" fill="#009A73"/>
    </svg>
  `;

  inputBoxWrapper.appendChild(addIconBtn);
  inputBoxWrapper.appendChild(imageIconBtn);
  inputBoxWrapper.appendChild(inputBox);
  inputBoxWrapper.appendChild(sendButton);
  chatBox.appendChild(inputBoxWrapper);

  document.body.appendChild(chatBox);

  botIcon.addEventListener('click', function () {
    chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
  });

  minimizeBtn.addEventListener('click', function () {
    chatBox.style.display = 'none';
  });

  sendButton.addEventListener('click', function () {
    var userMsg = inputBox.value;
    if (userMsg.trim() !== '') {
      var datetime = new Date().toString();
      var formattedDateTime = datetime.replace(/GMT[^\s]*/, '').replace(/\([^\)]*\)/, '').trim();
      var userMsgDiv = document.createElement('div');
      userMsgDiv.style.display = 'flex';
      userMsgDiv.style.justifyContent = 'flex-end';
      //userMsgDiv.style.textAlign = 'right';
      userMsgDiv.innerHTML = `<div>
        <div style="background: #E5F5F1; padding: 13px 15px; color: #484848; font-size: 14px;line-height: 16px;font-weight: 400;border-radius: 0px 9px 9px 9px; overflow-wrap: anywhere;max-width:fit-content;float:right;">
          ${userMsg}
        </div>
        <p style="color: #484848;font-size: 12px; font-weight: 300;line-height: 14px;margin-top: 6px; float:right; text-align:right;width:100%;">${formattedDateTime}</p>
        </div>
      `;
      chatArea.appendChild(userMsgDiv);
      chatArea.scrollTop = chatArea.scrollHeight;

      setTimeout(function () {
        var botMsgDiv = document.createElement('div');
        //botMsgDiv.style.textAlign = 'left';
        botMsgDiv.innerHTML = `<div>
          <div style="background: #EDEDED; padding: 13px 15px; color: #484848; font-size: 14px;line-height: 16px;font-weight: 400;border-radius: 9px 0px 9px 9px;max-width:fit-content;">
            Sorry to hear that something went wrong with your order. Please provide the order number for which you want a refund.
          </div>
          <p style="color: #484848;font-size: 12px; font-weight: 300;line-height: 14px;margin-top: 6px;">${formattedDateTime}</p>
          </div>
        `;
        chatArea.appendChild(botMsgDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
      }, 1000);

      inputBox.value = ''; // Clear the input
    }
  });

  inputBox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });
})();
