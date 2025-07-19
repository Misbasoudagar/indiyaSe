import uploadRoute from './routes/upload.js'; // ✅ correct path

// ✅ Register the upload route
app.use('/api/upload', uploadRoute);

// ✅ Make uploaded images accessible
app.use('/uploads', express.static('uploads'));
