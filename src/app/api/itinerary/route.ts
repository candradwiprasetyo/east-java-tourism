import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import { calculateDayDifference } from "@/lib/dateUtils";

async function getItineraryFromAI(message: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  const openaiResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      }),
    }
  );

  const data = await openaiResponse.json();
  return data.choices[0]?.message?.content || "";
}

export async function POST(req: Request) {
  try {
    const { origin, destinations, interests, start_date, end_date } =
      await req.json();

    if (!origin || !destinations || !start_date || !end_date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const countDay = calculateDayDifference(
      new Date(start_date),
      new Date(end_date),
      true
    );

    let paramInterests = "";
    if (interests.length > 0) {
      paramInterests = `Carikan data pariwisata sesuai minat dari faktor berikut ini ${interests}`;
    } else {
      paramInterests = `Carikan data pariwisata yang paling populer dan menarik wisatawan`;
    }

    const message = `Tolong buatkan itinerary lengkap dengan budget liburan ke kota ${destinations} (Jawa Timur, Indonesia) dari ${origin} selama ${countDay} hari. ${paramInterests}. Dari mulai tanggal ${start_date} sampai tanggal ${end_date}. Data harus lengkap diawali dengan tiket pergi dan diakhiri dengan tiket pulang yang masuk kategori transportation. 
    Ada 5 kategori data yaitu: 
    1. transportation 
    2. accommodation 
    3. food 
    4. attractions 
    5. miscellaneous
    
    Harus dengan format json seperti ini:
    {
      "origin": "",
      "destination": "",
      "duration": "",
      "days": [
        {
          "day": 1,
          "date": "YYYY-MM-DD",
          "activities": [
            {
              "time": "HH:SS",
              "activity": "",
              "place": "",
              "address": "",
              "category": "",
              "transportation_type": "",
              "cost": "",
              "image_url": "",
              "google_maps_url": "",
            }
          ]
        }
      ]
    }
    

    Buatkan budget setiap activity seakurat mungkin dengan harga sebenarnya.

    Gunakan bahasa inggris untuk membuat rencana perjalanan ini.

    Gunakan harga mata uang rupiah.

    Buatkan jadwal itinerary ini seefektif mungkin dan seefisien mungkin dari sisi jarak dan waktu. 

    Tolong buatkan activity yang detail terkait wisata atau tempat yang rekomended di wilayah tersebut beserta alamat lengkapnya. Masing-masing activity harus ada alamat lengkapnya.
    
    Untuk category transportation di awal dan akhir perjalanan, usahakan menggunakan moda transportasi pesawat. Jika tidak memungkinkan, maka gunakan moda transportasi kereta api. 

    Untuk category transportation, jelaskan juga menggunakan moda transportasi apa seperti kereta atau pesawat atau bus dengan detail nama kereta api atau maskapai.

    jika activity adalah accomodation, berikan hotel yang benar-benar valid ada di kota tempat destinasi. Jangan membuat hotel dummy.

    Setiap activity, carikan data google_maps_url yang valid yang bisa dibuka untuk digunakan rute ke lokasi tersebut. Berikan itinerary dengan lokasi yang menyertakan URL Google Maps yang langsung menuju name tempat dan alamat tersebut (bukan shortened link atau embed), cukup berupa https://www.google.com/maps?q=Nama+Tempat+Address atau https://www.google.com/maps/place/Nama+Tempat+Address, agar bisa dibuka dengan mudah.

    Buatkan budget setiap hotel seakurat mungkin dengan harga standart dari hotel tersebut.

    Jika kegiatan adalah food di hotel tempat check-in, maka cost adalah 0.

    Jika category adalah transportation, maka berikan isi transportation_type dengan moda transportation pesawat, kereta api atau bus.

    Untuk activity, berikan keterangan yang lengkap dengan aktifitas dan juga tempatnya. contohnya: Dinner at the IBC Restaurant Sidoarjo. 
    
    Jangan buat activity makan malam di hotel.
    
    Tolong buatkan menjadi format json yang bisa saya gunakan untuk halaman web.

    Berikan jawaban dalam bahasa inggris.
    
    Tolong pastikan jawaban yang anda berikan hanya format json yang saya inginkan. jangan ada kata-kata lain yang tidak saya butuhkan.
    
    berikan jawaban hanya format json tanpa \`json atau \`\`.`;

    const itineraryRaw = await getItineraryFromAI(message);

    let itineraryData;
    try {
      itineraryData = JSON.parse(itineraryRaw);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to parse itinerary JSON from AI response" },
        { status: 500 }
      );
    }

    for (const day of itineraryData.days) {
      for (const activity of day.activities) {
        const place = activity.place;
        if (place) {
          try {
            const imageRes = await fetch(
              `${
                process.env.NEXT_PUBLIC_BASE_URL
              }/api/serpapi?q=${encodeURIComponent(place)}`
            );
            const imageData = await imageRes.json();
            activity.image_url =
              imageData?.thumbnail || imageData?.original || "";
          } catch (error) {
            console.error(`Failed to fetch image for ${place}:`, error);
            activity.image_url = "";
          }
        }
      }
    }

    const result = await pool.query(
      `INSERT INTO itineraries (origin, destinations, interests, start_date, end_date, itinerary_data, duration)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [
        origin,
        destinations,
        interests,
        start_date,
        end_date,
        JSON.stringify(itineraryData),
        countDay,
      ]
    );

    const { id } = result.rows[0];

    return NextResponse.json(
      { message: "Itinerary created successfully", id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting itinerary:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json(
        { error: "Missing 'id' parameter" },
        { status: 400 }
      );
    }

    const id = Number(idParam);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "'id' must be a valid number" },
        { status: 400 }
      );
    }

    // langsung pool.query tanpa client connect/release
    const result = await pool.query("SELECT * FROM itineraries WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Itinerary not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
