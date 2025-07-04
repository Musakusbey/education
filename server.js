const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Gmail SMTP ayarları (Google uygulama şifresi gereklidir)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kusbeymusa7@gmail.com', // kendi gmail adresin
        pass: 'akxqauuplarkbcgx', // boşluksuz şekilde yaz!
    },
});

app.post('/api/contact', async (req, res) => {
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

const PORT = 5000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`)); 