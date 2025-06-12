"use client";

import { useRouter } from "next/navigation";
import LandingPage from "./components/LandingPage";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log("Home page mounted");
  }, []);

  const handleStart = () => {
    console.log("Starting navigation to /connect/doc");
    router.push("/connect/doc");
  };

  try {
    return <LandingPage onStart={handleStart} />;
  } catch (error) {
    console.error("Error rendering LandingPage:", error);
    return <div>Error loading page. Please check console for details.</div>;
  }
}
