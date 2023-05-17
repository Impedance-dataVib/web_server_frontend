import {
  Cancel,
  CropFree,
  CropFreeOutlined,
  Fullscreen,
  Maximize,
  Minimize,
  OpenInFull,
  Remove,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

export interface CardWidgetProps {
  headerLabel: string;
  headerIcon?: React.ReactElement;
  content: React.ReactNode;
  subHeadingRight?: React.ReactNode;
  footerContent?: React.ReactNode;
  initiallyCollapsed?: boolean;
  fullScreenContent?: React.ReactNode;
}

const CardWidget = ({
  headerLabel,
  headerIcon,
  content,
  subHeadingRight,
  footerContent,
  initiallyCollapsed,
  fullScreenContent,
}: CardWidgetProps) => {
  const [collapsed, setCollapsed] = useState(initiallyCollapsed || false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const isBelow1800Pixel = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(1800)
  );

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: "2px 4px 8px #00000029",
        transition: "all .2s linear",
      }}
    >
      <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
        <Box component="section">
          <Box sx={{ display: "flex" }}>
            {headerIcon && (
              <Box
                sx={{ mr: 1, color: "#4d4e4e", height: "20px", width: "18px" }}
              >
                {headerIcon}
              </Box>
            )}

            <Typography
              sx={{
                fontSize: "20px",
                color: "#4d4e4e",
                fontWeight: 600,
                letterSpacing: "0.08px",
              }}
            >
              {headerLabel}
            </Typography>
          </Box>
          {isBelow1800Pixel && (
            <Box>
              {subHeadingRight && (
                <Box sx={{ mr: isBelow1800Pixel ? 0 : 1, ml: 1 }}>
                  {subHeadingRight}
                </Box>
              )}
            </Box>
          )}
        </Box>

        <Box
          component="section"
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            color: "#4D4E4E",
            // color: (theme) => theme.palette.color38.main,
          }}
        >
          {!isBelow1800Pixel && subHeadingRight && (
            <Box sx={{ mr: 1 }}>{subHeadingRight}</Box>
          )}

          {fullScreenContent && (
            <>
              <Box component="section" sx={{ mr: "4px", cursor: "pointer" }}>
                <Search
                  sx={{ fontSize: "16px" }}
                  onClick={() => setOpenModal(true)}
                />
              </Box>
              <Box component="section" sx={{ mr: "4px", cursor: "pointer" }}>
                <OpenInFull
                  sx={{ fontSize: "16px" }}
                  onClick={() => setOpenModal(true)}
                />
              </Box>
            </>
          )}

          <Box>
            {collapsed ? (
              <>
                <CropFreeOutlined
                  onClick={() => setCollapsed((prev) => !prev)}
                  sx={{ fontSize: "16px", cursor: "pointer" }}
                />
              </>
            ) : (
              <>
                <Remove
                  onClick={() => setCollapsed((prev) => !prev)}
                  sx={{ fontSize: "16px", cursor: "pointer" }}
                />
              </>
            )}
          </Box>
        </Box>
      </Box>
      {!collapsed && (
        <Box
          sx={{ transition: "all 0.3s ease-out", opacity: collapsed ? 0 : 1 }}
        >
          <Divider
            sx={{ mt: 1, mb: 1, height: "0px", border: "1px solid #E8E8ED" }}
          />
          <Box>{content}</Box>
          {footerContent && (
            <Box>
              <Divider
                sx={{
                  mt: 1,
                  mb: 1,
                  height: "0px",
                  border: "1px solid #E8E8ED",
                }}
              />
              <Box>{footerContent}</Box>
            </Box>
          )}
        </Box>
      )}
      {openModal && fullScreenContent && (
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          sx={{ maxWidth: "100%" }}
        >
          <DialogContent sx={{ maxWidth: "100%" }}>
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <Box component="section">
                <Box sx={{ display: "flex" }}>
                  {headerIcon && (
                    <Box
                      sx={{
                        mr: 1,
                        color: "#4d4e4e",
                        height: "20px",
                        width: "18px",
                      }}
                    >
                      {headerIcon}
                    </Box>
                  )}

                  <Typography
                    sx={{
                      fontSize: "20px",
                      color: "#4d4e4e",
                      fontWeight: 600,
                      letterSpacing: "0.08px",
                    }}
                  >
                    {headerLabel}
                  </Typography>
                </Box>
                {isBelow1800Pixel && (
                  <Box>
                    {subHeadingRight && (
                      <Box sx={{ mr: isBelow1800Pixel ? 0 : 1, ml: 1 }}>
                        {subHeadingRight}
                      </Box>
                    )}
                  </Box>
                )}
              </Box>

              <Box
                component="section"
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  color: "#4D4E4E",
                }}
              >
                {!isBelow1800Pixel && subHeadingRight && (
                  <Box sx={{ mr: 1 }}>{subHeadingRight}</Box>
                )}
                <Box>
                  <>
                    <Cancel
                      onClick={() => setOpenModal(false)}
                      sx={{ fontSize: "16px", cursor: "pointer" }}
                    />
                  </>
                </Box>
              </Box>
            </Box>
            <Box>
              <Divider
                sx={{
                  mt: 1,
                  mb: 1,
                  height: "0px",
                  border: "1px solid #E8E8ED",
                }}
              />
              <Box>{fullScreenContent}</Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Paper>
  );
};
export default CardWidget;
