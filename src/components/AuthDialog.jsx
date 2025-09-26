import React, { useState, useEffect } from "react";
import Dialog from "./Dialog";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

function AuthDialog({ isOpen, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={mode === "login" ? "Login" : "Create Account"} maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex rounded-xl border overflow-hidden">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              mode === "login" ? "bg-rose-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              mode === "register" ? "bg-rose-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Register
          </button>
        </div>

        <div>
          {mode === "login" ? <Login /> : <Register />}
        </div>
      </div>
    </Dialog>
  );
}

export default AuthDialog;


