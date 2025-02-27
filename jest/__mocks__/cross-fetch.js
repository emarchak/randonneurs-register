const fetch = jest.fn().mockImplementation(async (endpoint = '', body = {}) => {

  if (endpoint.match(/ridewithgps\.com\/routes\/\d+.json/)) {
    return {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({
        route: {
          name: 'Flat Loop',
          id: 229,
          course_points: [
            {
              d: 19.79,
              n: 'CTL START',
              t: 'Control',
            },
            {
              d: 160419.013,
              n: 'CTL MIDDLE',
              t: 'Control',
            },
            {
              d: 160419.013,
              n: 'Turn left',
              t: 'Left',
            },
            {
              d: 307817.19,
              n: 'CTL FINISH',
              t: 'Control',
            }
          ]
        }
      })
  }}

  if (endpoint.match(/schedule\.php/)) {
    return {
      status: 'ok',
      json: jest.fn().mockResolvedValue({
        status : 'ok',
        schedule: [
          {
            Sched_Id: '871',
            Chapter: 'Toronto',
            Event: 'Brevet',
            Distance: '300',
            Date: '2021-06-19',
            Route: 'Kissing Bridge',
            StartLoc: 'Tim Hortons,<br> 152 Park Lawn Rd, Toronto',
            Stime: '06:00:00',
            Organizer: 'Register',
            Contact: 'http://randonneurs.to/registration',
            RWGPS: 'https://ridewithgps.com/routes/31557200',
            Unixtime: new Date('Sat June 19 2021 06:00 EDT').valueOf() / 1000
          }
        ]
      })
    }
  }

  if (endpoint.match(/api\.sendgrid\.com\/v3\/marketing\/singlesends\/\d+/)) {
    return {
      status: 'ok',
      json: jest.fn().mockResolvedValue({
        id: '1234',
        name: 'Example newsletter',
        status: 'triggered',
        categories: ['category1', 'randolist'],
        send_at: '2021-06-06T18:14:21Z',
        email_config: {
          html_content: 'HTML content http://google.ca'.repeat(20),
          plain_content: 'HTML content http://google.ca'.repeat(20)
        }
      })
    }
  }

  if (endpoint.match(/api\.sendgrid\.com\/v3\/marketing\/singlesends/)) {
    return {
      status: 'ok',
      json: jest.fn().mockResolvedValue({
        result: [
          {
            id: '1234',
            name: 'Example newsletter',
            status: 'triggered',
            categories: ['category1', 'randolist'],
            send_at: '2021-06-06T18:14:21Z'
          },
          {
            id: '4567',
            name: 'Example draft newsletter',
            status: 'draft',
            categories: ['randolist'],
            send_at: '2021-06-06T18:14:21Z'
          }]
    })
    }
  }

  if (endpoint.match(/ccnbikes\.com\?pg=2/)) {
    return {
      status: 200,
      json: jest.fn().mockResolvedValue({
          results: [{
            city: 'Toronto',
            country: 'Canada',
            event: 'Randonneurs Ontario Membership 2021',
            full_name: 'Bil Bar',
            id: 3,
            registration_category: 'Family Membership > PRIMARY FAMILY MEMBER',
            team_category: '',
            team_name: '',
          },
          {
            city: 'Toronto',
            country: 'Canada',
            event: 'Randonneurs Ontario Membership 2021',
            full_name: 'Brill Bruiser',
            id: 3,
            registration_category: 'fake category',
            team_category: '',
            team_name: '',
          }],
          next: null
        })
    }
  }

  if (endpoint.match(/ccnbikes\.com/)) {
    return {
      status: 200,
      json: jest.fn().mockResolvedValue({
        results: [{
          city: 'Ottawa',
          country: 'Canada',
          event: 'Randonneurs Ontario Membership 2021',
          full_name: 'Foo Bar',
          id: 1,
          registration_category: 'Individual Membership',
          team_category: '',
          team_name: '',
        },
        {
          city: 'Toronto',
          country: 'Canada',
          event: 'Randonneurs Ontario Membership 2021',
          full_name: 'Baz Boo',
          id: 2,
          registration_category: 'Individual Membership',
          team_category: '',
          team_name: '',
        }],
        next: '/ccnbikes.com?pg=2'
      })
    }
  }

  if (endpoint.match(/v3\/marketing\/lists/)) {
    return {
      status: 200,
      json: jest.fn().mockResolvedValue({
        result: [{
          id: '1234',
          name: '420 - Example list',
          contact_count: 1,
          _metadata: {
            self: 'https://api.sendgrid.com/v3/marketing/lists/1234'
          }
        }, {
          id: '5678',
          name: '421 - Example list',
          contact_count: 1,
          _metadata: {
            self: 'https://api.sendgrid.com/v3/marketing/lists/5678'
          }
        },{
          id: '91011',
          name: 'Named list',
          contact_count: 2,
          _metadata: {
            self: 'https://api.sendgrid.com/v3/marketing/lists/91011'
          }
        }]
      })
    }
  }

  if (endpoint.match(/functions\/send-mail\/list\?name=Named\+list/) && body.method === 'GET') {
    return {
      status: 200,
      ok: true,
      json: jest.fn().mockResolvedValue({
        id: '91011',
        name: 'Named list',
        scheduleId: ''
      })
    }
  }

  if (endpoint.match(/functions\/send-mail\/list\?scheduleId=420/) && body.method === 'GET') {
    return {
      status: 200,
      ok: true,
      json: jest.fn().mockResolvedValue({
        id: '1234',
        name: '420 - Example list',
        scheduleId: '420'
      })
    }
  }


  return ({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue({})
  })
})

module.exports = fetch
