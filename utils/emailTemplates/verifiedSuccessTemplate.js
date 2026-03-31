const verifiedSuccessTemplate = () => `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f9fafb; font-family:sans-serif;">

<table width="100%" style="padding:40px 0;">
<tr><td align="center">

<table width="480" style="background:#fff; border-radius:20px; overflow:hidden;">

<tr>
<td style="background:#16a34a; color:white; text-align:center; padding:30px;">
<h2>✅ Email Verified</h2>
</td>
</tr>

<tr>
<td style="padding:30px; color:#374151;">

<p>🎉 Congratulations!</p>

<p>Your email has been successfully verified.</p>

<p>You now have full access to all features.</p>

<p style="margin-top:20px;">
🕉️ Maa Doyamoyee blessings always with you.
</p>

</td>
</tr>

</table>

</td></tr>
</table>

</body>
</html>
`;

module.exports = verifiedSuccessTemplate;