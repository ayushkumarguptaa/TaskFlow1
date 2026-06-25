const { generateTaskFromPrompt } = require("../services/geminiService");

const parseDateValue = (value) => {
  if (!value) return null;
  const text = String(value).trim();

  const ddmmyyyy = text.match(/^(\d{2})[\-/](\d{2})[\-/](\d{4})$/);
  if (ddmmyyyy) {
    return new Date(`${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}T00:00:00Z`);
  }

  const yyyymmdd = text.match(/^(\d{4})[\-/](\d{2})[\-/](\d{2})$/);
  if (yyyymmdd) {
    return new Date(`${yyyymmdd[1]}-${yyyymmdd[2]}-${yyyymmdd[3]}T00:00:00Z`);
  }

  const parsed = new Date(text);
  if (!isNaN(parsed)) {
    return parsed;
  }

  return null;
};

const normalizeSuggestedDueDate = (value) => {
  const now = new Date();
  const candidate = parseDateValue(value);
  if (!candidate) return null;

  if (candidate >= now) {
    return candidate;
  }

  const sameMonthDay = new Date(candidate);
  sameMonthDay.setFullYear(now.getFullYear());
  if (sameMonthDay >= now) {
    return sameMonthDay;
  }

  const nextYear = new Date(candidate);
  nextYear.setFullYear(now.getFullYear() + 1);
  if (nextYear >= now) {
    return nextYear;
  }

  return null;
};

const formatIsoDate = (date) => date.toISOString().split("T")[0];
const formatIsoDateTime = (date) => date.toISOString().slice(0, 16);

exports.getSuggestion = async (req, res) => {
  try {
    let { title, description } = req.body;
    title = String(title || "").trim();
    description = String(description || "").trim();

    if (!title && !description) {
      const fallbackDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      return res.json({
        estimatedHours: 8,
        suggestedDueDateTime: formatIsoDateTime(fallbackDate),
        suggestedDueDate: formatIsoDate(fallbackDate),
        reasoning: "Default estimate applied because no task details were provided.",
      });
    }

    const prompt = `Given a task with title "${title}" and description "${description}", provide:\n1. estimated hours required (number only)\n2. suggested due date and time (ISO 8601 format, e.g. 2026-07-01T17:00) based on task urgency and effort\n3. reasoning (brief explanation)\n\nRespond only in JSON format: {"estimatedHours": number, "suggestedDueDateTime": "YYYY-MM-DDTHH:MM", "reasoning": "text"}.\nDo not always return a due date exactly 7 days from now; choose a realistic due date and time based on the task details.`;

    const response = await generateTaskFromPrompt(prompt);

    let jsonResponse;
    try {
      const jsonMatch = response.match(/```json\n?([\s\S]*?)\n?```/) || response.match(/({[\s\S]*})/);
      jsonResponse = JSON.parse(jsonMatch ? jsonMatch[1] : response);
    } catch (parseError) {
      jsonResponse = {
        estimatedHours: 8,
        suggestedDueDateTime: formatIsoDateTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
        reasoning: "Could not parse AI response",
      };
    }

    const suggestedValue = jsonResponse.suggestedDueDateTime || jsonResponse.suggestedDueDate;
    const normalizedDate = normalizeSuggestedDueDate(suggestedValue);
    const safeDueDate = normalizedDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    res.json({
      estimatedHours: Number(jsonResponse.estimatedHours) || 8,
      suggestedDueDateTime: formatIsoDateTime(safeDueDate),
      suggestedDueDate: formatIsoDate(safeDueDate),
      reasoning: jsonResponse.reasoning || "AI estimate generated successfully.",
    });
  } catch (error) {
    console.error("AI Error:", error.message);
    if (error.response?.status === 429) {
      return res.status(429).json({
        message: "API rate limit exceeded. Please try again later.",
      });
    }
    res.status(500).json({
      message: error.message || "Failed to generate AI estimate",
    });
  }
};