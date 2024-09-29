import LoginModal from "@/components/Modal/LoginModal";
import RegisterModal from "@/components/Modal/RegisterModal";

export default function Home() {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <p className="font-bold text-4xl">This is Main Page</p>
    </>
  );
}
