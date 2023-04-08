import React, { ChangeEvent, ReactNode, useState } from 'react'
import { ContentWrapper } from '../content-wrapper'
import { Form, InputField, ErrorsList, SubmitButton } from '../form/components'
import { FormState, formSubmit, RequiredFields, validate } from '../form/utils'
import { createContact } from 'src/data/mail/api/contact'
import { getList } from 'src/data/mail/api/lists'

const formName = 'mailing-list'

const requiredFields: RequiredFields<FormData> = [
  'firstName',
  'lastName',
  'email',
]

const fieldLabels = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
}

type FormData = {
  firstName: string
  lastName: string
  email: string
}

type MailingFormProps = {
  submitLabel?: string
  listName: string
  children?: ReactNode
}

export const MailingForm = ({
  submitLabel = 'Subscribe',
  listName,
  children,
}: MailingFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  })
  const [formState, setFormState] = useState<FormState>(null)
  const [formErrors, setFormErrors] = useState<string[]>([])

  const isSubmitted = formState === 'submitted'
  const isDirty = formState === 'dirty'
  const hasError = Boolean(formErrors.length)

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    const errors = validate(formData, fieldLabels, requiredFields)

    if (errors.length) {
      setFormErrors(errors)
      setFormState(null)
      return
    }

    try {
      const { id } = await getList({ name: listName })
      const success = await createContact({ ...formData, lists: [id] })

      if (success) {
        setFormState('submitted')
      } else {
        throw new Error()
      }
    } catch {
      setFormErrors(['Server error! Try again later.'])
    }
  }

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value = '', name } = evt.target

    setFormState('dirty')
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  if (isSubmitted) {
    return (
      <Form name={formName}>
        <ContentWrapper>
          {children}
          <div aria-live="polite">Thank you! We'll be in contact soon.</div>
        </ContentWrapper>
      </Form>
    )
  }

  return (
    <Form name={formName}>
      <ContentWrapper>
        {children}
        <InputField
          name="firstName"
          label={fieldLabels.firstName}
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          name="lastName"
          label={fieldLabels.lastName}
          value={formData.lastName}
          onChange={handleChange}
        />
        <InputField
          name="email"
          label={fieldLabels.email}
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <ErrorsList formErrors={formErrors} />
        <SubmitButton
          disabled={hasError && !isDirty}
          handleSubmit={handleSubmit}
        >
          {submitLabel}
        </SubmitButton>
      </ContentWrapper>
    </Form>
  )
}
