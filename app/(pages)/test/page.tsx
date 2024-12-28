"use client";
import { InlineWidget } from "react-calendly";

const Page = () => {
  return (
    <div className="flex justify-center items-center my-20">
      <InlineWidget
        url="https://calendly.com/piotrgolon121998?locale=pl"
        styles={{ width: "900px", height: "900px" }}
      />
    </div>
  );
};

export default Page;
