import express, { Request, Response, Application } from "express";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Роуты
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello TypeScript + Express!" });
});

app.get("/api/users", (req: Request, res: Response) => {
  res.json([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ]);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
