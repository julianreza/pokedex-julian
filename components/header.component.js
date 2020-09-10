import React from "react"

import {
  IconButton,
  TextField
} from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';

import dataType from '../type.json'

const Header = ({ filter, setFilter }) => {

  return (
    <div className="w-full flex flex-row justify-between items-center bg-teal-900 px-4 fixed z-50">
      <div>
        <IconButton>
          <img src='/pokemon.png' className="h-10 h-10" />
        </IconButton>
        <span className="font-sans text-white font-semibold text-2xl">Pokedex</span>
      </div>
      <div>
        <Autocomplete
          value={filter}
          onChange={(event, newValue) => {
            setFilter(newValue);
          }}
          className="bg-white ml-12 rounded-lg text-black"
          options={dataType}
          getOptionLabel={(option) => option.type !== undefined ? option.type : ""}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} placeholder="Filter Type Pokemon" variant="outlined" />}
        />
      </div>
    </div>
  )
}

export default Header
