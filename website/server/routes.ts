import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Providers routes
  app.get("/api/providers", async (req, res) => {
    try {
      const providers = await storage.getApiProviders();
      res.json(providers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch API providers" });
    }
  });

  app.get("/api/providers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const provider = await storage.getApiProvider(id);
      
      if (!provider) {
        return res.status(404).json({ message: "API provider not found" });
      }
      
      res.json(provider);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch API provider" });
    }
  });

  // Recommended Apps routes
  app.get("/api/apps", async (req, res) => {
    try {
      const apps = await storage.getRecommendedApps();
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recommended apps" });
    }
  });

  app.get("/api/apps/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const app = await storage.getRecommendedApp(id);
      
      if (!app) {
        return res.status(404).json({ message: "Recommended app not found" });
      }
      
      res.json(app);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recommended app" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
