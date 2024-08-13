import Background from "../../../public/assets/images/login2.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validateLogin = () => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    } else {
      return true;
    }
  };

  const validateSignUp = () => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (confirmPassword !== password) {
      toast.error("Passwords should match");
    } else {
      return true;
    }
  };

  const handleSignup = async () => {
    if (validateSignUp()) {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        navigate("/profile");
      }
    }
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (response.data.user.id) {
        if (response.data.user.profileSetup) {
          navigate("/chat");
        } else {
          navigate("/profile");
        }
      }
    }
  };

  return (
    <div
      className="h-[100vh] w-[100vw] flex items-center justify-center"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl 
        w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2"
      >
        <div className="flex flex-col gap-10 items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
            <p className="font-medium mt-4">
              Fill in the details to get started with the best chat app
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 
                  border-b-2 rounded-none w-full data-[state=active]:font-semibold 
                  data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 
                  border-b-2 rounded-none w-full data-[state=active]:font-semibold 
                  data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>

              {/* Login Tab Content */}
              <TabsContent className="flex flex-col gap-5 mt-5" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>

              {/* Signup Tab Content */}
              <TabsContent className="flex flex-col gap-5" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  SignUp
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* Add your second column content here, e.g., an image or additional information */}
      </div>
    </div>
  );
};

export default Auth;
