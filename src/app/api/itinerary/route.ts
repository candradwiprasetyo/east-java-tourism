import { NextResponse } from "next/server";
import getClient from "../../../lib/db";
import { calculateDayDifference } from "@/lib/dateUtils";

// Fungsi untuk memanggil API AI
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
  return data.choices[0]?.message?.content || ""; // Ambil hasil yang sesuai dari response
}

// Handle POST request untuk menambah itinerary
export async function POST(req: Request) {
  try {
    const {
      origin,
      destinations,
      interests,
      start_date,
      end_date,
      max_budget,
    } = await req.json();

    // Validasi data
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

    let paramBudget = "";
    if (max_budget) {
      paramBudget = `Seluruh total budget transportation + accommodation + food + attractions + miscellaneous tidak boleh lebih dari ${max_budget}. `;
    }

    const message = `Tolong buatkan itinerary lengkap dengan budget liburan ke kota ${destinations} (Jawa Timur, Indonesia) dari ${origin} selama ${countDay} hari. ${paramInterests}. Dari mulai tanggal ${start_date} sampai tanggal ${end_date}. Data harus lengkap diawali dengan tiket pergi dan diakhiri dengan tiket pulang yang masuk kategori transportation. ${paramBudget}
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
              "address": "",
              "category": "",
              "cost": "",
              "image_url": "",
              "google_maps_url": "",
            }
          ]
        }
      ]
    }
    
    Tolong buatkan activity yang detail terkait wisata atau tempat yang rekomended di wilayah tersebut beserta alamat lengkapnya. Masing-masing activity harus ada alamat lengkapnya.

    Untuk activity transportation, jelaskan juga menggunakan moda transportasi apa seperti kereta atau pesawat atau bus dengan nama armada atau maskapai.

    Buatkan jadwal itinerary ini seefektif mungkin dan seefisien mungkin dari sisi jarak dan waktu. 

    jika activity adalah accomodation, berikan hotel yang benar-benar valid ada di kota tempat destinasi. Jangan membuat hotel dummy.
    
    Buatkan budget setiap activity seakurat mungkin dengan harga sebenarnya.

    Setiap activity, carikan data google_maps_url yang valid yang bisa dibuka untuk digunakan rute ke lokasi tersebut. Berikan itinerary dengan lokasi yang menyertakan URL Google Maps yang langsung menuju tempat tersebut (bukan shortened link atau embed), cukup berupa https://www.google.com/maps?q=Nama+Tempat atau https://www.google.com/maps/place/Nama+Tempat, agar bisa dibuka dengan mudah.

    Buatkan budget setiap hotel seakurat mungkin dengan harga standart dari hotel tersebut.

    Jika kegiatan adalah food di hotel tempat check-in, maka cost adalah 0.

    Jangan buat activity makan malam di hotel.

    ${paramBudget}
    
    Tolong buatkan menjadi format json yang bisa saya gunakan untuk halaman web.
    
    Tolong pastikan jawaban yang anda berikan hanya format json yang saya inginkan. jangan ada kata-kata lain yang tidak saya butuhkan.
    
    berikan jawaban hanya format json tanpa \`json atau \`\`.`;

    // Memanggil API AI untuk mendapatkan itinerary dalam format JSON
    const itineraryData = await getItineraryFromAI(message);
    console.log(message);
    // const itineraryData = {};

    // Ambil client dari database
    const client = await getClient();

    // Query untuk insert data itinerary ke tabel
    const result = await client.query(
      `INSERT INTO itineraries (origin, destinations, interests, start_date, end_date, itinerary_data, duration, max_budget)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [
        origin,
        destinations,
        interests,
        start_date,
        end_date,
        itineraryData,
        countDay,
        max_budget || null,
      ]
    );

    const { id } = result.rows[0];

    // Kembalikan response sukses
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

    const client = await getClient();

    const result = await client.query(
      "SELECT * FROM itineraries WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Itinerary not found" },
        { status: 404 }
      );
    }

    // Kembalikan data itinerary
    return NextResponse.json({ data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
