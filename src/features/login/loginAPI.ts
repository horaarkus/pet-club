// A mock function to mimic making an async request for data
interface LoginFormValues {
  email: string
  password: string
}
export function fetchLogin(data: LoginFormValues) {
  return new Promise<{ email: string; password: string }>((resolve) =>
    setTimeout(
      () => resolve({ email: data.email, password: data.password }),
      3000,
    ),
  )
}
