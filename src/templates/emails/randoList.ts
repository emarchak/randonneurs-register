export interface RandoListData {
  rides: string[]
}

export const randoListTemplate = (data: RandoListData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Randonneurs Ontario Newsletter</title>
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
    .section {
      margin: 20px 0;
      background: #eeeeee;
      padding: 10px;
    }
    .button {
      display: inline-block;
      padding: 12px 18px;
      background-color: #dec8d3;
      color: #333333;
      text-decoration: none;
      border-radius: 6px;
      margin: 10px 0;
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
    <h2>Newsletter</h2>
  </div>

  <div class="content">
    <p>Hiya folks!</p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
      tincidunt elementum sem non luctus.
    </p>

    <h2>🎉 Section heading</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
      tincidunt elementum sem non luctus.
    </p>

    <div class="section">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        tincidunt elementum sem non luctus.
      </p>
    </div>

    <a href="http://randonneursontario.ca/Permanents/Permanents.html" class="button">
      Learn more about Permanents
    </a>

    <h2>🚲 Upcoming Toronto rides</h2>
    <p>
      You can request your own start time on the scheduled date and still
      receive ACP credit for each ride.
    </p>
    <ul>
      ${data.rides.map(ride => `<li>${ride}</li>`).join('')}
    </ul>

    <p>
      Submit your brevet card and recorded activity (strava, ridewgps,
      garmin, etc.) to vp@randonneurs.to when you're done.
    </p>
  </div>

  <div class="footer">
    <p>This is an automated message from Randonneurs Ontario.</p>
    <p>For support, contact: info@randonneurs.to</p>
  </div>
</body>
</html>
`
