import { Request, Response } from "express";
import { Snippet } from "../models/snippet";

// Create a snippet
const createSnippet = async (req: Request, res: Response) => {
    try {
        const { name, sourceCode } = req.body;
        if (!name || !sourceCode) {
            return res.status(400).json({ message: "Name and sourceCode are required" });
        }
        const snippet = await Snippet.create({ name, sourceCode });
        res.status(201).json(snippet);
    } catch (error) {
        res.status(500).json({ message: "Error creating snippet", error });
    }
};

// Get all snippets
const getSnippets = async (req: Request, res: Response) => {
    try {
        const snippets = await Snippet.find();
        res.status(200).json(snippets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching snippets", error });
    }
};

// Get a snippet
const getSnippet = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const snippet = await Snippet.findById(id);
        if (!snippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }
        res.status(200).json(snippet);
    } catch (error) {
        res.status(500).json({ message: "Error fetching snippet", error });
    }
};

// Update a snippet
const updateSnippet = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, sourceCode } = req.body;
        const snippet = await Snippet.findByIdAndUpdate(id, { name, sourceCode }, { new: true });

        if (!snippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }

        res.status(200).json(snippet);
    } catch (error) {
        res.status(500).json({ message: "Error updating snippet", error });
    }
};

// Delete a snippet 
const deleteSnippet = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const snippet = await Snippet.findByIdAndDelete(id);

        if (!snippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }

        res.status(200).json({ message: "Snippet deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting snippet", error });
    }
};

export { createSnippet, getSnippets, getSnippet, updateSnippet, deleteSnippet };
