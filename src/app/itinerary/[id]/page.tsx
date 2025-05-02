"use client";
import { useEffect, useState } from "react";
import { calculateDayDifference } from "@/lib/dateUtils";
import { format } from "date-fns";
import { useRouter, useParams } from "next/navigation";
import PageDivider from "@/components/Divider";
import Link from "next/link";

interface Itinerary {
  id: number;
  origin: string;
  destinations: string[];
  interests: string[];
  start_date: string;
  end_date: string;
  itinerary_data: string;
  duration: number;
  max_budget: number | null;
}

interface Activity {
  cost: string;
  time: string;
  address: string;
  activity: string;
  category: string;
  image_url: string;
  google_maps_url: string;
}

interface Day {
  day: number;
  date: string;
  activities: Activity[];
}

interface Budget {
  food: number;
  attractions: number;
  accommodation: number;
  miscellaneous: number;
  transportation: number;
  total: number;
}

function calculateBudgetFromActivities(days: Day[]): Budget {
  const budget: Budget = {
    food: 0,
    attractions: 0,
    accommodation: 0,
    miscellaneous: 0,
    transportation: 0,
    total: 0,
  };

  days.forEach((day) => {
    day.activities.forEach((activity) => {
      const cost = parseFloat(activity.cost);
      if (isNaN(cost)) return;
      const category = activity.category?.toLowerCase();

      switch (category) {
        case "food":
          budget.food += cost;
          break;
        case "attractions":
          budget.attractions += cost;
          break;
        case "accommodation":
          budget.accommodation += cost;
          break;
        case "miscellaneous":
          budget.miscellaneous += cost;
          break;
        case "transportation":
          budget.transportation += cost;
          break;
        default:
          break;
      }
    });
  });

  budget.total = Object.values(budget).reduce((acc, val) => acc + val, 0);

  return budget;
}

