import React, { useState } from "react";

function ChatbotBox() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
  ]);
  const changeHandler = (e) => {
    setText(e?.target?.value);
  };
  const handleSendMessage = async () => {
    if (text.trim() === "") return;
    try {
      // replace with your Url
      const response = await fetch('https://example.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setMessages([
        ...messages,
        {
          user: "User",
          question: text,
          answer: data?.message || "I'm here to help! Ask me anything.",
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }

    setText("");
  };

  return (
    <div className="chat-container">
      <h1 className="chat-header">Chatbot</h1>
      <div className="chat-history">
        {messages && messages.length > 0 ? (
          messages.map((item, ind) => {
            return (
              <div key={item?.question} className="question">
                <b>{item?.question || ""}</b>
                <p className="answer">{item?.answer || ""}</p>
              </div>
            );
          })
        ) : (
          <div className="question">
            <p>No chat found.</p>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          onChange={(e) => changeHandler(e)}
          value={text}
          placeholder="Type your message..."
          id="user-input"
        />
        <button className="button" onClick={() => handleSendMessage()}>Send</button>
      </div>
    </div>
  );
}

export default ChatbotBox;
