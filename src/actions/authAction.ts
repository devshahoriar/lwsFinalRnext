'use server'

export const registerAct = async (pvaction: any, data: FormData) => {
  const { name, email, password, confirm, aggrement } = Object.fromEntries(
    data.entries()
  )
  if (name === '' || email === '' || password === '' || confirm === '') {
    return { error: 'Please fill all the fields' }
  }
  if (password !== confirm) {
    return { error: 'Password do not match' }
  }
  if (aggrement === undefined) {
    return { error: 'Please agree to the terms and conditions' }
  }

  return { name, email, password, confirm, aggrement }
}
