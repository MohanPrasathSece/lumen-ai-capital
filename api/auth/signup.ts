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
    
    // Formatting logic matching the CRM API
    const selectedCountry = COUNTRY_PHONE_PATTERNS[countryCode];
    let phone = (rawPhone || "").replace(/[^0-9+]/g, '');
    
    if (phone) {
      let rawDial = selectedCountry ? selectedCountry.dial.replace('+', '') : '41';
      
      if (phone.startsWith('00')) phone = phone.slice(2);
      if (phone.startsWith('+')) phone = phone.slice(1);
      if (phone.startsWith(rawDial)) phone = phone.slice(rawDial.length);
      if (phone.startsWith('0')) phone = phone.slice(1);
      
      phone = '+' + rawDial + phone; // standard format (+ country code + number)
    } else {
      phone = "+41000000000";
    }

    const country = countryCode ? countryCode.toLowerCase() : "ch";

    // Simulate signup logic...
    // ...

    try {
      const url = process.env.VITE_DASHBOARD_URL || "https://lead-dashboard-orcin.vercel.app/api/increment";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: "Lumen", type: "singup", name, email })
      }).catch(() => {});
    } catch(e){}

    return res.status(200).json({ success: true, phone, country });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
