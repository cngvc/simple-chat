import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useCreateChat } from "../../../hooks/useCreateChat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/errors";
import route from "../../Routes";

interface ChatListAddProps {
  open: boolean;
  onClose: () => void;
}

const ChatListAdd = ({ open, onClose }: ChatListAddProps) => {
  const [isPrivate, $isPrivate] = useState(true);
  const [name, $name] = useState("");
  const [error, $error] = useState("");
  const [createChat] = useCreateChat();

  useEffect(() => {
    if (!open) {
      $isPrivate(false);
      $error("");
      $name("");
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            Add Conversation
          </Typography>

          <FormGroup>
            <FormControlLabel
              style={{ width: 0 }}
              control={
                <Switch
                  defaultChecked={isPrivate}
                  value={isPrivate}
                  onChange={(event) => $isPrivate(event.target.checked)}
                />
              }
              label="Private"
            />
          </FormGroup>
          {isPrivate ? (
            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Users" />
              <IconButton sx={{ p: "10px" }}>
                <SearchIcon />
              </IconButton>
            </Paper>
          ) : (
            <TextField
              label="Name"
              error={!!error}
              helperText={error}
              value={name}
              onChange={(event) => $name(event.target.value)}
            />
          )}
          <Button
            variant="outlined"
            disabled={!name.length}
            onClick={async () => {
              if (!name.length) {
                $error("Chat name is required");
              }
              try {
                const chat = await createChat({
                  variables: {
                    createChatInput: {
                      isPrivate,
                      name: name || undefined,
                    },
                  },
                });
                onClose();
                route.navigate(`/chats/${chat.data?.createChat._id}`);
              } catch (error) {
                $error(UNKNOWN_ERROR_MESSAGE);
              }
            }}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChatListAdd;