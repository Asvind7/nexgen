import { API_URL } from '../config';

/**
 * Calls the backend ML model to predict the learner's level
 * based on their performance metrics.
 */
export const predictLearnerLevel = async (score, accuracy, timeTaken, name = "User", email = "anonymous") => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score: score,
        accuracy: accuracy,
        time_taken: timeTaken,
        name: name,
        email: email
      }),
    });

    if (!response.ok) {
      throw new Error('ML Backend prediction failed');
    }

    const data = await response.json();
    
    // Capitalize level name (e.g., "beginner" -> "Beginner")
    return data.level.charAt(0).toUpperCase() + data.level.slice(1);
  } catch (error) {
    console.error('Error predicting level:', error);
    
    // Rule-based Fallback if ML service is down
    if (score >= 8) return "Advanced";
    if (score >= 5) return "Intermediate";
    return "Beginner";
  }
};

/**
 * Individualized Boss Session Analysis
 */
export const analyzeBossSession = async (sessionData) => {
  try {
    const response = await fetch(`${API_URL}/predict/boss`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData)
    });
    return await response.json();
  } catch (error) {
    console.error("Boss Session Analysis Failed:", error);
    return { level: "beginner", error: error.message };
  }
};

/**
 * Granular Interaction Analysis (every message/move)
 */
export const analyzeInteraction = async (interactionData) => {
  try {
    const response = await fetch(`${API_URL}/predict/interaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(interactionData)
    });
    return await response.json();
  } catch (error) {
    console.error("Interaction Analysis Failed:", error);
    return { level: "beginner", error: error.message };
  }
};
