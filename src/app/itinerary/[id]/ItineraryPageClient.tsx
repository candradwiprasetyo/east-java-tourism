"use client";
import { calculateDayDifference } from "@/lib/dateUtils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import PageDivider from "@/components/Divider";
import Link from "next/link";
import Loading from "@/components/Loading";
import { backgroundImage } from "@/constants/backgroundImage";
import { Itinerary, Day, Budget } from "@/types/itinerary";
import Image from "next/image";
import ShareButton from "@/components/ShareButton";

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

export default function ItineraryPageClient({
  itinerary,
}: {
  itinerary: Itinerary | null;
}) {
  const router = useRouter();

  if (!itinerary) return <Loading />;

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
        <div className="text-title-primary container mx-auto pb-6 px-4 xl:max-w-5xl">
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
                className="bg-red-300 float-right px-4 text-white p-4 font-bold rounded-xl text-sm"
              >
                Back to home
              </button>

              <button
                onClick={backToMainSearch}
                className="bg-green-300 float-right px-4 text-white pt-4 pb-3 font-bold rounded-xl text-sm mr-2 hidden"
              >
                <i
                  className="material-icons text-white"
                  style={{ fontSize: "20px" }}
                >
                  download
                </i>
              </button>
              <ShareButton />
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
            </div>
          </div>

          {itineraryData.recommendation && (
            <div className="mt-10 p-6 text-sm leading-7 relative text-title-primary bg-yellow-50 text-center px-20 text-center rounded-3xl">
              <div className="w-16 h-16 absolute -left-4 -top-6 text-7xl font-satisfy p-3 rounded-full bg-gray-100 border-[6px] border-white">
                &#8220;
              </div>
              {itineraryData.recommendation}
              {/* <div className="w-12 h-12 absolute -right-4 -bottom-5 text-7xl font-satisfy p-2 rounded-full bg-white border-[6px] border-white">
                &rdquo;
              </div> */}
            </div>
          )}

          <div className="pt-6">
            {itineraryData.days.map((day: Day, index: number) => (
              <div
                key={day.day}
                className="flex bg-gray-50 rounded-3xl mb-10 overflow-hidden"
              >
                <div
                  className="w-2/6 py-4 px-6 text-white relative"
                  style={{
                    backgroundImage: `url("${
                      backgroundImage[(index + 1) % backgroundImage.length]
                    }")`,
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
                            <div className="flex gap-4 items-center">
                              <div className="flex-none">
                                <div
                                  className={`w-12 h-12 rounded-lg overflow-hidden bg-cover`}
                                >
                                  <Image
                                    src={`/assets/images/${activity.category}.png`}
                                    width={200}
                                    height={200}
                                    alt={activity.category}
                                  />
                                </div>
                              </div>

                              <div className="flex-grow">
                                <div>
                                  {activity.activity} - {activity.place}
                                </div>
                                <div className="flex items-center gap-1 text-green-400 font-bold text-xs mt-1">
                                  {parseFloat(activity.cost) > 0 && (
                                    <>
                                      <i
                                        className="material-icons text-green-400"
                                        style={{ fontSize: "16px" }}
                                      >
                                        payments
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
                                <div className="flex items-start gap-1 py-1">
                                  <i
                                    className="material-icons text-red-400 mt-[3px]"
                                    style={{ fontSize: "14px" }}
                                  >
                                    location_on
                                  </i>
                                  <span className="text-gray-400 text-xs">
                                    <Link
                                      href={activity.google_maps_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {activity.address}
                                    </Link>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td
                            valign="middle"
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
