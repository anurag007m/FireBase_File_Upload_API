const express = require('express');
const app = express();
require('dotenv').config();
const { upload } = require('./middleware/multer');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');
const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require('./config/firebase.config');

// Serve the static HTML file for the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

async function uploadImage(file) {
    const storageFB = getStorage();

    await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH);

    const dateTime = Date.now();
    const fileName = `images/${dateTime}`;
    const storageRef = ref(storageFB, fileName);
    const metadata = {
        contentType: file.type,
    };

    await uploadBytesResumable(storageRef, file.buffer, metadata);

    // Generate the download URL for the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
}

app.post('/test-upload', upload, async (req, res) => {
    const file = {
        type: req.file.mimetype,
        buffer: req.file.buffer
    };

    try {
        const downloadURL = await uploadImage(file);
        res.send({
            status: "SUCCESS",
            imageName: downloadURL
        });
     
    } catch (err) {
        console.log(err);
        res.status(500).send(`
          Try Again
        `);
    }
});


app.listen(process.env.PORT || 3000, (test) => {
    console.log('Server running on port 3000');
});
