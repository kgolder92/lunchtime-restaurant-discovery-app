import express, { response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Readable } from "stream";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));

//Nearby Search by default
app.post("/api/restaurants/nearby", async (req, res) => {
  const { lat, lng } = req.body;
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  try {
    const resp = await fetch(
      `https://places.googleapis.com/v1/places:searchNearby?key=${API_KEY}&fields=places.displayName,places.location,places.rating,places.userRatingCount,places.formattedAddress,places.photos`,
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
    console.log("GOOGLE API NEARBY RESPONSE:", data);
    res.json(data);
  } catch (err) {
    console.error("API error", err);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

app.post("/api/restaurants/search", async (req, res) => {
  const { query, location } = req.body;
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask":
            "places.displayName,places.location,places.rating,places.userRatingCount,places.formattedAddress,places.photos",
        },
        body: JSON.stringify({
          textQuery: query,
          locationBias: location
            ? {
                circle: {
                  center: {
                    latitude: location.lat,
                    longitude: location.lng,
                  },
                  radius: 5000,
                },
              }
            : undefined,
          openNow: false,
          maxResultCount: 20,
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Text Search API Error");
    res.status(500).json({ error: "Text search failed" });
  }
});

app.get("/photos/:photoRef", async (req, res) => {
  console.log("*** IN /photos ***");
  const { photoRef } = req.params;
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/${photoRef}/media?key=${API_KEY}&maxHeightPx=200&maxWidthPx=200`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch photo " });
    }
    console.log("GOOGLE API PHOTO RESPONSE:", res);

    const readable = Readable.fromWeb(response.body);
    readable.pipe(res);
  } catch (err) {
    console.error("Photo fetch error: ", err);
    res.status(500).json({ error: "Photo fetch failed" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
