import { Box, Text, Spinner } from '@chakra-ui/react'

interface HelloandErrorProps {
  error: string | null
  data?: string | null
}

const HelloandError = ({ error, data }: HelloandErrorProps) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' height='100%' mt={10}>
      {error ? (
        <Text color='red.500'>Error: {error}</Text>
      ) : (
        <>
          {data ? (
            <Text>Backend Api Response: {data}</Text>
          ) : (
            <Box display='flex' alignItems='center' flexDirection='column'>
              <Text fontSize='xl'>Select a channel to view its details.</Text>
              <Text ml={2} mt={4}>
                Loading
              </Text>
              <Spinner ml={2} mt={2} />
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default HelloandError
