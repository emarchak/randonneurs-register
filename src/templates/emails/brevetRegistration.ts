export interface BrevetRegistrationData {
  firstName: string
  lastName: string
  eventName: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventDistance: string
  eventRoute: string
  registrationId: string
}

export const brevetRegistrationTemplate = (data: BrevetRegistrationData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Brevet Registration Confirmation</title>
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
    .event-details {
      background-color: white;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #3498db;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Randonneurs Ontario</h1>
    <h2>Brevet Registration Confirmation</h2>
  </div>

  <div class="content">
    <p>Dear ${data.firstName} ${data.lastName},</p>

    <p>Thank you for registering for the following brevet event:</p>

    <div class="event-details">
      <h3>${data.eventName}</h3>
      <p><strong>Date:</strong> ${data.eventDate}</p>
      <p><strong>Time:</strong> ${data.eventTime}</p>
      <p><strong>Location:</strong> ${data.eventLocation}</p>
      <p><strong>Distance:</strong> ${data.eventDistance} km</p>
      <p><strong>Route:</strong> ${data.eventRoute}</p>
      <p><strong>Registration ID:</strong> ${data.registrationId}</p>
    </div>

    <p>Please arrive at least 15 minutes before the start time to complete check-in procedures.</p>

    <p>If you need to make any changes to your registration or have questions, please contact us.</p>

    <p>We look forward to seeing you on the road!</p>

    <p>Best regards,<br>
    Randonneurs Ontario</p>
  </div>

  <div class="footer">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>For support, contact: info@randonneurs.to</p>
  </div>
</body>
</html>
`
