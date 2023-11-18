import React from "react";

// MUI
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { grey } from "@mui/material/colors";

class ErrorCatcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      stack: null,
      message: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, stack: error.stack, message: error.message };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Box component="section" sx={{ py: 10 }}>
            <Typography variant="h1" sx={{ mb: 3, fontSize: "32px" }}>
              Something went wrong!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Please, reload the page
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
            >
              <ReplayIcon />
              <Typography component="span" sx={{ ml: 1 }}>
                Reload
              </Typography>
            </Button>
            <Box component="section" sx={{ mt: 6 }}>
              <details>
                <summary>
                  <Typography
                    variant="h2"
                    sx={{
                      display: "inline",
                      p: 1,
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    Show info about error
                  </Typography>
                </summary>
                <Box
                  sx={{
                    mt: 1,
                    p: 1,
                    border: `1px solid ${grey[500]}`,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {this.state.message}
                  </Typography>
                  <Typography
                    sx={{
                      height: "250px",
                      p: 1,
                      bgcolor: grey[200],
                      borderRadius: 2,
                      overflow: "auto",
                    }}
                  >
                    <code>{this.state.stack}</code>
                  </Typography>
                  <Tooltip title="Copy" placement="left">
                    <IconButton
                      sx={{ display: "flex", mt: 1, ml: "auto" }}
                      onClick={() =>
                        navigator.clipboard.writeText(this.state.stack)
                      }
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </details>
            </Box>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorCatcher;
