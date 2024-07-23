import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <Box height='100vh' display='flex' flexDirection='column'>
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Box>
  )
}
