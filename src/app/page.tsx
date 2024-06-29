"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

const Home = () => {
  //sync query string with input
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [input, setInput] = useState(
    searchParams.get("videoSrc") ??
      "https://www.youtube.com/embed/cOLQACygN5A?si=C9m36NeNTYcKNaUT&amp;controls=0"
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (input !== searchParams.get("videoSrc")) {
      router.push(`${pathname}?${createQueryString("videoSrc", input)}`);
    }
  }, [createQueryString, input, pathname, router, searchParams]);

  return (
    <div className="flex flex-col gap-4 px-10 py-10 h-screen">
      <div>
        <label htmlFor="videoSrc" className="font-bold text-sm">
          Link Video
        </label>
        <input
          className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg w-full text-gray-900 text-sm focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <iframe
        className="w-full h-full grow"
        width="100vw"
        height="100vh"
        src={input}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
