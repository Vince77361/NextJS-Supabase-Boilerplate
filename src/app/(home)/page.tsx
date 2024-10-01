import Link from "next/link";

export default function Home() {
  return (
    <>
      <p className="font-bold text-4xl">This is Main Page</p>
      <Link href="/profile" className="text-white">
        내 정보 확인하기
      </Link>
    </>
  );
}
