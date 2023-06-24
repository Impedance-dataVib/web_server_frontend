import React, { useEffect, useState } from "react";
import { Typography, Box, Divider, Grid, LinearProgress } from "@mui/material";
import Auxiliarydata_speedometer from "./Auxiliarydata_speedometer";
import { buildAuxData } from "src/app/utils/helper";
import useWebSocket from "react-use-websocket";

const FileBrowserPage = () => {
  const [isDataAvailable, setIsDataAvailable] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [globalIndicator, setGlobalIndicator] = useState<any>([]);
  const [isWebsocketConnect, setIsWebSocketConnect] = useState(true);

  const { sendMessage, lastMessage } = useWebSocket(
    process.env.REACT_APP_WEBSOCKET_URL ||
      `ws:${window.location.hostname}:8081`,
    {
      onMessage: () => {
        if (sendMessage) {
          sendMessage("PROCESS1");
        }
        console.log(lastMessage);
      },
      onError: (e) => {
        setIsDataAvailable("Something went wrong!. ");
        setIsLoading(false);
      },
      shouldReconnect: (closeEvent) => true,
    },
    isWebsocketConnect,
  );

  useEffect(() => {
    return(() => setIsWebSocketConnect(false))
  }, []); 

  useEffect(() => {
    sendMessage("PROCESS1");
  }, []);
  useEffect(() => {
    if (lastMessage !== undefined) {
      setIsLoading(true);
      const data = lastMessage?.data;
      if (data) {
        try {
          const parsedData = buildAuxData(data);
          setIsLoading(false);
          setGlobalIndicator(parsedData);
          console.log(parsedData);
        } catch (ex) {
          console.error(ex);
          setIsLoading(false);
        }
      }
    } else {
      setIsLoading(false);
      <Box sx={{ textAlign: "center" }}>No Data Available</Box>;
    }
  }, [lastMessage]);
  return (
    <Box>
      {isLoading && (
        <Box sx={{ my: 1 }}>
          <LinearProgress />
        </Box>
      )}
      <Typography
        variant="h5"
        padding={2}
        sx={{ fontWeight: 600, fontSize: "24px" }}
      >
        Auxiliary Data
      </Typography>
      <Box sx={{ bgcolor: "white" }}>
        <Divider sx={{ mb: "10px" }} />
        <Grid container spacing={2}>
          {globalIndicator.map((val: any) => (
            <Auxiliarydata_speedometer val={val} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default FileBrowserPage;
