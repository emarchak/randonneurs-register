// https://resend.com/docs/audiences
export type CustomFieldName = 'chapter' | 'gender' | 'last_schedid' | 'start_time'
export type CustomFieldType = {
  name: CustomFieldName
  field_type: 'Text' | 'Number' | 'Date'
}

const customFields: CustomFieldType[] = [
  { name: 'chapter', field_type: 'Text' },
  { name: 'last_schedid', field_type: 'Number' },
  { name: 'start_time', field_type: 'Text' }
]

export default customFields
