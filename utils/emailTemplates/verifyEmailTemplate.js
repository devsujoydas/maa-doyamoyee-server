const verifyEmailTemplate = (verifyUrl) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body style="margin:0; padding:0; background:#f9fafb; font-family:'Segoe UI', sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <table width="480" cellpadding="0" cellspacing="0"
          style="background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">

          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#9333ea); padding:30px; text-align:center; color:white;">
              <h1 style="margin:0; font-size:24px;">🔱 Maa Doyamoyee</h1>
              <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">
                Verify Your Email
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 28px; color:#374151; line-height:1.6;">

              <p>🙏 <strong>Namaskar,</strong></p>

              <p>Please verify your email to activate your account.</p>

              <div style="text-align:center; margin:30px 0;">
                <a href="${verifyUrl}"
                  style="display:inline-block; background:#7c3aed; color:#fff; padding:14px 28px;
                  border-radius:10px; text-decoration:none; font-weight:600;">
                  Verify Email
                </a>
              </div>

              <p style="font-size:13px; color:#6b7280;">
                This link expires in <strong>10 minutes</strong>.
              </p>

              <p>🕉️ Stay blessed,<br/><strong>Maa Doyamoyee Team</strong></p>

            </td>
          </tr>

          <tr>
            <td style="background:#f3f4f6; text-align:center; padding:16px; font-size:12px; color:#9ca3af;">
              © ${new Date().getFullYear()} Maa Doyamoyee.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

module.exports = verifyEmailTemplate;