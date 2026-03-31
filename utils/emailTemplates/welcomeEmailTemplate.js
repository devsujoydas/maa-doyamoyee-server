const welcomeEmailTemplate = (name = "User") => `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f9fafb; font-family:'Segoe UI', sans-serif;">

<table width="100%" style="padding:40px 0;">
<tr><td align="center">

<table width="480" style="background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">

<tr>
<td style="background:linear-gradient(135deg,#7c3aed,#2563eb); color:white; text-align:center; padding:30px;">
<h2 style="margin:0;">🔱 Maa Doyamoyee</h2>
<p>Welcome to the Community</p>
</td>
</tr>

<tr>
<td style="padding:30px; color:#374151;">

<p>🙏 Namaskar <strong>${name}</strong>,</p>

<p>
Welcome to Maa Doyamoyee! We're happy to have you here.
</p>

<p>
Start exploring, connect with people, and share your thoughts.
</p>

<p style="margin-top:20px;">
🕉️ Stay blessed,<br/>
<strong>Maa Doyamoyee Team</strong>
</p>

</td>
</tr>

</table>

</td></tr>
</table>

</body>
</html>
`;

module.exports = welcomeEmailTemplate;