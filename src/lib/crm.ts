import { COUNTRY_PHONE_PATTERNS } from "@/lib/countries";

export interface CrmLeadPayload {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  leadType: "signup" | "contact";
  message?: string;
}

export interface CrmResult {
  success: boolean;
  error?: string;
}

export async function submitLead(payload: CrmLeadPayload): Promise<CrmResult> {
  const endpoint = import.meta.env.VITE_CRM_ENDPOINT as string;
  const token = import.meta.env.VITE_CRM_TOKEN as string;

  if (!endpoint || !token) {
    console.error("CRM credentials not configured");
    return { success: false, error: "CRM not configured" };
  }

  try {
    const [first_name, ...lastNameParts] = (payload.name || "Unknown").trim().split(" ");
    const last_name = lastNameParts.length > 0 ? lastNameParts.join(" ") : "";
    
    const selectedCountry = COUNTRY_PHONE_PATTERNS[payload.countryCode];
    let phone = (payload.phone || "").replace(/[^0-9+]/g, '');
    
    if (phone) {
      let rawDial = selectedCountry ? selectedCountry.dial.replace('+', '') : '41';
      
      // Strip existing '+' or '00'
      if (phone.startsWith('00')) phone = phone.slice(2);
      if (phone.startsWith('+')) phone = phone.slice(1);
      
      // Strip country code if user included it
      if (phone.startsWith(rawDial)) {
          phone = phone.slice(rawDial.length);
      }
      
      // Strip leading 0 (trunk prefix) common in local numbers
      if (phone.startsWith('0')) {
          phone = phone.slice(1);
      }
      
      phone = '00' + rawDial + phone;
    } else {
      phone = "0000000000";
    }

    const body = {
      country_name: payload.countryCode.toLowerCase(),
      description: "Lumen",
      phone: phone,
      email: payload.email,
      first_name: first_name,
      last_name: last_name,
      custom_fields: {
        Source_ID: "website",
        How_Much_Invested: "0",
        Outline_Your_Case: payload.message || ""
      }
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "Unknown error");
      let errorMessage = text;
      try {
        const parsed = JSON.parse(text);
        errorMessage = parsed.message || parsed.error || text;
      } catch (e) {}

      const lowerErr = errorMessage.toLowerCase();
      if (lowerErr.includes("already exists") || lowerErr.includes("already contacted") || res.status === 409) {
        return { success: false, error: "ALREADY_EXISTS" };
      }
      return { success: false, error: "INVALID_LEAD" };
    }

    try {
      const url = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_DASHBOARD_URL) || "https://lead-dashboard-orcin.vercel.app/api/increment";
      const dashboardType = payload.leadType === "signup" ? "singup" : "contact";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: "Lumen", type: dashboardType, name: payload.name, email: payload.email})
      }).catch(() => {});
    } catch(e){}

    incrementLeadCount();
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Network error";
    return { success: false, error: msg };
  }
}

function incrementLeadCount() {
  fetch("/api/leads-count", { method: "POST" }).catch((err) =>
    console.warn("[leads-count] Failed to increment:", err)
  );
}
