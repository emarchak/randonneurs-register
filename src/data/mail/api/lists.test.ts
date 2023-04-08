
import * as fetch from 'cross-fetch'
import { createList, getList } from './lists'
import Bugsnag from '@bugsnag/js'

describe('getList()', () => {
  const fetchSpy = jest.spyOn(fetch, 'default')
  const notifySpy = jest.spyOn(Bugsnag, 'notify')

  afterEach(() => {
    fetchSpy.mockClear()
    notifySpy.mockClear()
  })

  it('notifies bugsnag if response not okay', async () => {
    fetchSpy.mockResolvedValueOnce({ ok: false } as any)

    await getList({ scheduleId: '420' })
    expect(notifySpy).toHaveBeenCalled()
  })
})

describe('createList()', () => {
  const fetchSpy = jest.spyOn(fetch, 'default')
  const notifySpy = jest.spyOn(Bugsnag, 'notify')

  afterEach(() => {
    fetchSpy.mockClear()
    notifySpy.mockClear()
  })
  it('returns list if already exists', async () => {
    const response = await createList({ scheduleId: '420', name: 'foo' })
    expect(response).toEqual({
      scheduleId: '420',
      name: '420 - Example list',
      id: '1234',
    })
  })
  it('notifies bugsnag if response not okay', async () => {
    fetchSpy
      .mockResolvedValueOnce({ ok: true, id: null } as any)
      .mockResolvedValueOnce({ ok: false } as any)

    await createList({ scheduleId: '420', name: 'foo' })
    expect(notifySpy).toHaveBeenCalled()
  })
})
