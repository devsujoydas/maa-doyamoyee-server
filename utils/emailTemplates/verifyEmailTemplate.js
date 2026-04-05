const verifyEmailTemplate = (verifyUrl) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body style="margin:0; padding:0; background:#f9fafb; font-family: 'Segoe UI', sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="480" cellpadding="0" cellspacing="0" 
          style="background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#9333ea); padding:30px; text-align:center; color:white;">
              <h1 style="margin:0; font-size:24px;">🔱 Maa Doyamoyee</h1>
              <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">
                Verify Your Email
              </p>
            </td>
          </tr> 

          <!-- Body -->
          <tr>
            <td style="padding:32px 28px; color:#374151; line-height:1.6;">

              <p style="margin-top:0;">🙏 <strong>Namaskar,</strong></p>

              <p>
                Welcome to <strong>Maa Doyamoyee</strong>.  
                Please confirm your email address to activate your account.
              </p>

              <!-- Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href="${verifyUrl}"
                  style="display:inline-block; background:#7c3aed; color:#ffffff; padding:14px 28px; 
                  border-radius:10px; text-decoration:none; font-weight:600; font-size:15px;">
                  Verify Email
                </a>
              </div>

              <!-- Divider -->
              <hr style="border:none; border-top:1px solid #eee; margin:25px 0;" />

              <p style="font-size:13px; color:#6b7280;">
                This link will expire in <strong>10 minutes</strong>.
              </p>

              <p style="font-size:13px; color:#6b7280;">
                If you didn’t create an account, you can safely ignore this email.
              </p>

              <p style="margin-top:20px;">
                🕉️ Stay blessed,<br/>
                <strong>Maa Doyamoyee Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3f4f6; text-align:center; padding:16px; font-size:12px; color:#9ca3af;">
              © ${new Date().getFullYear()} Maa Doyamoyee. All rights reserved.
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