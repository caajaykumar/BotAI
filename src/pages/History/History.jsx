import { Typography, Box, Stack, Divider } from '@mui/material';
import { useEffect, useState } from 'react';

import Navbar from '../../Components/Navbar/Navbar';
import ChatFilter from '../../Components/ChatFilter/ChatFilter';
import ChatHistoryCard from '../../Components/ChatHistoryCard/ChatHistoryCard';

export default function History() {
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    const localChats = localStorage.getItem('chat');
    if (localChats) {
      const parsedChats = JSON.parse(localChats);
      setChats(parsedChats);
      setFilteredChats(parsedChats);
    }
  }, []);

  return (
    <Box
      height={'100vh'}
      overflow={'hidden'}
      sx={{
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(151, 133, 186,0.4)',
          borderRadius: '8px',
        },
      }}
    >
      <Navbar />

      <Box p={{ xs: 2, md: 3 }}>
        <Typography variant='h2' textAlign={'center'} mb={3}>
          Conversation History
        </Typography>

        {/* Show filter only if chats are available */}
        {chats.length > 0 && (
          <ChatFilter allChats={chats} filterChats={setFilteredChats} />
        )}

        {/* No saved chats */}
        {chats.length === 0 && (
          <Typography
            textAlign={'center'}
            p={3}
            bgcolor={'primary.light'}
            borderRadius={2}
          >
            No saved chats.
          </Typography>
        )}

        {/* Filter returned no results */}
        {chats.length > 0 && filteredChats.length === 0 && (
          <Typography
            textAlign={'center'}
            p={3}
            bgcolor={'primary.light'}
            borderRadius={2}
          >
            No such chats.
          </Typography>
        )}

        {/* Display filtered chats */}
        {filteredChats.length > 0 && (
          <Stack
            spacing={4}
            divider={<Divider sx={{ borderColor: 'primary.bg', opacity: 0.4 }} />}
          >
            {filteredChats.map((item, index) => (
              <ChatHistoryCard details={item} key={index} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
