import React from "react";

// Example chat data

const ChatList = () => {
  const chats = [
    {
      id: 1,
      type: "group",
      name: "Weekend Plan",
      time: "11:30 PM",
      lastMessage: "is there any plan on this Weekend",
      profileImg: "assets/images/profile/p8.png",
      messageType: "text",
      status: "online",
      mediaType: null, // No media
    },
    {
      id: 2,
      type: "private",
      name: "Albert Flores",
      time: "Just Now",
      lastMessage: "This is nice, I love it",
      profileImg: "assets/images/profile/p2.png",
      messageType: "text",
      status: "online",
      mediaType: null, // No media
      highlight: true,
      read: true, // Read message
    },
    {
      id: 3,
      type: "private",
      name: "Ann Thomas",
      time: "12:55 AM",
      lastMessage: "What are you doing now?",
      profileImg: "assets/images/profile/p3.png",
      messageType: "text",
      status: "online",
      mediaType: null, // No media
      unreadCount: 1,
      highlight: true,
    },
    {
      id: 4,
      type: "private",
      name: "Guy Hawkins",
      time: "Yesterday",
      lastMessage: "Typing...",
      profileImg: "assets/images/profile/p9.png",
      messageType: "text",
      status: "online",
      statusType: "typing",
      mediaType: null, // No media
      highlight: true,
    },
    {
      id: 5,
      type: "private",
      name: "Edward Turner",
      time: "13/12/2023",
      lastMessage: "Sent you image",
      profileImg: "assets/images/profile/p5.png",
      messageType: "media",
      mediaType: "image",
      status: "offline",
      unreadCount: 1,
    },
    {
      id: 6,
      type: "group",
      name: "Great Thoughts",
      time: "11:30 PM",
      lastMessage: "This is COOL",
      profileImg: "assets/images/profile/p10.png",
      messageType: "text",
      status: "offline",
      mediaType: null, // No media
    },
    {
      id: 7,
      type: "private",
      name: "Joseph James",
      time: "11/12/2023",
      lastMessage: "This is COOL",
      profileImg: "assets/images/profile/p6.png",
      messageType: "text",
      status: "offline",
      mediaType: null, // No media
    },
    {
      id: 8,
      type: "private",
      name: "Video Chat",
      time: "3:45 PM",
      lastMessage: "Sent you a video",
      profileImg: "assets/images/profile/p7.png",
      messageType: "media",
      mediaType: "video",
      status: "online",
      unreadCount: 2,
    },
    {
      id: 9,
      type: "private",
      name: "Voice Message",
      time: "2:20 PM",
      lastMessage: "Sent you a voice message",
      profileImg: "assets/images/profile/p8.png",
      messageType: "media",
      mediaType: "voice",
      status: "online",
    },
    {
      id: 10,
      type: "private",
      name: "Image Chat",
      time: "12:00 PM",
      lastMessage: "Sent you an image",
      profileImg: "assets/images/profile/p9.png",
      messageType: "media",
      mediaType: "image",
      status: "online",
    },
    {
      id: 11,
      type: "private",
      name: "Guy Hawkins",
      time: "Yesterday",
      lastMessage: "Typing...",
      profileImg: "assets/images/profile/p9.png",
      messageType: "text",
      status: "online",
      statusType: "typing",
      mediaType: null, // No media
      highlight: true,
    },
  ];
  return (
    <section className="chat-section">
      <div className="custom-container">
        <h6 className="content-color fw-medium">Chat ({chats.length})</h6>
        <ul className="chat-list">
          {chats.map((chat) => (
            <li key={chat.id}>
              <a
                href={
                  chat.type === "group"
                    ? "group-chat.html"
                    : "private-chat.html"
                }
                className="chat-list-box"
              >
                <div className="chat-list-image">
                  <img
                    className="img-fluid img"
                    src={chat.profileImg}
                    alt="profile"
                  />
                </div>
                <div className="chat-details">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="name">{chat.name}</h5>
                    <h6
                      className={
                        chat.time === "Just Now" ? "success-color" : ""
                      }
                    >
                      {chat.time}
                    </h6>
                  </div>
                  <div className="content">
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      {chat.messageType === "text" && (
                        <p>
                          {chat.highlight && chat.statusType === "typing" ? (
                            <span className="typing success-color fw-semibold">
                              Typing
                              <span />
                              <span />
                              <span />
                            </span>
                          ) : (
                            <>
                              {chat.read ? (
                                <img
                                  className="img-fluid icon"
                                  src="assets/images/svg/tick-all.svg"
                                  alt="tick-all"
                                />
                              ) : null}
                              <span>{chat.lastMessage}</span>
                            </>
                          )}
                        </p>
                      )}
                      {chat.messageType === "media" &&
                        chat.mediaType === "image" && (
                          <img
                            className="img-fluid icon"
                            src="assets/images/svg/gallery.svg"
                            alt="image"
                          />
                        )}
                      {chat.messageType === "media" &&
                        chat.mediaType === "video" && (
                          <img
                            className="img-fluid icon"
                            src="assets/images/svg/video.svg"
                            alt="video"
                          />
                        )}
                      {chat.messageType === "media" &&
                        chat.mediaType === "voice" && (
                          <img
                            className="img-fluid icon"
                            src="assets/images/svg/voice.svg"
                            alt="voice"
                          />
                        )}
                      {chat.unreadCount > 0 && (
                        <h6 className="count">{chat.unreadCount}</h6>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ChatList;
