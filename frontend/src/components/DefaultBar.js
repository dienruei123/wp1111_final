import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { useNavigate } from "react-router"

export default function DefaultBar() {
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1, position: "fixed", zIndex: 10 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "white",
          color: "black",
          boxShadow:
            "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            style={{ fontFamily: "raisonne-demibold, Raisonne, Futura, Helvetica, Arial, sans-serif" }}
            onClick={() => navigate("/")}
          >
            Event Registration Center
          </Typography>
          <Grid>
            <Button color="inherit" style={{ fontFamily: "raisonne-demibold, Raisonne, Futura, Helvetica, Arial, sans-serif" }} onClick={() => navigate("/register")}>
              sign up
            </Button>
            <Button color="inherit" style={{ fontFamily: "raisonne-demibold, Raisonne, Futura, Helvetica, Arial, sans-serif" }} onClick={() => navigate("/login")}>
              Login
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
