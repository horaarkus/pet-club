import { FC, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { RootState } from "../../app/store"

const withAuth = (Component) => {
  const RequireAuthHOC: FC = (props) => {
    const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      console.log(isLoggedIn, "isLogged")
      if (!isLoggedIn) {
        navigate("/")
      }
    }, [isLoggedIn, navigate, location])

    if (!isLoggedIn) {
      return null
    }

    return <Component {...props} />
  }

  return RequireAuthHOC
}

export default withAuth
