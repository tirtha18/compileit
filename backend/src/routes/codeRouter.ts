import { Router } from "express";
import runCode from "../controllers/runCode";
import { createSnippet, getSnippets, getSnippet, updateSnippet, deleteSnippet } from "../controllers/snippetController";
const codeRouter = Router();

// Code exectuion routes
codeRouter.post("/run", runCode as any);

// Snippet routes
codeRouter.post("/snippets", createSnippet as any);
codeRouter.get("/snippets", getSnippets as any);
codeRouter.get("/snippets/:id", getSnippet as any);
codeRouter.put("/snippets/:id", updateSnippet as any);
codeRouter.delete("/snippets/:id", deleteSnippet as any);

export default codeRouter;

