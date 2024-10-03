import { div } from "framer-motion/client";
import Image from "next/image";

const Services = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-green-500 text-2xl font-extrabold">
        Czym się wyróżniam?
      </h2>
      <h3 className="text-blue-600 font-semibold text-lg mt-4">
        Wybitną opieką fizjoterapeutyczna!
      </h3>
      <p className="text-center text-green-600 text-sm mt-8">
        Mój zakres usług jest szeroki, a do każdego problemu podchodzę
        indywidualnie. Spróbuj już dziś, a na pewno nie będziesz zawiedziony!
      </p>
      <div className="flex flex-col gap-y-4 xl:flex-row justify-center gap-x-40 mb-6 mt-16 mx-20">
        <div className="flex flex-col items-center border rounded-xl p-4 shadow-lg hover:bg-green-50 hover:shadow-2xl">
          <div className="bg-green-400 flex-none rounded-full p-8 ">
            <Image
              src="/icons/activity.svg"
              alt="activity icon"
              width={100}
              height={100}
            />
          </div>
          <h3 className="mt-5 text-center text-green-500 font-bold text-md drop-shadow-xl">
            Innowacyjne podejście
          </h3>
          <p className="text-center mt-2 text-green-500 drop-shadow-2xl text-sm">
            Twoje problemy rozwiązujemy w sposób kreatywny, poprawny,
            aprzedewszyskitm skuteczny!
          </p>
        </div>
        <div className="flex flex-col items-center border rounded-xl p-4 shadow-lg hover:bg-green-50 hover:shadow-2xl">
          <div className="bg-green-400 flex-none rounded-full p-8">
            <Image
              src="/icons/on-time.svg"
              alt="activity icon"
              width={100}
              height={100}
            />
          </div>
          <h3 className="mt-5 text-center text-green-500 font-bold text-md drop-shadow-xl">
            Innowacyjne podejście
          </h3>
          <p className="text-center mt-2 text-green-500 drop-shadow-2xl text-sm">
            Twoje problemy rozwiązujemy w sposób kreatywny, poprawny,
            aprzedewszyskitm skuteczny!
          </p>
        </div>
        <div className="flex flex-col items-center  border rounded-xl p-4 shadow-lg hover:bg-green-50 hover:shadow-2xl">
          <div className="bg-green-400 flex-none rounded-full p-8">
            <Image
              src="/icons/massage.svg"
              alt="activity icon"
              width={100}
              height={100}
            />
          </div>
          <h3 className="mt-5 text-center text-green-500 font-bold text-md drop-shadow-xl">
            Innowacyjne podejście
          </h3>
          <p className="text-center mt-2 text-green-500 drop-shadow-2xl text-sm">
            Twoje problemy rozwiązujemy w sposób kreatywny, poprawny,
            aprzedewszyskitm skuteczny!
          </p>
        </div>
        <div className="flex flex-col items-center border rounded-xl p-4 shadow-lg hover:bg-green-50 hover:shadow-2xl">
          <div className="bg-green-400 flex-none rounded-full p-8">
            <Image
              src="/icons/rehabilitation-activity.svg"
              alt="activity icon"
              width={100}
              height={100}
            />
          </div>
          <h3 className="mt-5 text-center text-green-500 font-bold text-md drop-shadow-xl">
            Innowacyjne podejście
          </h3>
          <p className="text-center mt-2 text-green-500 drop-shadow-2xl text-sm">
            Twoje problemy rozwiązujemy w sposób kreatywny, poprawny,
            aprzedewszyskitm skuteczny!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
