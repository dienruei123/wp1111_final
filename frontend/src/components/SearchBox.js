import React from 'react';
import { Box } from "@mui/material"
import { TextField } from "@mui/material"
import { useRent } from '../containers/hooks/useRent';

const MultilineTextFields = ({onSearch}) => {
    const { searchEvent, setSearchEvent } = useRent();
    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Search"
                    multiline
                    maxRows={4}
                    value={searchEvent}
                    onChange={(e) => {
                        setSearchEvent(e.target.value)
                        onSearch(e.target.value)
                    }}
                />
            </div>
        </Box>
    )
}

export default MultilineTextFields