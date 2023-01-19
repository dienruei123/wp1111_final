import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  Avatar,
  Autocomplete,
  Modal,
  // FormControlLabel,
  // Checkbox,
} from "@mui/material"
import { useNavigate } from "react-router"
import styled from "styled-components"
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone"

import Copyright from "../components/customCopyright"
import { useRent } from "./hooks/useRent"
import { useEffect, useState } from "react"

const BoxField = styled(Box)({
  mt: 2,
  mb: 2,
})
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 180,
  bgcolor: "rgba(255, 255, 255, 1)",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "center",
}

const identityOptions = [{ label: "Participant" }, { label: "Host" }]

const Register = () => {
  const useRentContext = useRent()
  const { username, setUsername } = useRentContext
  const [errUsername, setErrUsername] = useState(false)
  const [errUsernameinfo, setErrUsernameinfo] = useState("")
  const { passwd, setPasswd } = useRentContext
  const [errPasswd, setErrPasswd] = useState(false)
  const [errPasswdinfo, setErrPasswdinfo] = useState("")
  const [confirmPasswd, setConfirmPasswd] = useState("")
  const [errConfirmPasswd, setErrConfirmPasswd] = useState(false)
  const [errConfirmPasswdinfo, setErrConfirmPasswdinfo] = useState("")
  const { identity, setIdentity } = useRentContext
  const { signedIn } = useRentContext
  const [ServerError, setServerError] = useState(false)
  const [ServerErrorText, setServerErrorText] = useState("")

  const [successModal, setSuccessModal] = useState(false)

  const { register } = useRent()
  const navigate = useNavigate()

  useEffect(() => {
    if (signedIn) navigate("/")
  }, [])

  useEffect(() => {
    setPasswd("")
    setConfirmPasswd("")
    if (!signedIn) setIdentity(identityOptions[0].label)
  }, [])

  const checkPasswd = (pass) => {
    return pass.length >= 4
  }
  const openModal = () => {
    setSuccessModal(true)
  }
  const closeModal = () => {
    setSuccessModal(false)
  }

  const handleSubmit = async () => {
    // console.log(username, passwd, confirmPasswd, identity)
    if (errUsername || errPasswd || errConfirmPasswd) return
    if (!username) {
      setErrUsername(true)
      setErrUsernameinfo("Username cannot be empty")
      return
    }
    if (!passwd) {
      setErrPasswd(true)
      setErrPasswdinfo("Password must contain at least 4 characters")
      return
    }
    if (passwd !== confirmPasswd) {
      setErrConfirmPasswd(true)
      setErrConfirmPasswdinfo("Password does not match")
      return
    }

    try {
      const { data } = await register({
        variables: {
          username: username,
          passwd: passwd,
          identity: identity,
        },
      })
      console.log(data, passwd, identity)
      setPasswd("")
      setConfirmPasswd("")
      setIdentity(identityOptions[0].label)
      setServerError(false)
      setServerErrorText("")

      openModal()

      // navigate("/login")
    } catch (e) {
      // console.log(e)
      if (e.message.includes("USER_EXISTING_ERROR")) {
        setErrUsername(true)
        setErrUsernameinfo(`Username '${username}' already exists!!`)
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
    <>
      <Box
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit()
          }
        }}
        sx={{
          margin: 0,
          height: window.innerHeight,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            pt: 3,
            pl: 5,
            pb: 3,
            pr: 5,
            // border: "2.5px dashed black",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(100, 100, 100, 0.1)",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "lightgreen", transform: "scale(1.2)" }}>
            <LockTwoToneIcon sx={{ color: "black", opacity: 0.7 }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mt: 1,
              mb: 1,
            }}
          >
            Create an Account
          </Typography>
          <Typography
            component="p"
            // variant="body1"
            // sx={{
            //   mb: 3,
            // }}
          >
            Already had an account?{" "}
            <Link onClick={() => navigate("/login")} sx={{ cursor: "pointer" }}>
              Sign In
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
                error={errUsername}
                helperText={errUsernameinfo}
                // required
                fullWidth
                // autoFocus
                size="small"
                value={username}
                onBlur={(e) => {
                  if (e.currentTarget.value) setUsername(e.currentTarget.value)
                  else {
                    setErrUsername(true)
                    setErrUsernameinfo("Username cannot be empty")
                  }
                }}
                onChange={(e) => {
                  setUsername(e.currentTarget.value)
                  if (e.currentTarget.value) {
                    setErrUsername(false)
                    setErrUsernameinfo("")
                  }
                }}
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
                error={errPasswd}
                helperText={errPasswdinfo}
                // required
                fullWidth
                size="small"
                value={passwd}
                onBlur={(e) => {
                  if (
                    e.currentTarget.value &&
                    checkPasswd(e.currentTarget.value)
                  ) {
                    setPasswd(e.currentTarget.value)
                    if (confirmPasswd !== "" && confirmPasswd !== passwd) {
                      setErrConfirmPasswd(true)
                      setErrConfirmPasswdinfo("Password does not match")
                    }
                  } else {
                    setErrPasswd(true)
                    setErrPasswdinfo(
                      "Password must contain at least 4 characters"
                    )
                  }
                }}
                onChange={(e) => {
                  setPasswd(e.currentTarget.value)
                  if (
                    e.currentTarget.value &&
                    checkPasswd(e.currentTarget.value)
                  ) {
                    setErrPasswd(false)
                    setErrPasswdinfo("")
                  }
                  if (e.currentTarget.value === confirmPasswd) {
                    setErrConfirmPasswd(false)
                    setErrConfirmPasswdinfo("")
                  }
                }}
                // variant="filled"
                // placeholder="Username"
              />
            </BoxField>
            <BoxField
              sx={{
                mt: 2,
                mb: 1,
              }}
            >
              <TextField
                type="password"
                label="Confirm Password"
                error={errConfirmPasswd}
                helperText={errConfirmPasswdinfo}
                // required
                fullWidth
                size="small"
                value={confirmPasswd}
                onBlur={(e) => {
                  if (e.currentTarget.value && e.currentTarget.value === passwd)
                    setConfirmPasswd(e.currentTarget.value)
                  else if (e.currentTarget.value) {
                    setErrConfirmPasswd(true)
                    setErrConfirmPasswdinfo("Password does not match")
                  }
                }}
                onChange={(e) => {
                  setConfirmPasswd(e.currentTarget.value)
                  if (
                    e.currentTarget.value &&
                    e.currentTarget.value === passwd
                  ) {
                    setErrConfirmPasswd(false)
                    setErrConfirmPasswdinfo("")
                  }
                }}
                // variant="filled"
                // placeholder="Username"
              />
            </BoxField>

            <Autocomplete
              disablePortal
              options={identityOptions}
              fullWidth
              defaultValue={identityOptions[0]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Identity"
                  size="small"
                  // required
                  value={identity}
                />
              )}
              onChange={(event, { label }) => setIdentity(label)}
              sx={{
                mt: 3,
                mb: 3,
              }}
            />
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
              sx={{
                mt: 3,
                mb: 2,
              }}
              onClick={() => handleSubmit()}
            >
              Confirm
            </Button>
          </Box>
          <Copyright
            sx={{
              mt: 3,
            }}
          />
        </Box>
        {/* <Button onClick={openModal}>OPEN</Button> */}
      </Box>
      <Modal open={successModal}>
        <Box
          sx={modalStyle}
          onKeyDown={(e) => {
            // console.log(e.key)
            if (e.key === "Escape") closeModal()
            else if (e.key === "Enter") {
              closeModal()
              navigate("/login")
            }
          }}
        >
          <Typography variant="h4">Yeeeeez!!! {username}.</Typography>
          <Typography
            sx={{
              mt: 2,
            }}
          >
            You've successfully created a new account.
            <br />
            Login now?
          </Typography>
          <Box
            sx={{
              position: "absolute",
              bottom: 30,
              width: 260,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={closeModal}
              color="error"
              variant="contained"
              sx={{
                width: 110,
              }}
            >
              Not now
            </Button>
            <Button
              onClick={() => {
                closeModal()
                navigate("/login")
              }}
              color="success"
              variant="contained"
              sx={{
                width: 110,
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default Register
