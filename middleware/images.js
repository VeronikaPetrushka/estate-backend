// import multer from 'multer';
// import path from 'path';

// // Configure storage for multer (store files in the 'uploads' directory)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');  // Define the destination folder for uploads
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));  // Create a unique filename using timestamp
//     }
// });

// // Initialize multer with storage configuration
// const upload = multer({ storage: storage });

// // Middleware for handling multiple image uploads (max 5 images in this example)
// const uploadImages = upload.array('images', 5);  // Adjust the number (5) based on your needs

// export { uploadImages };
