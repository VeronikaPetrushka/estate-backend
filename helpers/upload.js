import path from "path";
import multer from "multer";
import fs from "fs/promises";

const uploadDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname);
  },  
  limits: {
    fileSize: 1048576 * 150,
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/JPG', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type. Only JPEG, JPG, PNG are allowed.'));
  } else {
      cb(null, true);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).array("images", 10);


export const isAccessible = async (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

export const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};
