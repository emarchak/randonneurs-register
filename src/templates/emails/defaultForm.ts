export interface DefaultFormData {
  firstName: string
  lastName: string
  email: string
  message: string
  subject?: string
  formType?: string
}

export const defaultFormTemplate = (data: DefaultFormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #2c3e50;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 20px;
      background-color: #f8f9fa;
    }
    .form-details {
      background-color: white;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #3498db;
    }
    .message-box {
      background-color: #ecf0f1;
      padding: 15px;
      border-radius: 5px;
      margin: 15px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Randonneurs Ontario</h1>
    <h2>Contact Form Submission</h2>
  </div>

  <div class="content">
    <p>A new contact form submission has been received:</p>

    <div class="form-details">
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
      ${data.formType ? `<p><strong>Form Type:</strong> ${data.formType}</p>` : ''}
    </div>

    <div class="message-box">
      <h4>Message:</h4>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    </div>

    <p>Please respond to this inquiry as soon as possible.</p>

    <p>Best regards,<br>
    Randonneurs Ontario Website</p>
  </div>

  <div class="footer">
    <p>This is an automated message from the Randonneurs Ontario website contact form.</p>
    <p>Submitted on: ${new Date().toLocaleString()}</p>
  </div>
</body>
</html>
`
