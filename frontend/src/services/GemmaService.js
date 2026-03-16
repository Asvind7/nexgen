// src/services/GemmaService.js

import { API_URL } from '../config';

// 1. Check if Backend is Online
export const initGemma = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("🐍 Backend Status:", data.status);
    return true;
  } catch (error) {
    console.error("❌ Failed to connect to Python Backend:", error);
    return false;
  }
};

// 2. Send Chat to Backend
// 2. Send Chat to Backend
export const askGemma = async (prompt, userLevel, history = [], context = "", topic = "General Python") => {
  try {
    const payload = {
      prompt: context ? `Context: ${context}\n\nQuestion: ${prompt}` : prompt,
      level: userLevel || "Beginner",
      topic: topic,
      history: history
    };

    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // 🛑 NEW: Catch HTTP errors and log the EXACT reason from Python
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`🚨 HTTP Error ${response.status} on /chat:\n`, errorText);
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.response;

  } catch (error) {
    // We log the error here, but still return the fallback string 
    // so your TeacherEngine's retry loop catches it!
    console.error("AI Network or Parsing Error:", error.message);
    return "⚠️ My connection slipped! Please try asking again. 🔌";
  }
};