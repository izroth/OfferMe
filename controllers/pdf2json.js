const multer = require('multer');
const pdf = require('pdf-parse');

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const pdf2json = async (req, res) => {
    try {
        // Use Multer to handle file uploads
        upload.single('pdf')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'File upload error' });
            } else if (err) {
                console.error(err);
                return res.status(500).json({ message: 'An error occurred' });
            }

            try {
                if (!req.file) {
                    return res.status(400).json({ message: 'No file uploaded' });
                }

                // Access the uploaded file buffer
                const fileBuffer = req.file.buffer;

                // Convert the PDF to text using pdf-parse
                const pdfData = await pdf(fileBuffer);
                const text = pdfData.text;

                // Split the text by new line
                const textArray = text.split('\n');

                // Remove empty lines
                const filteredText = textArray.filter((line) => line.trim() !== '');

                // Send the filtered text in the response
                res.status(200).json({ message: 'success', data: filteredText });
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: err.message || 'An error occurred.' });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || 'An error occurred.' });
    }
};

module.exports = pdf2json;
