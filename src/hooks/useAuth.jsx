import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import API from "../utils/API";
import { toast } from "sonner";

const login = async ({ username, password }) => {
  const res = await API.post("/auth", { username, password });
  return res.data;
};

const register = async ({ username, password, name }) => {
  const res = await API.post("/users", { username, password, name });
  return res.data;
};

export const useAuth = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess(data) {
      localStorage.setItem("token", data?.token);
      navigate("/profile"); // Login muvaffaqiyatli bo'lsa profile sahifasiga yo'naltirish
      toast.success("Login successful");
    },
    onError(error) {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess() {
      toast.success("Registration successful");
      navigate("/login");
    },
    onError(error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    },
  });

  return {
    loginMutation,
    registerMutation,
  };
};