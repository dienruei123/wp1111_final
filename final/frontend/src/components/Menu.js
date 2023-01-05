import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { useRent } from "../containers/hooks/useRent"
import { useNavigate } from "react-router"

const options = ["Settings", "More Events", "Logout"]

const ITEM_HEIGHT = 48

export default function LongMenu() {
  const useRentContext = useRent()
  const { username } = useRentContext
  const { logout } = useRentContext
  const { setToken } = useRentContext
  const { setRenderLoading } = useRentContext
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const Logout = async () => {
    const { data } = await logout({
      variables: {
        username: username,
      },
    })
    // console.log(data)

    setToken("")
    setRenderLoading(true)
    navigate("/")
  }
  const handleMenuOptions = (key) => {
    switch (key) {
      case "More Events": {
        navigate("/allevents")
        handleClose()
        break
      }
      case "Logout": {
        Logout()
        break
      }
      default: {
        navigate("/")
      }
    }
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleMenuOptions(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
