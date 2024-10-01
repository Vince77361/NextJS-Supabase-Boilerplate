import Link from "next/link";

export default async function Home() {
  return (
    <>
      <h1 className="font-bold text-4xl">This is Main Page</h1>
      <Link href="/profile" className="text-white">
        내 정보 확인하기
      </Link>
    </>
  );
}
