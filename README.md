React Hook Example: `useForm`
---

This is a demonstration about building your own [React Hook](https://reactjs.org/docs/hooks-intro.html), written in TypeScript.

Some notes about the demostrated `useForm` hook:

* There are 3 exposed handlers for handling value changes, where `onChange` fits in common use cases for `input` and `dispatchInputs` is slightly low leveled.
* `pristine` refers to whether the form is touched. It's the antonym of `dirty`. This is convenient for building "Do you want to save before leaving?" confirmation feature.


### License

WTFPL
