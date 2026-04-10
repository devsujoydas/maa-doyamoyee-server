const verifiedSuccessTemplate = () => `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f9fafb; font-family:'Segoe UI', sans-serif;">

<table width="100%" style="padding:40px 0;">
<tr><td align="center">

<table width="480"
  style="background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">

<tr>
<td style="background:linear-gradient(135deg,#16a34a,#22c55e); color:white; text-align:center; padding:30px;">
<h2 style="margin:0;">✅ Email Verified</h2>
</td>
</tr>

<tr>
<td style="padding:30px; color:#374151; line-height:1.6;">

<p>🎉 <strong>Congratulations!</strong></p>

<p>Your email has been successfully verified.</p>

<p>You now have full access to all features.</p>

<p style="margin-top:20px;">
🕉️ Maa Doyamoyee blessings always with you.
</p>

</td>
</tr>

<tr>
<td style="background:#f3f4f6; text-align:center; padding:16px; font-size:12px; color:#9ca3af;">
© ${new Date().getFullYear()} Maa Doyamoyee.
</td>
</tr>

</table>

</td></tr>
</table>

</body>
</html>
`;

module.exports = verifiedSuccessTemplate;