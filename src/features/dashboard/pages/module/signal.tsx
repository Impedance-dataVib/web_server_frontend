import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { buildSignalData, getCommaSepratedChannel } from "src/app/utils/helper";
import { LineChart } from "src/features/common/graph/line-chart";
import useWebSocket from "react-use-websocket";

const Signal = ({ signals, formData, moduleType }: any) => {
  const labels = ["", ""];
  const [channelNames, setChannelNames] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState([]);
  // REACT_APP_SIGNAL_WEBSOCKET_URL
  const { sendMessage, lastMessage } = useWebSocket(
    process.env.REACT_APP_SIGNAL_WEBSOCKET_URL ||
      `ws:${window.location.hostname}:8083`,
    {
      onMessage: () => {
        if (sendMessage) sendMessage(channelNames);
      },
      shouldReconnect: (closeEvent) => true,
    }
  );

  useEffect(() => {
    if (lastMessage !== undefined) {
      const data = lastMessage?.data;
      if (data) {
        let parsedData = JSON.parse(data);
        if (parsedData?.Status === "Failed") {
        } else {
          parsedData = buildSignalData(parsedData, formData, moduleType);
          setGraphData(parsedData || []);
        }
        setIsLoading(false);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    setChannelNames(getCommaSepratedChannel(formData, moduleType));
  }, [moduleType, formData]);

  useEffect(() => {
    if (channelNames) {
      setIsLoading(true);
      sendMessage(channelNames);
    }
  }, [channelNames]);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: isLoading ? "column" : "row",
        overflowX: "auto",
        height: "200px",
      }}
    >
      {isLoading && (
        <Box sx={{ my: 1, width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {graphData &&
        graphData.map((val: any, index) => (
          <Box
            sx={{ width: graphData.length === 1 ? "100%" : "50%" }}
            key={`signalgraph${index}`}
          >
            <LineChart
              max={parseInt(val?.value) + 20}
              data={{
                labels,
                datasets: [
                  {
                    label: `${val.title} - ${parseInt(val?.value) || 0}`,
                    data: [
                      parseInt(val?.value) || 0,
                      parseInt(val?.value) || 0,
                    ],
                    borderColor: index % 2 ? "#E18442" : "#02B271",
                    backgroundColor: index % 2 ? "#E18442" : "#02B271",
                  },
                ],
              }}
            />
          </Box>
        ))}
      {graphData && graphData.length === 0 && !isLoading && (
        <Typography textAlign={"center"} sx={{ width: "100%" }}>
          No Signal Data found
        </Typography>
      )}
    </Box>
  );
};

export default Signal;
