/* eslint-disable no-undef */
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors());
app.use(express.json());

// Dosya yükleme ayarı
const upload = multer({ dest: "uploads/" });

// Ödev gönderim endpointi
app.post("/api/odev-gonder", upload.single("file"), async (req, res) => {
    console.log("Gelen body:", req.body);
    console.log("Gelen dosya:", req.file);
    try {
        const { name, email, title, message } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Dosya yüklenemedi." });
        }

        // Mail gönderici ayarı
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Mail içeriği
        const mailOptions = {
            from: `"Frovexis Kampüs" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_MAIL,
            subject: `Yeni Ödev Gönderimi - ${title}`,
            text: `Ad Soyad: ${name}\nE-posta: ${email}\nÖdev Başlığı: ${title}\n\nAçıklama:\n${message}`,
            attachments: [
                {
                    filename: file.originalname,
                    path: file.path,
                },
            ],
        };

        // Mail gönder
        await transporter.sendMail(mailOptions);

        // Dosyayı sil
        fs.unlink(file.path, (err) => {
            if (err) console.error("Dosya silinemedi:", err);
        });

        res.status(200).json({ message: "Ödev gönderildi!" });
    } catch (error) {
        console.error("Hata:", error);
        res.status(500).json({ error: "Gönderim sırasında hata oluştu." });
    }
});

// Proje gönderim endpointi
app.post("/api/proje-gonder", upload.single("file"), async (req, res) => {
    console.log("Gelen body (proje):", req.body);
    console.log("Gelen dosya (proje):", req.file);
    try {
        const { name, email, title, message } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "Dosya yüklenemedi." });
        }
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: `"Frovexis Kampüs" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_MAIL,
            subject: `Yeni Proje Gönderimi - ${title}`,
            text: `Ad Soyad: ${name}\nE-posta: ${email}\nProje Başlığı: ${title}\n\nAçıklama:\n${message}`,
            attachments: [
                {
                    filename: file.originalname,
                    path: file.path,
                },
            ],
        };
        await transporter.sendMail(mailOptions);
        fs.unlink(file.path, (err) => {
            if (err) console.error("Dosya silinemedi:", err);
        });
        res.status(200).json({ message: "Proje gönderildi!" });
    } catch (error) {
        console.error("Hata (proje):", error);
        res.status(500).json({ error: "Gönderim sırasında hata oluştu." });
    }
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
}); 