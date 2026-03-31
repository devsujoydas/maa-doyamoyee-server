const loginAlertTemplate = (device = "Unknown Device", location = "Unknown") => `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f9fafb; font-family:sans-serif;">

<table width="100%" style="padding:40px 0;">
<tr><td align="center">

<table width="480" style="background:#fff; border-radius:20px;">

<tr>
<td style="background:#f59e0b; color:white; text-align:center; padding:30px;">
<h2>⚠️ New Login Detected</h2>
</td>
</tr>

<tr>
<td style="padding:30px; color:#374151;">

<p>We noticed a new login to your account.</p>

<ul>
<li><strong>Device:</strong> ${device}</li>
<li><strong>Location:</strong> ${location}</li>
</ul>

<p>If this was you, you can ignore this message.</p>

<p>If not, please reset your password immediately.</p>

<p style="margin-top:20px;">
🔐 Stay safe,<br/>
<strong>Maa Doyamoyee Security Team</strong>
</p>

</td>
</tr>

</table>

</td></tr>
</table>

</body>
</html>
`;

module.exports = loginAlertTemplate;