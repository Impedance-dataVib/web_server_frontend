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
  DialogTitle,
  Divider,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";

export interface CardWidgetProps {
  headerLabel: string;
  showDate?: string;
  headerIcon?: React.ReactElement;
  content: React.ReactNode;
  subHeadingRight?: React.ReactNode;
  footerContent?: React.ReactNode;
  initiallyCollapsed?: boolean;
  setIsLatestReportOpen?: Function;
  setIsLiveStatusOpen?: Function;
  fullScreenContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  section?: "top" | "middle" | "bottom";
}

const CardWidget = ({
  headerLabel,
  showDate,
  headerContent,
  headerIcon,
  content,
  subHeadingRight,
  footerContent,
  setIsLatestReportOpen,
  setIsLiveStatusOpen,
  initiallyCollapsed,
  fullScreenContent,
  section,
}: CardWidgetProps) => {
  const [collapsed, setCollapsed] = useState(initiallyCollapsed || false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const isBelow1800Pixel = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(1800)
  );

  useEffect(() => {
    if (setIsLatestReportOpen) {
      setIsLatestReportOpen(!collapsed);
    }
    if (setIsLiveStatusOpen) {
      setIsLiveStatusOpen(!collapsed);
    }
  }, [collapsed]);

  const getSectionSx = useMemo(() => {
    const topSection =
      section === "top"
        ? {
            p: 2,
            pt: headerContent ? 0 : 2,
            borderRadius: 3,
            boxShadow: "2px 4px 8px #00000029",
            transition: "all .2s linear",
            minHeight: "25vh",
          }
        : {
            p: 2,
            pt: headerContent ? 0 : 2,
            borderRadius: 3,
            boxShadow: "2px 4px 8px #00000029",
            transition: "all .2s linear",
          };
    return section === "middle"
      ? {
          p: 2,
          pt: headerContent ? 0 : 2,
          borderRadius: 3,
          boxShadow: "2px 4px 8px #00000029",
          transition: "all .2s linear",
          minHeight: "30vh",
        }
      : topSection;
  }, [section]);
  return (
    <Paper sx={getSectionSx}>
      <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
        {!headerContent && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
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
                variant="body1"
                component={"span"}
                noWrap
                title={headerLabel}
                sx={{
                  fontSize: "12px",
                  color: "#4d4e4e",
                  fontWeight: 600,
                  letterSpacing: "0.08px",
                  maxWidth: "350px",
                  cursor: "pointer",
                  // "&:hover": { overflow: 'visible',
                  // whiteSpace: 'normal' }
                }}
              >
                {headerLabel}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "9px",
                  mr: "20px",
                }}
              >
                {showDate ? ` Updated on ${showDate} (UTC)` : ""}
              </Typography>

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
          </Box>
        )}
        {headerContent && headerContent}
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
                  sx={{ fontSize: "14px" }}
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
                  sx={{ fontSize: "14px", cursor: "pointer" }}
                />
              </>
            ) : (
              <>
                <Remove
                  onClick={() => setCollapsed((prev) => !prev)}
                  sx={{ fontSize: "14px", cursor: "pointer" }}
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
            sx={{
              mt: headerContent ? 0 : 1,
              mb: 1,
              height: "0px",
              border: "1px solid #E8E8ED",
            }}
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
          maxWidth={"xl"}
        >
          <DialogContent sx={{ minWidth: "80vw" }}>
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
                    variant="body1"
                    component={"span"}
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
