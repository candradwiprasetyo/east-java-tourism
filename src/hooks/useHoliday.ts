import { useEffect, useState } from "react";

export interface Holiday {
  tanggal: string;
  keterangan: string;
  is_cuti: boolean;
}

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

const useHoliday = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const urls = [
          `https://dayoffapi.vercel.app/api?year=${currentYear}`,
          `https://dayoffapi.vercel.app/api?year=${nextYear}`,
        ];

        const results = await Promise.allSettled(
          urls.map(async (url) => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
            return res.json();
          })
        );

        const successfulResults = results
          .filter(
            (result): result is PromiseFulfilledResult<any> =>
              result.status === "fulfilled"
          )
          .map((result) => result.value);

        const combined = successfulResults.flat();
        setHolidays(combined);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  return { holidays, loading, error };
};

export default useHoliday;
