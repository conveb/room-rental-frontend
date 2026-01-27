import { GoHomeFill } from "react-icons/go";

export default function BacktoHome() {
  return (
    <div>
      <a
        href="/"
        className="inline-block mt-2 md:mt-4  text-xs md:text-sm text-white bg-black hover:underline p-2  rounded-lg"
      >
        <GoHomeFill size={18}/>
      </a>
    </div>
  );
}