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
  }, []);
  return (
    <>
      {refreshTokenExists ? (
        <Outlet />
      ) : (
        <>
          <div>
            <h1>Please Login to continue</h1>
            <div>
              <Link to={"/signin"} className="px-1 py-1">
                Sign In
              </Link>
              <Link to={"/signup"} className="px-1 py-1">
                Sign Up
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