async function getItinerary(id: string): Promise<Itinerary | null> {
  const res = await fetch(`/api/itinerary?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.data;
}

export default function ItineraryPage() {
  const params = useParams();
  const id = params?.id as string;
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const router = useRouter();

  const backgroundImage: string[] = [
    "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/183/2024/08/27/63fdb9789cf09-175183370.jpg",
    "https://www.yukbanyuwangi.co.id/wp-content/uploads/2023/12/DJI_0126_1200.jpg",
    "https://img.okezone.com/content/2020/10/23/408/2298618/fakta-fakta-menarik-taman-nasional-baluran-afrikanya-indonesia-KymfZeNePX.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/97/b7/6f/tumpak-sewu-waterfalls.jpg",
    "https://rainbowrentcar.com/wp-content/uploads/2023/06/Menikmati-Keindahan-Pantai-Papuma-Surga-Tersembunyi-di-Jember-jpg.webp",
    "https://i.ytimg.com/vi/xl4iTWvWUPA/maxresdefault.jpg",
    "https://wonderfulimage.s3-id-jkt-1.kilatstorage.id/1692600212-dscf5151-jpg-medium.jpg",
    "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/01/26/1651611138.jpg",
    "https://cozzy.id/uploads/0000/630/2024/09/25/penginapan-murah-malang-hotel-murah-cozzyid.jpg",
    "https://www.eastjava.com/tourism/sumenep/images/gili_labak.jpg",
  ];

  useEffect(() => {
    const fetchItinerary = async () => {
      const data = await getItinerary(id);
      setItinerary(data);
    };

    if (id) {
      fetchItinerary();
    }
  }, [id]);

  if (!itinerary) return <div>Loading...</div>;

  let itineraryData;
  try {
    itineraryData =
      typeof itinerary.itinerary_data === "string"
        ? JSON.parse(itinerary.itinerary_data)
        : itinerary.itinerary_data;
  } catch (error) {
    console.error("Invalid itinerary data format:", error);
    return <div>Error parsing itinerary data.</div>;
  }

  const calculatedBudget = calculateBudgetFromActivities(itineraryData.days);
  const destination = itinerary.destinations?.join(", ") || "-";
  const interests = itinerary.interests?.join(", ") || "-";
  const formattedFrom = format(itinerary.start_date, "dd/MM/yyyy");
  const formattedTo = format(itinerary.end_date, "dd/MM/yyyy");

  const backToMainSearch = () => {
    router.push(`/`);
  };

  return (
    <>
      <PageDivider />
      <div className="bg-white">
        <div className="text-title-primary container mx-auto pb-6 px-20">
          <div className="flex items-center">
            <div className="w-1/2">
              <h1 className="text-[3vw] pb-6">
                Travel{" "}
                <span className="text-[4vw] font-bold font-satisfy text-title-secondary">
                  Itinerary
                </span>
              </h1>
            </div>
            <div className="w-1/2">
              <button
                onClick={backToMainSearch}
                className="bg-blue-300 float-right px-4 text-white p-4 font-bold rounded-full"
              >
                Back to home
              </button>
            </div>
          </div>

          <div className="rounded-3xl flex text-sm mb-6">
            <div className="w-1/2">
              <p>
                <strong>Origin</strong> {itinerary.origin}
              </p>
              <p className="py-2">
                <strong>Destination</strong> {destination}
              </p>
              <p>
                <strong>Interest</strong> {interests}
              </p>
            </div>
            <div className="w-1/2 text-right">
              <p>
                <strong>Date</strong> {formattedFrom} - {formattedTo}
              </p>
              <p className="py-1">
                <strong>Duration </strong>
                {calculateDayDifference(
                  new Date(itinerary.start_date),
                  new Date(itinerary.end_date)
                )}
              </p>
              <p>
                <strong>Max Budget</strong>{" "}
                {itinerary.max_budget
                  ? parseFloat(itinerary.max_budget.toString()).toLocaleString(
                      "id-ID",
                      {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }
                    )
                  : "-"}
              </p>
            </div>
          </div>

          <div className="pt-6">
            {itineraryData.days.map((day: Day, index: number) => (
              <div
                key={day.day}
                className="flex bg-gray-50 rounded-3xl mb-10 overflow-hidden"
              >
                <div
                  className="w-2/6 py-4 px-6 text-white relative"
                  style={{
                    backgroundImage: `url("${backgroundImage[index + 1]}")`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="absolute bg-black inset-0 opacity-40"></div>
                  <div className="absolute top-6 left-10">
                    <h3 className="text-[52px] font-bold">Day {day.day}</h3>
                    <div>{format(day.date, "dd MMMM yyyy")}</div>
                  </div>
                </div>
                <div className="w-4/6 p-6">
                  <table
                    border={1}
                    cellPadding={8}
                    cellSpacing={0}
                    className="w-full"
                  >
                    <tbody>
                      {day.activities.map((activity, idx) => (
                        <tr key={idx} className="text-sm border-b">
                          <td valign="top" className="py-3">
                            <div>{activity.activity}</div>
                            <div className="flex items-center gap-1 py-1">
                              <i
                                className="material-icons text-red-400"
                                style={{ fontSize: "15px" }}
                              >
                                location_on
                              </i>
                              <span className="text-gray-400">
                                <Link
                                  href={activity.google_maps_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {activity.address}
                                </Link>
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-green-400 font-bold text-xs">
                              {parseFloat(activity.cost) > 0 && (
                                <>
                                  <i
                                    className="material-icons text-green-400"
                                    style={{ fontSize: "16px" }}
                                  >
                                    paid
                                  </i>
                                  {parseFloat(activity.cost).toLocaleString(
                                    "id-ID",
                                    {
                                      style: "currency",
                                      currency: "IDR",
                                    }
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                          <td
                            valign="top"
                            align="right"
                            className="text-xl text-title-secondary"
                          >
                            {activity.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div className=" rounded-3xl mb-10 overflow-hidden py-6">
            <h2 className="text-3xl mb-4">Cost Summary</h2>
            <table cellPadding={4} className="w-full">
              <tbody>
                {Object.entries(calculatedBudget).map(([category, amount]) => (
                  <tr
                    key={category}
                    className={category === "total" ? "font-bold text-xl" : ""}
                  >
                    <td className="capitalize">{category}</td>
                    <td align="right">
                      {amount.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PageDivider direction="up" />
    </>
  );
}
