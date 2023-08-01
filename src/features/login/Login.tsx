import { FC, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginAction, loginSuccess } from "./loginSlice"
import { AppDispatch, RootState } from "../../app/store"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import AppStore from "../../Icons/AppStore"
import ClosedEye from "../../Icons/ClosedEye"
import Info from "../../Icons/Info"
import Mail from "../../Icons/Mail"
import OpenEye from "../../Icons/OpenEye"
import PlayStore from "../../Icons/PlayStore"
import PetCloudLogo from "../../Icons/PetCloudLogo"
import PetCloudQrCode from "../../Icons/PetCloudQrCode"
import styles from "./Login.module.css"

interface LoginFormValues {
  email: string
  password: string
}
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
})

const Login: FC = () => {
  // Router
  const navigate = useNavigate()
  //Redux
  const dispatch: AppDispatch = useDispatch()
  const isLoading =
    useSelector((state: RootState) => state.login.status) === "loading"
  console.log(isLoading, "isLoading")
  // Form
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  })

  const watchedEmail = watch("email")
  const watchedPassword = watch("password")
  const isEmailValid = !errors.email && watchedEmail
  const ifFormValid = !errors.email && !errors.password

  const onSubmit = async (data: LoginFormValues) => {
    dispatch(loginAction(data))
      .then((result: any) => {
        navigate("/dashboard")
        dispatch(loginSuccess(result.payload.email))
      })
      .catch((error) => {
        console.error("Login failed:", error)
      })
  }
  //
  const [isStep1, setStep1] = useState(true)
  const toggleStep1 = () => setStep1(!isStep1)
  //
  const [isPasswordOpen, setPasswordOpen] = useState(false)
  const togglePassword = () => setPasswordOpen(!isPasswordOpen)

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.leftWrapper}>
          <PetCloudLogo />
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.formWrapper}>
            <h1 className={styles.title}>Sign In</h1>
            <p className={styles.paragraph}>
              From insurance to play dates and everything in between, the Pet
              Cloud makes pet parenting a breeze
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.inputContainer}>
                <label
                  htmlFor="email"
                  className={`${
                    !watchedEmail ? styles.label : styles.activeLabel
                  }`}
                >
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      aria-label="Email"
                      className={styles.input}
                    />
                  )}
                />
                <button className={styles.inputButton}>
                  <Info />
                </button>
                {errors.email && (
                  <span className={styles.alert} role="alert">
                    {errors.email.message}
                  </span>
                )}
              </div>
              {!isStep1 && (
                <div className={styles.inputContainer}>
                  <label
                    htmlFor="password"
                    className={`${
                      !watchedPassword ? styles.label : styles.activeLabel
                    }`}
                  >
                    Password
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type={isPasswordOpen ? "text" : "password"}
                        aria-label="Password"
                        className={styles.input}
                      />
                    )}
                  />
                  <button
                    onClick={togglePassword}
                    className={styles.inputButton}
                  >
                    {isPasswordOpen ? <OpenEye /> : <ClosedEye />}
                  </button>
                  {errors.password && (
                    <span className={styles.alert} role="alert">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              )}

              <div className={styles.buttonsWrapper}>
                {!isStep1 && (
                  <button
                    className={styles.signInButton}
                    type="submit"
                    disabled={!ifFormValid || isLoading}
                  >
                    {isLoading ? "Loading..." : "Sign In"}
                  </button>
                )}
                <button
                  onClick={toggleStep1}
                  className={`${
                    isStep1 ? styles.nextButton : styles.backButton
                  }`}
                  disabled={!isEmailValid}
                >
                  {isStep1 ? "NEXT" : "< BACK"}
                </button>
              </div>
            </form>
            <div className={styles.storesWrapper}>
              <PlayStore /> <AppStore />
            </div>
          </div>
          <div className={styles.qrWrapper}>
            <PetCloudQrCode />
            <p> Download our mobile app</p>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.supportWrapper}>
          <p className={styles.title}>Have questions?</p>
          <div className={styles.linkWrapper}>
            <Mail />
            <a href="mailto:help@support.mypetcloud.com">
              help@support.mypetcloud.com
            </a>
          </div>
        </div>
        <div className={styles.copyrightWrapper}>
          <p>
            Copyright © 2015–2023 Figo Pet insurance LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Login
