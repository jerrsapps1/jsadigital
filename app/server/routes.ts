import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { jsaAlamoPdf } from "./api/jsaAlamoPdf";
import { suggestRouter } from "./api/suggest";
import { validateSpecialFieldsMiddleware } from "./api/validateSpecialFields";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Example JSA submission endpoint with validation
  // app.post('/api/jsas', validateSpecialFieldsMiddleware, async (req, res) => {
  //   const jsa = req.body;
  //   // Save JSA to storage
  //   res.json({ success: true, id: jsa.id });
  // });

  app.use('/api', jsaAlamoPdf);
  app.use('/api', suggestRouter);

  const httpServer = createServer(app);

  return httpServer;
}
