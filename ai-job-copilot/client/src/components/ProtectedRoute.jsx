import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";


const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default function ProtectedRoute({children}){
    const location = useLocation();
    const [status,setStatus] =useState("checking");

    useEffect(()=>{
        let active = true;

        async function checkSession() {
            try {
                const result = await api.get("/auth/user");
                // console.log(result);
                if (active) setStatus("authenticated");
            } catch (error) {
                if (active) setStatus("unauthenticated");
            }
        }

        checkSession();

        return ()=>{
            active = false
        }
    },[]);

    if (status === "checking") {
        return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <p className="text-sm text-slate-600">
            Checking your session...
            </p>
        </div>
        );
    }

    if (status === "unauthenticated") {
        return (
          <Navigate
            to="/login"
            replace
            state={{
              from: location,
              message: "You must log in to view the dashboard.",
            }}
          />
        );
    }

  return children;

}