import Image from "next/image";
import Link from "@/src/components/Link";

type Props = {
  children: React.ReactNode;
};

export default function HomeLayout(props: Props) {
  return (
    <>
      <div className="text-center h-[75vh] flex items-center justify-center">
        <div className="absolute -z-50 w-full h-full mb-4">
          <Image
            src="/home-banner-bg.png"
            className="object-cover"
            alt="home banner"
            fill
          />
          <div className="absolute inset-0 bg-home-banner-gradient z-1"></div>
        </div>
        <div className="flex items-center justify-center flex-col px-10 text-bgDefault z-10">
          <h1>Yazılım ihtiyaçlarınız için</h1>
          <h3>deneyimli çözüm ortağınız!</h3>
          <p className="mt-5">
            Deneyimli yazılım ve destek ekibi alışık olduğunuz güvenilir, hızlı
            ve çözüm odaklı hizmetlerine devam etmek için Optimus Yazılım'da bir
            araya geldi.
          </p>
          <Link
            href="/"
            className="px-4 py-2 bg-txtSubtitle/25 min-w-[200px] rounded-lg border border-white mt-10 shadow-md hover:opacity-90 transition"
          >
            Detaylı Bilgi
          </Link>
        </div>
      </div>
      {props.children}
    </>
  );
}
