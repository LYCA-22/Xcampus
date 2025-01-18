"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { apiService } from "@/services/api";
import { updateStatus } from "@/store/systemSlice";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    // 使用可選鏈和空值合併運算符
    const lastPart = parts.pop();
    return lastPart?.split(";")[0] ?? null;
  }
  return null;
}

export function UserCheck() {
  const sessionId = getCookie("sessionId");
  const systemStatus = useAppSelector((state) => state.systemStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        dispatch({ type: "systemStatus/setLoading", payload: true });

        if (!sessionId) {
          // window.location.href =
          // "http://auth.lyhsca.org/login?url=https://beta.xcp.lyhsca.org";
          setTimeout(() => {
            dispatch(updateStatus(false));
          }, 5000);
          return;
        }

        const userData = await apiService.getUserData(sessionId);
        // 處理用戶數據，例如存儲到 Redux
        dispatch({ type: "user/setUserData", payload: userData });
      } catch (error) {
        console.error("Failed to check user:", error);
        // 處理錯誤，可能需要重定向到登錄頁面
      } finally {
        dispatch(updateStatus(true));
      }
    };

    checkUserSession();
  }, [sessionId, dispatch]);

  useEffect(() => {
    console.log(systemStatus);
  }, [systemStatus]);
  return null;
}
