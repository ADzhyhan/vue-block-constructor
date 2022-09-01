export default {
  methods: {
    validationForm(keyRefInput) {
      const validationFieldsStatuses = []
      // console.log(keyRefInput);
      Object.entries(keyRefInput).forEach(e => {
        // console.log(e);
        const [key, value] = e
        // console.log(value);
        if (e) {
          value.$v.$touch()
          validationFieldsStatuses.push(value.$v.$invalid)
        }
      })
      // return status validation form
      return !validationFieldsStatuses.includes(true)

    }
  }
}
