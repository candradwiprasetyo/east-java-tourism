"use client";

import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    setCopied(true);
    const shareData = {
      title: document.title,
      text: "Look my itinerary",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <button
      onClick={handleShare}
      className="bg-blue-300 float-right px-4 text-white pt-4 pb-3 font-bold rounded-xl text-sm mr-2"
    >
      <i className="material-icons text-white" style={{ fontSize: "20px" }}>
        {copied ? "check" : "share"}
      </i>
    </button>
  );
}
