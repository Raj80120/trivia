"use client";
import React from "react";
import { resultPage } from "@/components";
import Router, { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const points = sessionStorage.getItem("points");
  const userName = sessionStorage.getItem("userName");

  const handleSubmit = () => {
    sessionStorage.clear();
    router.push("/");
  };
  return (
    <div className="flex flex-col items-center mt-[30vh] p-5">
      <h1 className="font-semibold text-[22px] mb-5">Your score</h1>
      <h1 className="font-semibold text-[25px] mb-5">{points}</h1>
      {points === 3 ? (
        <p className="font-semibold text-[25px] mb-5">
          WOW &nbsp;
          {userName}
        </p>
      ) : points == 2 ? (
        <p className="font-semibold text-[25px] mb-5">
          Great Job &nbsp; {userName}
        </p>
      ) : (
        <p className="font-semibold text-[25px] mb-5">
          You could do better &nbsp; {userName}
        </p>
      )}

      <button className="p-3 border" onClick={handleSubmit}>
        Play again
      </button>
    </div>
  );
};

export default page;
