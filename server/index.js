const express = require("express");
const multer = require("multer");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const port = 5000;

app.use(cors());
const upload = multer({ dest: "uploads/" });

app.post("/submit-homework", upload.single("dosya"), async (req, res) => {
    const { ad, email, baslik, aciklama } = req.body;
    const dosya = req.file;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "seninmail@gmail.com", // Değiştir
            pass: "uygulama_sifresi",     // Değiştir
        },
    });

    const mailOptions = {
        from: email,
        to: "adminmail@gmail.com",     // Buraya sana gelecek mail
        subject: "Yeni Ödev Teslimi Geldi",
        text: `Yeni bir ödev teslimi yapıldı.\n\nAd Soyad: ${ad}\nE-posta: ${email}\nBaşlık: ${baslik}\nAçıklama: ${aciklama}`,
        attachments: [
            {
                filename: dosya.originalname,
                path: dosya.path,
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Mail gönderildi!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Hata oluştu.");
    }
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor`);
}); 