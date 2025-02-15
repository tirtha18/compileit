import { Request, Response } from "express";
import getSubmission from "../services/getSubmisssion";
import createSubmission from "../services/createSubmission";
const runCode = async (req: Request, res: Response): Promise<Response> => {
    const { source_code, stdin, language_id } = req.body;
    try {
        const submission: any = await createSubmission(source_code, stdin, language_id);
        const { token } = submission;
        const output = await getSubmission(token);
        return res.status(200).json(output);
    } catch (error) {
        return res.status(400).json({ error });  
    }
};

export default runCode;