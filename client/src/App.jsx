import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import AppBarLayout from "./components/layout/AppBarLayout";

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to={"/auth"} />} />
        <Route path="/auth" element={<Auth />} />

        {/* Routes with AppBar layout */}
        <Route element={<AppBarLayout />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
