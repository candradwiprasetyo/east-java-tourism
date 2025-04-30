import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { query } = req.body; // Ambil data dari frontend

      // Endpoint API Gemini (URL yang benar)
      const geminiApiUrl =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

      // API Key dari environment variable
      const apiKey = process.env.GEMINI_API_KEY;

      // Kirim request ke Gemini API menggunakan axios
      const response = await axios.post(
        geminiApiUrl,
        {
          query: query, // Data yang dikirimkan ke API Gemini
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`, // API Key dengan format Bearer
            "Content-Type": "application/json",
          },
        }
      );

      // Kirimkan response kembali ke frontend
      res.status(200).json(response.data);
    } catch (error) {
      // Tampilkan lebih banyak detail error untuk debugging
      console.error(
        "Error Response:",
        error.response ? error.response.data : error.message
      );
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
