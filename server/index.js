import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/restaurants/test", (req, res) => {
  console.log("*** IN SERVER ROUTE ***");
  res.json({ ok: true });
});

app.post("/api/restaurants/nearby", async (req, res) => {
  const { lat, lng } = req.body;
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  try {
    const resp = await fetch(
      `https://places.googleapis.com/v1/places:searchNearby?key=${API_KEY}&fields=places.displayName,places.location`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          includedTypes: ["restaurant"],
          maxResultCount: 10,
          locationRestriction: {
            circle: {
              center: {
                latitude: lat,
                longitude: lng,
              },
              radius: 500,
            },
          },
          rankPreference: "DISTANCE",
        }),
      }
    );
    const data = await resp.json();
    console.log("GOOGLE API STATUS:", resp.status);
    console.log("GOOGLE API RESPONSE:", data);
    res.json(data);
  } catch (err) {
    console.error("API error", err);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
