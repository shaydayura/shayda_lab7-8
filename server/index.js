import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

const __dirname = process.cwd();

const DATA_PATH = path.join(__dirname, "data", "inventory.json");
const UPLOADS_DIR = path.join(__dirname, "uploads");

app.use(cors());
app.use(express.json());

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

if (!fs.existsSync(DATA_PATH)) {
  fs.writeFileSync(DATA_PATH, "[]", "utf-8");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

function readInventory() {
  const data = fs.readFileSync(DATA_PATH, "utf-8");

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeInventory(items) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
}

app.get("/", (req, res) => {
  res.json({
    message: "Warehouse Inventory API is running",
  });
});

app.get("/inventory", (req, res) => {
  const items = readInventory();
  res.json(items);
});

app.get("/inventory/:id", (req, res) => {
  const items = readInventory();
  const item = items.find((item) => Number(item.id) === Number(req.params.id));

  if (!item) {
    return res.status(404).json({
      message: "Inventory item not found",
    });
  }

  res.json(item);
});

app.get("/inventory/:id/photo", (req, res) => {
  const items = readInventory();
  const item = items.find((item) => Number(item.id) === Number(req.params.id));

  if (!item || !item.photo) {
    return res.status(404).json({
      message: "Photo not found",
    });
  }

  const photoPath = path.join(UPLOADS_DIR, item.photo);

  if (!fs.existsSync(photoPath)) {
    return res.status(404).json({
      message: "Photo file not found",
    });
  }

  res.sendFile(photoPath);
});

app.post("/register", upload.single("photo"), (req, res) => {
  const { inventory_name, description } = req.body;

  if (!inventory_name || inventory_name.trim() === "") {
    return res.status(400).json({
      message: "inventory_name is required",
    });
  }

  const items = readInventory();

  const newItem = {
    id: Date.now(),
    inventory_name: inventory_name.trim(),
    description: description ? description.trim() : "",
    photo: req.file ? req.file.filename : null,
    createdAt: new Date().toISOString(),
  };

  items.push(newItem);
  writeInventory(items);

  res.status(201).json(newItem);
});

app.put("/inventory/:id", (req, res) => {
  const { inventory_name, description } = req.body;

  if (!inventory_name || inventory_name.trim() === "") {
    return res.status(400).json({
      message: "inventory_name is required",
    });
  }

  const items = readInventory();
  const index = items.findIndex(
    (item) => Number(item.id) === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Inventory item not found",
    });
  }

  items[index] = {
    ...items[index],
    inventory_name: inventory_name.trim(),
    description: description ? description.trim() : "",
    updatedAt: new Date().toISOString(),
  };

  writeInventory(items);

  res.json(items[index]);
});

app.put("/inventory/:id/photo", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Photo is required",
    });
  }

  const items = readInventory();
  const index = items.findIndex(
    (item) => Number(item.id) === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Inventory item not found",
    });
  }

  const oldPhoto = items[index].photo;

  if (oldPhoto) {
    const oldPhotoPath = path.join(UPLOADS_DIR, oldPhoto);

    if (fs.existsSync(oldPhotoPath)) {
      fs.unlinkSync(oldPhotoPath);
    }
  }

  items[index] = {
    ...items[index],
    photo: req.file.filename,
    updatedAt: new Date().toISOString(),
  };

  writeInventory(items);

  res.json(items[index]);
});

app.delete("/inventory/:id", (req, res) => {
  const items = readInventory();
  const item = items.find((item) => Number(item.id) === Number(req.params.id));

  if (!item) {
    return res.status(404).json({
      message: "Inventory item not found",
    });
  }

  if (item.photo) {
    const photoPath = path.join(UPLOADS_DIR, item.photo);

    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }
  }

  const updatedItems = items.filter(
    (item) => Number(item.id) !== Number(req.params.id)
  );

  writeInventory(updatedItems);

  res.json({
    message: "Inventory item deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});