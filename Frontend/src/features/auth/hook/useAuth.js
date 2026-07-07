import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

//this reinitializes the page right after reload

export function useAuth() {


    const dispatch = useDispatch()

    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true))
            const data = await register({ email, username, password })
            return true;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
            return false;
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true))
            const data = await login({ email, password })
            dispatch(setUser(data.user))
            return true;
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Login failed"))
            return false;
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Failed to fetch user data"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogout() {
        try {
            dispatch(setLoading(true))
            await logout()
            dispatch(setUser(null))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Logout failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    // async function handleForgotPassword({ email }) {
    //     try {
    //         dispatch(setLoading(true))
    //         const data = await forgotPassword({ email })
    //         return { success: true, message: data.message }
    //     } catch (err) {
    //         const errMsg = err.response?.data?.message || "Failed to send reset link"
    //         dispatch(setError(errMsg))
    //         return { success: false, error: errMsg }
    //     } finally {
    //         dispatch(setLoading(false))
    //     }
    // }

    // async function handleResetPassword({ token, password }) {
    //     try {
    //         dispatch(setLoading(true))
    //         const data = await resetPassword({ token, password })
    //         return { success: true, message: data.message }
    //     } catch (err) {
    //         const errMsg = err.response?.data?.message || "Failed to reset password"
    //         dispatch(setError(errMsg))
    //         return { success: false, error: errMsg }
    //     } finally {
    //         dispatch(setLoading(false))
    //     }
    // }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout
    }

}