const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { ad, soyad, email, telefon, alan } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `Frovexis Başvuru <${process.env.MAIL_USER}>`,
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
        });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Mail gönderilemedi.' });
    }
} 