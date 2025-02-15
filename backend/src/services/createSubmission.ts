import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const createSubmission = async (sourceCode: string, stdin: string, language_id: number  ) => {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            wait: 'true',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY || "",
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            language_id: language_id,
            source_code: sourceCode,
            stdin: stdin
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Error in createSubmission:", error);
        throw new Error("Failed to create submission.");
    }
};

export default createSubmission;
