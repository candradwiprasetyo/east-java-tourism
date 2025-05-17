// /hooks/useLogin.ts
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setError(`error ${err}`);
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
