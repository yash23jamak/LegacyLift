import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useAppContext } from "@/contexts/useContext";
import { MIGRATION_PROMPT } from "@/prompt/analysisPrompt";

const DownloadZipButton = ({ files }) => {


    const { uploadedFileContext } = useAppContext();

  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiModal = import.meta.env.VITE_AI_MODAL;

  const handleDownload = async () => {
    try {
      const prompt = `${MIGRATION_PROMPT}
          Project Files:
      ${uploadedFileContext}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "",
          "X-Title": "JSP Analyzer",
        },
        body: JSON.stringify({
          model: `${apiModal}`,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const resultContent =
        data.choices?.[0]?.message?.content || "Analysis failed.";
      const [report, ...codeParts] = resultContent.split("```");

      let jsonString = codeParts.join("```").trim();
      jsonString = jsonString
        .replace(/^json\s*/i, "")
        .replace(/```/g, "")
        .trim();


      if (!jsonString || !files.length) {
        alert("No files to download");
        return;
      }

      const zip = new JSZip();

      files.forEach(({ name, content }) => {
        // If content is an object (like JSON), convert to string
        const fileContent =
          typeof content === "string"
            ? content
            : JSON.stringify(content, null, 2);
        zip.file(name, fileContent);
      });

      try {
        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, "react-migration-project.zip");
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Download Project ZIP
    </button>
  );
};

export default DownloadZipButton;
