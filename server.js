const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
// app.use(express.json()); // KALDIRILDI
app.use(cors({
    origin: "https://frovexis.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Gmail SMTP ayarları (Google uygulama şifresi gereklidir)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kusbeymusa7@gmail.com', // kendi gmail adresin
        pass: 'akxqauuplarkbcgx', // boşluksuz şekilde yaz!
    },
});

app.post('/api/contact', express.json(), async (req, res) => {
    console.log("Gelen veri:", req.body);
    const { ad, soyad, email, telefon, alan } = req.body;

    const mailOptions = {
        from: 'Frovexis Başvuru <kusbeymusa7@gmail.com>',
        to: 'kusbeymusa7@gmail.com',
        subject: 'Yeni Başvuru Geldi!',
        html: `
      <h2>Yeni Başvuru</h2> 
      <table>
        <tr><td><b>Ad:</b></td><td>${ad}</td></tr>
        <tr><td><b>Soyad:</b></td><td>${soyad}</td></tr>
        <tr><td><b>E-posta:</b></td><td>${email}</td></tr>
        <tr><td><b>Telefon:</b></td><td>${telefon}</td></tr>
        <tr><td><b>Alan:</b></td><td>${alan}</td></tr>
      </table>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (err) {
        console.error('Mail gönderilemedi:', err);
        res.status(500).json({ success: false, error: 'Mail gönderilemedi.' });
    }
});

app.post('/api/odev-gonder', upload.single('file'), async (req, res) => {
    const { name, email, title, message } = req.body;
    const file = req.file;
    const mailOptions = {
        from: 'Frovexis Ödev Teslim <kusbeymusa7@gmail.com>',
        to: 'kusbeymusa7@gmail.com',
        subject: 'Yeni Ödev Teslimi',
        html: `<h2>Yeni Ödev Teslimi</h2>
        <table>
          <tr><td><b>Ad:</b></td><td>${name}</td></tr>
          <tr><td><b>E-posta:</b></td><td>${email}</td></tr>
          <tr><td><b>Başlık:</b></td><td>${title}</td></tr>
          <tr><td><b>Açıklama:</b></td><td>${message}</td></tr>
        </table>`,
        attachments: file ? [{ filename: file.originalname, path: file.path }] : [],
    };
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (err) {
        console.error('Ödev gönderilemedi:', err);
        res.status(500).json({ success: false, error: 'Ödev gönderilemedi.' });
    }
});

app.post('/api/proje-gonder', upload.single('file'), async (req, res) => {
    const { name, email, title, message } = req.body;
    const file = req.file;
    const mailOptions = {
        from: 'Frovexis Proje Teslim <kusbeymusa7@gmail.com>',
        to: 'kusbeymusa7@gmail.com',
        subject: 'Yeni Proje Teslimi',
        html: `<h2>Yeni Proje Teslimi</h2>
        <table>
          <tr><td><b>Ad:</b></td><td>${name}</td></tr>
          <tr><td><b>E-posta:</b></td><td>${email}</td></tr>
          <tr><td><b>Başlık:</b></td><td>${title}</td></tr>
          <tr><td><b>Açıklama:</b></td><td>${message}</td></tr>
        </table>`,
        attachments: file ? [{ filename: file.originalname, path: file.path }] : [],
    };
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (err) {
        console.error('Proje gönderilemedi:', err);
        res.status(500).json({ success: false, error: 'Proje gönderilemedi.' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`)); 