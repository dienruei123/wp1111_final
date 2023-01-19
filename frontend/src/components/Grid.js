import * as React from "react"
import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import ButtonBase from "@mui/material/ButtonBase"
import newyearpic from "../eventPictures/2023_NEW-YORK.jpg"
import { IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
})

export default function ComplexGrid({ name, id, description, host, date, photo, isJoined }) {
    const navigate = useNavigate()

    const ToEvent = () => {
        navigate("/event/" + id)
    }

    const handleText = (description, type) => {
        let length
        (type === 'title') ? length = 10 : length = 50
        let briefDescription = description;
        if (description.length > length) {
            briefDescription = briefDescription.substring(0, length) + '...';
        }
        return briefDescription;
    }
    return (
        <ButtonBase sx={{ cursor: 'pointer' }} onClick={ToEvent}>
            <div style={{ padding: '10px' }}>
                <Paper
                    sx={{
                        p: 3,
                        margin: 'auto',
                        width: 400,
                        height: 200,
                        flexGrow: 1,
                        backgroundColor: "white"
                    }}
                    style={{ padding: "12px" }}
                >
                    <Grid container spacing={2} >
                        <Grid item>
                            <ButtonBase sx={{ width: 156, height: 144 }} >
                                <Img alt="complex" src={(photo) ? photo : newyearpic} width="100%" height="85%" />
                            </ButtonBase>
                            <Grid item style={{ bottom: "0px" }}>
                                <Typography sx={{ cursor: 'pointer' }} variant="body2"
                                    style={{ fontFamily: "raisonne-demibold, Raisonne, Futura, Helvetica, Arial, sans-serif" }}
                                >
                                    {(isJoined) ? "Joined" : "New Event"}
                                </Typography>
                            </Grid>
                            <Typography variant="body2" color="text.secondary"
                                style={{ fontFamily: "raisonne-demibold, Raisonne, Futura, Helvetica, Arial, sans-serif" }}
                            >
                                Host: {host}
                            </Typography>
                        </Grid>
                        <Grid item xs={10} md={6} sm container spacing={2}>
                            <Grid item xs container direction="column" spacing={8}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div"
                                        style={{ fontFamily: "raisonne-demibold, Raisonne, Futura, Helvetica, Arial, sans-serif", fontWeight: "bold" }}
                                    >
                                        {handleText(name, "title")}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {handleText(description, "")}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle" component="div"
                                    style={{ fontFamily: "raisonne-demibold, Raisonne, Futura, Helvetica, Arial, sans-serif" }}
                                >
                                    {date}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </ButtonBase>
    );
}
