import axios from "axios";

const getSubmission = async (token: string) => {
    const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: {
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY || '',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data; 
    } catch (error) {
        console.error("Error fetching submission:", error);
        throw new Error("Failed to fetch submission.");
    }
};

export default getSubmission;
