import React, { useEffect, useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useNavigate } from "react-router"
import styled from "styled-components"

import Copyright from "../components/customCopyright"
import { useRent } from "./hooks/useRent"

const theme = createTheme()
const BoxField = styled(Box)({
  mt: 2,
  mb: 2,
})

export default function SignIn() {
  const useRentContext = useRent()
  const [error, setError] = useState(false)
  const { username, setUsername } = useRentContext
  const [errUsernameinfo, setErrUsernameinfo] = useState("")
  const { passwd, setPasswd } = useRentContext
  const [errPasswdinfo, setErrPasswdinfo] = useState("")
  const { signedIn } = useRentContext
  const { setToken } = useRentContext
  const { setRenderLoading } = useRentContext

  const [ServerError, setServerError] = useState(false)
  const [ServerErrorText, setServerErrorText] = useState("")

  const { login } = useRentContext
  const navigate = useNavigate()

  useEffect(() => {
    if (signedIn) navigate("/")
  }, [])
  useEffect(() => {
    setPasswd("")
  }, [])

  const handleSubmit = async () => {
    // if (error) return

    // console.log(username, passwd)
    if (!username) {
      setError(true)
      setErrUsernameinfo("Username cannot be empty")
      return
    }
    try {
      const { data } = await login({
        variables: {
          username: username,
          passwd: passwd,
        },
      })
      // console.log(data, passwd)
      setPasswd("")
      // setIdentity(identityOptions[0].label)

      // setSignedIn(true)
      setToken(data.login)
      // console.log(data.login)
      setRenderLoading(true)
      navigate("/")
    } catch (e) {
      console.log(e)
      setServerError(false)
      setErrUsernameinfo("")
      setErrPasswdinfo("")

      if (e.message.includes("USER_NOTFOUND_ERROR")) {
        setError(true)
        setErrUsernameinfo(`Username '${username}' not found!!`)
      } else if (e.message.includes("PASSWORD_INCORRECT_ERROR")) {
        setError(true)
        setErrPasswdinfo("Incorrect password")
      } else {
        setServerError(true)
        setServerErrorText("Server error. Please contact admin ASAP.")
      }
      // console.log(e.message)
    }
  }

  return signedIn ? (
    <></>
  ) : (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xs"
        sx={{
          height: window.innerHeight,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit()
          }
        }}
      >
        <Box
          sx={{
            pt: 4,
            pl: 5,
            pb: 3,
            pr: 5,
            // border: "2.5px dashed black",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // bgcolor: "rgba(30, 200 ,240, 0.2)",
            bgcolor: "rgba(100, 100, 100, 0.1)",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "yellowgreen", transform: "scale(1.2)" }}
          >
            <LockTwoToneIcon sx={{ color: "black", opacity: 0.7 }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mt: 2,
              mb: 2,
            }}
          >
            Sign In
          </Typography>
          <Typography
            component="p"
            // variant="body1"
            // sx={{
            //   mb: 3,
            // }}
          >
            Don't have an account?{" "}
            <Link
              onClick={() => navigate("/register")}
              sx={{ cursor: "pointer" }}
            >
              Sign Up
            </Link>
          </Typography>
          <Box
            // component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: 300 }}
          >
            <BoxField
              sx={{
                mt: 2,
                mb: 2,
              }}
            >
              <TextField
                type="search"
                label="Username"
                // required
                fullWidth
                autoFocus
                error={error}
                helperText={errUsernameinfo}
                autoComplete="username"
                size="small"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                // variant="filled"
                // placeholder="Username"
              />
            </BoxField>
            <BoxField
              sx={{
                mt: 2,
                mb: 2,
              }}
            >
              <TextField
                type="password"
                label="Password"
                // required
                fullWidth
                autoComplete="current-password"
                error={error}
                helperText={errPasswdinfo}
                size="small"
                value={passwd}
                onChange={(e) => setPasswd(e.currentTarget.value)}
                // variant="filled"
                // placeholder="Username"
              />
            </BoxField>

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {ServerError ? (
              <Typography color="error" fontSize={14}>
                {ServerErrorText}
              </Typography>
            ) : (
              <></>
            )}
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid
                item
                xs
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link
                  sx={{ cursor: "pointer" }}
                  variant="body2"
                  onClick={() => navigate("/")}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright
            sx={{
              mt: 5,
            }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  )
}
