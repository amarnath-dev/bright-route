import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

export const IsAuthenticated: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [refreshTokenExists, setRefreshTokenExists] = useState<boolean | null>(
    null
  );
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get("/checkToken", {
          withCredentials: true,
        });
        if (response.data.status === "exists") {
          setRefreshTokenExists(true);
          return;
        } else {
          setRefreshTokenExists(false);
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    })();
  }, [axiosPrivate]);
  return (
    <>
      {refreshTokenExists ? (
        <Outlet />
      ) : (
        <>
          <div className="w-full h-screen flex flex-col justify-center items-center bg-background-two">
            <h1 className="text-3xl font-bold text-gray-400">
              Please Login to continue
            </h1>
            <div className="mt-8">
              <Link
                to={"/signin"}
                className="px-5 py-2 border rounded-md bg-color-one text-white"
              >
                Sign In
              </Link>
              <Link
                to={"/signup"}
                className="px-5 py-2 border ml-2 bg-color-five rounded-md text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
