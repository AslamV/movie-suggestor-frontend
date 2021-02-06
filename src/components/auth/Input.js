import { Grid,TextField,IconButton,InputAdornment } from '@material-ui/core'
import { Visibility,VisibilityOff, VisibilityOffOutlined} from '@material-ui/icons'
import React from 'react'

function Input({half,name,handleChange,label,autoFocus,type,handleShowPassword}) {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
            name={name}
            onChange={handleChange}
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === "password"  ? {
                endAdornment: (
                    <InputAdornment>
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            } : null}
            />
        </Grid>
    )
}

export default Input