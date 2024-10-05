"use client";
import { useUser } from "@clerk/nextjs";

const DashboardPage = () => {
  const { user } = useUser();

  return (
    <div className="mt-4 ml-4">
      <h3 className="text-2xl font-semibold text-green-600 text-center">
        Witaj, {user?.firstName}!
      </h3>
    </div>
  );
};

export default DashboardPage;
