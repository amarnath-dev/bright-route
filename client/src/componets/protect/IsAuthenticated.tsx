import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { Link } from "react-router-dom";

export const IsAuthenticated: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [refreshTokenExists, setRefreshTokenExists] = useState<boolean | null>(
    null
  );
  useEffect(() => {
    const checkToken = async () => {
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
    };
    checkToken();
  }, [axiosPrivate]);
  return (
    <>
      {refreshTokenExists ? (
        <Outlet />
      ) : (
        <>
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Please Login to continue</h1>
            <div className="mt-8">
              <Link
                to={"/signin"}
                className="px-4 py-1 border-2 rounded-md bg-color-one text-white"
              >
                Sign In
              </Link>
              <Link
                to={"/signup"}
                className="px-4 py-1 border-2 ml-2 bg-color-five rounded-md text-white"
              >
                Sign Up
              </Link>
              {/* <Navigate to={"/signup"} /> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};
