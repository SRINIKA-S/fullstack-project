import React, { useState, useEffect } from 'react';
import styles from './feed.module.css';
import { Card, CardHeader, CardContent, Typography, Stack, Avatar, Grid, Fab, Box, Modal, TextField, Button, CircularProgress, IconButton, Input } from "@mui/material";
import {CardOverflow} from '@mui/joy';
import CommentIcon from '@mui/icons-material/Comment';
import AddIcon from '@mui/icons-material/Add';
import { red } from '@mui/material/colors';
import Search from '../search/search';
import axios from 'axios';
import { POST_URL } from '../url';

function Item({ name, text, title }) {
  return (
    <Card sx={{
      minWidth: 200,
    }}>
      <CardHeader avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {name[0].toUpperCase()}
        </Avatar>
      }
        title={name}
        subheader={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  )
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );
  return debouncedValue;
}

async function searchPost(query) {
  try {
    let url = POST_URL;
    if (query) {
      url = `${POST_URL}?q=${query}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function createPost(title, text) {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const response = await axios.post(POST_URL, { title, text, user_email: user.email });
    return response.data.post;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function Feed() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 500);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const refresh = async(debouncedSearchTerm) => {
    const data = await searchPost(debouncedSearchTerm ?? undefined);
        if (data) {
          setList(data.posts);
        } else {
          setList([]);
        }
  }
  useEffect(() => {
    (async() => {
      if (debouncedSearchTerm) {
        setLoading(true);
        refresh(debouncedSearchTerm);
      } else {
        setLoading(true);
        refresh(null);
      }
      setLoading(false);
    })();
  }, [debouncedSearchTerm]);
  return (<Stack style={{
    width: '100%',
    height: '100%',
  }}>
    <Search value={search} onChange={e => setSearch(e.target.value)} />
    <Box position={"relative"} height={'100%'}>
      {loading ? (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <CircularProgress />
        </div>
      ) : list.length > 0 ? <Grid sx={{
        marginTop: 1,
        paddingLeft: 1,
        width: '100%',
        position: 'absolute',
        height: 'calc(100% - 64px)',
        overflowX: 'hidden',
        overflowY: 'auto'
      }} container spacing={2}>
        {list.map((item) => <Grid padding={0} key={item} item xs={12} sm={6} md={4} sx={{
          padding: 0,
        }}>
          <Item name={item.user.name} text={item.text} title={item.title} />
        </Grid>)}
      </Grid> : (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {(debouncedSearchTerm && !loading) ? "No results found! Create first post regarding this" : "Empty feed, click below to add items"}
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddPost onClick={async (title, text) => {
          const post = await createPost(title, text);
          if (post) {
            setLoading(true);
            if (debouncedSearchTerm) {
              refresh(debouncedSearchTerm);
            } else {
              refresh(null);
            }
            setLoading(false);
          }
          handleClose();
        }} />
      </Modal>
      <Fab style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
      }} color="primary" onClick={handleOpen} aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  </Stack>);
}

function AddPost(props) {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  return (<Stack sx={style}>
    <TextField label="title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
    <TextField label="text" variant="outlined" value={text} onChange={(e) => setText(e.target.value)} />
    <TextField label="comment" variant="outlined" value={comment} onChange={(e) => setComment(e.target.value)} />
    
    

      <Button onClick={() => props.onClick(title,text)}>Post</Button>


  </Stack>);
}

Feed.propTypes = {};

Feed.defaultProps = {};

export default Feed