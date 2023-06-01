import { Box, LinearProgress } from "@mui/material";
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
      `ws:${window.location.hostname}:8082`,
    {
      onOpen: () => console.log("Signal opened"),
      onMessage: () => {
        if (sendMessage) sendMessage(channelNames);
      },
      onReconnectStop: () => console.log(true),
      shouldReconnect: (closeEvent) => true,
      onClose: () => console.log("Signal closed")
    }
  );

  useEffect(() => {
    console.log("signal", lastMessage);
    if (lastMessage !== undefined) {
      const data = lastMessage?.data;
      if (data) {
        let parsedData = data;
        if (parsedData?.Status === "Failed") {
        } else {
          console.log(JSON.parse(parsedData));
          parsedData = buildSignalData(JSON.parse(parsedData));
          console.log(parsedData);
          setGraphData(parsedData);
        }
        setIsLoading(false);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    console.log(
      JSON.parse(formData),
      moduleType,
      getCommaSepratedChannel(formData, moduleType)
    );
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
        flexDirection: isLoading ? "column" :  "row",
        overflowX: "scroll",
        height: "200px",
      }}
    >
      {isLoading && (
        <Box sx={{ my: 1, width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {graphData &&
        graphData.map((val:any, index) => (
          <Box sx={{ width: graphData.length ===1 ? "100%" : "50%" }} key={`signalgraph${index}`}>
            <LineChart
              max={parseInt(val?.value)+20}
              data={{
                labels,
                datasets: [
                  {
                    label: `${val.title} - ${parseInt(val?.value) || 0}`,
                    data: [parseInt(val?.value) || 0, parseInt(val?.value) || 0],
                    borderColor: (index%2)? '#E18442': "#02B271",
                    backgroundColor: (index%2)? '#E18442': "#02B271",
                  },
                ],
              }}
            />
          </Box>
        ))}
    </Box>
  );
};

export default Signal;
