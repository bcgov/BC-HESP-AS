import { Box, Heading } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { useMst } from "../../../setup/root"
import { FlashMessage } from "../../shared/flash-message"
import { ForgotPasswordScreen } from "../authentication/forgot-password-screen"
import { LoginScreen } from "../authentication/login-screen"
import { RegisterScreen } from "../authentication/register-screen"
import { ResetPasswordScreen } from "../authentication/reset-password-screen"
import { LandingScreen } from "../landing"
import { PermitApplicationBuilderScreen } from "../permit-application-builder"
import { NavBar } from "./nav-bar"

export const Navigation = observer(() => {
  const {
    sessionStore: { validateToken },
  } = useMst()

  useEffect(() => {
    validateToken()
  }, [])

  return (
    <BrowserRouter>
      <Box pos="relative" w="full">
        <Box pos="absolute" top={0} zIndex="toast" w="full">
          <FlashMessage />
        </Box>
      </Box>

      <NavBar />
      <AppRoutes />
    </BrowserRouter>
  )
})

interface IAppRoutesProps {}

const AppRoutes = observer(({}: IAppRoutesProps) => {
  const location = useLocation()

  const { sessionStore } = useMst()
  const { loggedIn } = sessionStore

  return (
    <Routes location={location}>
      {loggedIn ? (
        <Route path="/" element={<Heading>Housing Permit Portal!</Heading>} />
      ) : (
        <>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          {/*TODO remove test route below*/}
          <Route path={"/pab"} element={<PermitApplicationBuilderScreen />} />
        </>
      )}
    </Routes>
  )
})
