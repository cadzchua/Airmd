import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Box,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const LeftDrawer = ({
    isOpen,
    onClose,
    onChannelSelect,
    selectedChannel,
}: {
    isOpen: boolean
    onClose: () => void
    onChannelSelect: (channel: string) => void
    selectedChannel: string | null
}) => {
    const [isExpanded, setIsExpanded] = useState(true) // Set initial state to expanded
    const [localSelectedChannel, setLocalSelectedChannel] = useState(selectedChannel || '')

    const handleChannelClick = (channel: string) => {
        setLocalSelectedChannel(channel)
        onChannelSelect(channel)
    }

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <Drawer
            placement='left'
            onClose={onClose}
            isOpen={isOpen}
            size={isExpanded ? 'md' : 'sm'} // Adjust size based on expansion
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>
                    Channel List
                    <Button onClick={handleToggleExpand} ml={4}>
                        {isExpanded ? 'Minimize' : 'Expand'}
                    </Button>
                </DrawerHeader>
                <DrawerBody>
                    <Box>
                        <Link
                            to='/channel/1'
                            onClick={() => handleChannelClick('Channel 1')}
                            style={{ cursor: 'pointer' }}
                        >
                            Channel 1
                        </Link>
                        {localSelectedChannel === 'Channel 1' && (
                            <div style={{ marginLeft: '20px' }}>
                                <p>Gist 1</p>
                                <div style={{ marginLeft: '20px' }}>
                                    <p>Gist Item 1</p>
                                    <p>Gist Item 2</p>
                                </div>
                            </div>
                        )}
                    </Box>
                    <Box>
                        <Link
                            to='/channel/2'
                            onClick={() => handleChannelClick('Channel 2')}
                            style={{ cursor: 'pointer' }}
                        >
                            Channel 2
                        </Link>
                        {localSelectedChannel === 'Channel 2' && (
                            <div style={{ marginLeft: '20px' }}>
                                <p>Gist 2</p>
                                <div style={{ marginLeft: '20px' }}>
                                    <p>Gist Item 3</p>
                                    <p>Gist Item 4</p>
                                </div>
                            </div>
                        )}
                    </Box>
                    <Box>
                        <Link
                            to='/channel/3'
                            onClick={() => handleChannelClick('Channel 3')}
                            style={{ cursor: 'pointer' }}
                        >
                            Channel 3
                        </Link>
                        {localSelectedChannel === 'Channel 3' && (
                            <div style={{ marginLeft: '20px' }}>
                                <p>Gist 3</p>
                                <div style={{ marginLeft: '20px' }}>
                                    <p>Gist Item 5</p>
                                    <p>Gist Item 6</p>
                                </div>
                            </div>
                        )}
                    </Box>
                    <Box>
                        <Link
                            to='/channel/4'
                            onClick={() => handleChannelClick('Channel 4')}
                            style={{ cursor: 'pointer' }}
                        >
                            Channel 4
                        </Link>
                        {localSelectedChannel === 'Channel 4' && (
                            <div style={{ marginLeft: '20px' }}>
                                <p>Gist 4</p>
                                <div style={{ marginLeft: '20px' }}>
                                    <p>Gist Item 7</p>
                                    <p>Gist Item 8</p>
                                </div>
                            </div>
                        )}
                    </Box>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default LeftDrawer
