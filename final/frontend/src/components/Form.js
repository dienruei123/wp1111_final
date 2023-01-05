import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Selectfilter({ none, filterLatest, filterNewEvent, filterTags }) {
    const [type, setType] = useState('');

    const handleChange = (event) => {
        setType(event.target.value);
        switch (event.target.value) {
            case "none":
                none()
                break;
            case "latest":
                filterLatest()
                break;
            case "new event":
                filterNewEvent()
                break;
            case "tags":
                filterTags()
                break;
        }
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Filter</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={type}
                    onChange={handleChange}
                    autoWidth
                    label="type"
                >
                    <MenuItem value={"none"}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"latest"}>Latest</MenuItem>
                    <MenuItem value={"new event"}>New Event</MenuItem>
                    <MenuItem value={"tags"}>Tags</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}