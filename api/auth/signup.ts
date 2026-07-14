import { put, list } from "@vercel/blob";
import { COUNTRY_PHONE_PATTERNS } from "../../src/lib/countries";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone: rawPhone, countryCode } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    const prefix = `users/${cleanEmail}`;
    const { blobs } = await list({
      prefix,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      storeId: process.env.BLOB_STORE_ID
    });

    if (blobs.length > 0) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    // Format phone
    const selectedCountry = COUNTRY_PHONE_PATTERNS[countryCode];
    let phone = (rawPhone || "").replace(/[^0-9+]/g, '');
    
    if (phone) {
      let rawDial = selectedCountry ? selectedCountry.dial.replace('+', '') : '41';
      
      if (phone.startsWith('00')) phone = phone.slice(2);
      if (phone.startsWith('+')) phone = phone.slice(1);
      if (phone.startsWith(rawDial)) phone = phone.slice(rawDial.length);
      if (phone.startsWith('0')) phone = phone.slice(1);
      
      phone = '+' + rawDial + phone;
    } else {
      phone = "+41000000000";
    }

    const userData = {
      name,
      email: cleanEmail,
      phone,
      countryCode,
      createdAt: new Date().toISOString()
    };

    // Save to vercel blob
    await put(`users/${cleanEmail}.json`, JSON.stringify(userData), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      storeId: process.env.BLOB_STORE_ID
    });

    // Notify Dashboard
    try {
      const url = process.env.VITE_DASHBOARD_URL || "https://lead-dashboard-orcin.vercel.app/api/increment";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: "Lumen", type: "singup", name, email: cleanEmail })
      }).catch(() => {});
    } catch(e){}

    return res.status(200).json({ success: true, email: cleanEmail });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
