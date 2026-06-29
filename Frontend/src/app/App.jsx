import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import { useAuth } from "../features/auth/hook/useAuth"
import { useEffect } from "react"
import { ThemeProvider } from "../context/ThemeContext"

function App() {

  const auth = useAuth()
//this hydrates the user data
  useEffect(() => {
    auth.handleGetMe()
  }, [])

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App