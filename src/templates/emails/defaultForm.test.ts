import { defaultFormTemplate } from './defaultForm'

describe('defaultFormTemplate', () => {
  it('renders subject, formType, and converts newlines to <br>', () => {
    const html = defaultFormTemplate({
      firstName: 'Erin',
      lastName: 'Marchak',
      email: 'erin@example.com',
      subject: 'Hello',
      formType: 'contact',
      message: 'Line 1\nLine 2',
    })

    expect(html).toContain('<strong>Subject:</strong> Hello')
    expect(html).toContain('<strong>Form Type:</strong> contact')
    expect(html).toContain('Line 1<br>Line 2')
    expect(html).toContain('Submitted on:')
  })

  it('omits subject and formType sections when not provided', () => {
    const html = defaultFormTemplate({
      firstName: 'Erin',
      lastName: 'Marchak',
      email: 'erin@example.com',
      message: 'Hello',
    })

    expect(html).not.toContain('<strong>Subject:</strong>')
    expect(html).not.toContain('<strong>Form Type:</strong>')
  })
})

