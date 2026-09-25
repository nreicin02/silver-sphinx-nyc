import { ChatCircle } from "@phosphor-icons/react/dist/ssr";
import { smsAbout } from "@/lib/contact";

export function InquireButtons({ pieceName }: { pieceName: string }) {
  return (
    <div className="mt-8">
      <a href={smsAbout(pieceName)} className="btn btn-solid w-full sm:w-auto sm:min-w-[240px]"><ChatCircle size={16} /> Contact</a>
    </div>
  );
}
