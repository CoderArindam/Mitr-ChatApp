import ChatHeader from "@/components/chat/ChatHeader";
import ChatList from "@/components/chat/ChatList";
import StorySection from "@/components/chat/StorySection";
import Sidebar from "@/components/global/Sidebar";

const Chat = () => {
  return (
    <div>
      <ChatHeader />
      <ChatList />
      <Sidebar />
    </div>
  );
};

export default Chat;
