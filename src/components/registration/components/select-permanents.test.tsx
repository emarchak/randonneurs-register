import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import * as fetch from 'cross-fetch'
import * as Gatsby from 'gatsby'
import { SelectPermanents } from './select-permanents'
import { routeDB } from './registration-form-permanent.test'

describe('<SelectPermanents>', () => {
  const fetchSpy = jest.spyOn(fetch, 'default')
  const staticQuerySpy = jest.spyOn(Gatsby, 'useStaticQuery')
  const onChangeSpy = jest.fn().mockName('onChange')

  beforeEach(() => {
    staticQuerySpy.mockReturnValue({ db: routeDB })
  })

  afterEach(() => {
    fetchSpy.mockClear()
    staticQuerySpy.mockClear()
  })

  it('renders permanents', () => {
    const { getByText } = render(<SelectPermanents onChange={onChangeSpy} />)
    expect(getByText('Urban')).toBeInTheDocument()
    expect(getByText('Golf')).toBeInTheDocument()
    expect(getByText('Shortest ride')).toBeInTheDocument()
  })
})
