import { useAppStore } from "@/store";

const Profile = () => {
  const { userInfo } = useAppStore();
  return (
    <>
      <h1>{userInfo.email}</h1>
    </>
  );
};

export default Profile;
