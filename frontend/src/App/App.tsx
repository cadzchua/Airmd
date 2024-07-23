import { ChakraProvider } from '@chakra-ui/react'
import { AppRouter } from './AppRouter'

function App() {
  return (
    <ChakraProvider>
      <AppRouter />
    </ChakraProvider>
  )
}

export default App
