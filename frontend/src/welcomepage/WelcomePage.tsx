import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import HelloandError from './components/HelloandError'
import PermDrawer from './components/PermDrawer'

export const WelcomePage = () => {
  const toast = useToast()
  const [data, setData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const API_URL = '/api/dummy-module'
  const testdata: { [key: string]: { [key: string]: string[] } } = {
    'Channel 1': { Gist1: ['GistItem1', 'GistItem2'], Gist2: ['GistItem3', 'GistItem4'] },
    'Channel 2': { Gist3: ['GistItem5', 'GistItem6'] },
  }

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.text()
      })
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        setError(error.message)
      })
  }, [API_URL])

  useEffect(() => {
    if (error) {
      toast({
        title: 'An error occurred.',
        description: error,
        position: 'bottom-right',
        status: 'error',
        isClosable: true,
        duration: 5000,
      })
    }
  }, [error, toast])

  const handleChannelSelect = (channel: string) => {
    setSelectedChannel(channel)
  }

  return (
    <>
      <PermDrawer
        onChannelSelect={handleChannelSelect}
        selectedChannel={selectedChannel}
        data={testdata}
      />
      {!selectedChannel && <HelloandError error={error} data={data} />}
    </>
  )
}
