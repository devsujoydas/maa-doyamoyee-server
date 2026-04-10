const replyEmailTemplate = (message) => `
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

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#2563eb); padding:30px; text-align:center; color:white;">
              <h1 style="margin:0; font-size:22px;">🔱 Maa Doyamoyee</h1>
              <p style="margin:6px 0 0; font-size:13px; opacity:0.9;">
                Reply from Temple Support
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 28px; color:#374151; line-height:1.6;">

              <p>🙏 <strong>Namaskar,</strong></p>

              <p>
                Thank you for contacting us. Here is our response:
              </p>

              <!-- Message Box -->
              <div style="margin:25px 0; padding:15px; background:#f9fafb; border-left:4px solid #7c3aed; border-radius:10px;">
                <p style="margin:0; color:#111; font-size:15px;">
                  ${message}
                </p>
              </div>

              <p>
                If you have more questions, feel free to contact us again.
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

module.exports = replyEmailTemplate;