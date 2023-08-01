import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"
import { logout } from "../login/loginSlice"
import withAuth from "../auth/Auth"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  // Redux
  const dispatch: AppDispatch = useDispatch()
  const userEmail = useSelector((state: RootState) => state.login.email)

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <section className={styles.wrapper} aria-labelledby="welcome-heading">
      <h2 id="welcome-heading">Welcome, {userEmail} 😊</h2>
      <button
        className={styles.logoutButton}
        onClick={onLogout}
        aria-label="Logout"
      >
        Logout
      </button>
    </section>
  )
}

export default withAuth(Dashboard)
