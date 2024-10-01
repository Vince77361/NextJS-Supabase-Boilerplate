import api from "@/lib/api/axiosConfig";
import Link from "next/link";

const fetchData = async () => {
  const res = await api.get("/api/test");
  return res.data;
};

export default async function Home() {
  const r = await fetchData();
  return (
    <>
      <h1 className="font-bold text-4xl">This is Main Page</h1>
      <p className="text-xl">fetched message for test: {r.message}</p>
      <div className="flex gap-x-4">
        <Link href="/profile" className="text-white">
          내 정보 확인하기
        </Link>
        <Link href="/board" className="text-white">
          board로 이동하기
        </Link>
      </div>
    </>
  );
}
