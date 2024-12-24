import { BPLogResponse } from "./BPLogResponse";
import { convertFileToBase64 } from "./convertFileToBase64";

export async function sendPhotoToOpenAIToOCR(
  photo: File
): Promise<BPLogResponse> {
  const base64Image = await convertFileToBase64(photo);
  const imageType = photo.type || "image/jpeg"; // Default to jpeg if type is not available
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer `, // Replace with your actual API key
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please transcribe this image of a blood pressure log.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${imageType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "bp_log_response",
          strict: true,
          schema: {
            type: "object",
            properties: {
              logs: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    dateTime: { type: "string" },
                    systolic: { type: "string" },
                    diastolic: { type: "string" },
                  },
                  required: ["id", "dateTime", "systolic", "diastolic"],
                  additionalProperties: false,
                },
              },
            },
            required: ["logs"],
            additionalProperties: false,
          },
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send photo to OpenAI");
  }

  const data: BPLogResponse = await response.json();
  return data;
}
