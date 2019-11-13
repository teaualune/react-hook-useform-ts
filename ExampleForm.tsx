import isEmail from 'validator/lib/isEmail'
import useForm from './useForm'

interface IExampleFormProps {
  submitForm: (inputs: { [key: string]: any }) => void
}

export default function ExampleForm(props: IExampleFormProps) {
  const {
    errors,
    inputs,
    submitted,
    onSubmit,
    onChange,
  } = useForm({
    initialState: {
      email: '',
      phone: '',
    },
    onSuccessSubmit: props.submitForm,
    validate: (newInputs: { [key: string]: any }) => {
      const { email, phone } = newInputs
      const newErrors: { [key: string]: any } = {}
      if (!email) {
        newErrors.email = 'Email is required'
      } else if (!isEmail(email)) {
        newErrors.email = 'Email format is invalid'
      }
      if (!phone) {
        newErrors.phone = 'Phone is required'
      } else if (phone.length < 10) {
        newErrors.phone = 'Phone should be at least 10 digits'
      }
      return newErrors
    },
  })
  
  return (<form onSubmit={onSubmit}>
    <fieldset>
      <label>Email</label>
      <input name="email" value={inputs.email} onChange={onChange} />
      { (submitted && errors.email) ? (
        <p>{ errors.email }</p>
      ) : null }
    </fieldset>
    <fieldset>
      <label>Phone</label>
      <input name="phone" value={inputs.phone} onChange={onChange} />
      { (submitted && errors.phone) ? (
        <p>{ errors.phone }</p>
      ) : null }
    </fieldset>
    <fieldset>
      <button type="submit">Submit</button>
    </fieldset>
  </form>)
}
