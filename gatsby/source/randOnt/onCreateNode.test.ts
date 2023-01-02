import { buildEventPath } from "./onCreateNode"

describe('buildEventPath', () => {
  it('builds the event path', () => {
    expect(buildEventPath({
      season: '2023',
      chapter: 'Huron',
      route: 'Beaver Valley',
      date: '2023-05-13 T09:30:00.000 Z',
      scheduleId: 'abcd123'
    }))
      .toEqual('/event/2023/huron/beaver-valley-abcd123/')
  })
})
