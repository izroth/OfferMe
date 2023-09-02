const pdf = require('pdf-parse');
const multer = require('multer');

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

                // Access the uploaded file
                const fileBuffer = req.file.buffer;

                // Convert the file buffer to a string
                const data = fileBuffer.toString();

                // Parse the PDF data
                const pdfData = await pdf(data);

                // Get the text content from the PDF
                const text = pdfData.text;

                // Split the text by new lines
                const textArray = text.split('\n');

                // Remove empty lines
                const filteredText = textArray.filter((line) => line.trim() !== '');

                // Send the filtered text as a JSON response
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
