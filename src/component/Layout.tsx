import AuthContext from '../AuthContext';
import { LogoutOutlined } from '@mui/icons-material';
import { Stack, Switch, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = { children: ReactNode }

const Layout = ({children}: Props) => {
  const [isAdmin, setIsAdmin] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked);
  };

  return (
    <AuthContext.Provider value={{ isAdmin }}>
    <div className='bg-black'>
      <div className='sticky h-[50px] w-full justify-end items-center flex'>
      <Stack direction="row" spacing={1} alignItems="center" sx={{marginRight:'5rem'}}>
        <Typography sx={{color:'white'}}>admin</Typography>
        <Switch inputProps={{ 'aria-label': 'ant design' }} onChange={handleChange}/>
        <Typography sx={{color:'white'}}>user</Typography>
      </Stack>
      <LogoutOutlined sx={{color:'white', marginRight:'2rem'}}/>
      </div>        {children}
</div>
      </AuthContext.Provider>
  )
}

export default Layout