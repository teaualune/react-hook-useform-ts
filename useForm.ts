import React, { useState, FormEvent, ChangeEvent } from 'react'

export interface IUseFormOptions {
  initialState?: { [key: string]: any }
  onSuccessSubmit: (inputs: { [key: string]: any }) => void
  validate: (inputs: { [key: string]: any }) => { [key: string]: any }
}

export default function useForm(opts: IUseFormOptions) {

  const { validate } = opts

  const [ inputs, setInputs ] = useState(opts.initialState || {})
  const [ errors, setErrors ] = useState<any>({})
  const [ submitted, setSubmitted ] = useState(false)

  const [ pristine, setPristine ] = useState(true)

  function dispatchInputs(values: any) {
    const newInputs = { ...inputs, ...values }
    setInputs(newInputs)
    if (pristine) {
      setPristine(false)
    }
    if (submitted) {
      setErrors(validate(newInputs))
    }
  }

  return {
    dispatchInputs,
    errors,
    inputs,
    pristine,
    submitted,
    onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      setSubmitted(true)
      const newErrors = validate(inputs)
      setErrors(newErrors)
      if (Object.keys(newErrors).length === 0) {
        setPristine(true)
        opts.onSuccessSubmit(inputs)
      }
    },
    onChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
      dispatchInputs({ [event.target.name]: event.target.value })
    },
    onChangeRadio(event: React.ChangeEvent<{}>, value: string) {
      const target = event.target as HTMLInputElement
      dispatchInputs({ [target.name]: value })
    },
  }
}
