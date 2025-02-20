"use client";

import { Box, CssBaseline, Toolbar, Typography, Grid, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MyMiniDrawer from "../../components/MyMiniDrawer";
import { usePendingUsers, useApproveUser, useRejectUser, usePendingBlogs, useApproveBlog, useRejectBlog , fetchDashboardStats} from "../../backend/admin";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@emotion/react";


export default function AdminDashboard() {
  const { data: users = [], isLoading: isLoadingUsers } = usePendingUsers();
  const approveUser = useApproveUser();
  const rejectUser = useRejectUser();

  const { data: blogs = [], isLoading: isLoadingBlogs } = usePendingBlogs();
  const approveBlog = useApproveBlog();
  const rejectBlog = useRejectBlog();

  const { data: stats = {}, isLoading: isLoadingStats } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });

  const theme = useTheme();

  const statCards = [
    { title: "Active Users", value: stats.activeUsers || 0, icon: <HowToRegIcon fontSize="large" />, color: "#F875AA" },
    { title: "Pending Users", value: stats.pendingUsers || 0, icon: <RecordVoiceOverIcon fontSize="large" />, color: "#FFDFDF" },
    { title: "Pending Blogs", value: stats.pendingBlogs || 0, icon: <PendingActionsIcon fontSize="large" />, color: "#FFF6F6" },
    { title: "Approved Blogs", value: stats.approvedBlogs || 0, icon: <CreditScoreIcon fontSize="large" />, color: "#AEDEFC" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" , mt : 5 }}>
      <CssBaseline />
      <MyMiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: "90%", width: "100%" }}>
        <Toolbar />

        {/* Stat Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {isLoadingStats ? (
            <Typography>Loading Stats...</Typography>
          ) : (
            statCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ bgcolor: theme.palette.paper, textAlign: "center", p: 3 }}>
                  <CardContent>
                    {card.icon}
                    <Typography variant="h6">{card.value}</Typography>
                    <Typography sx={{ color: theme.palette.primary.main, fontWeight: 700, fontFamily: "monospace", fontSize: "1.2rem" }}>{card.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        <Grid container spacing={5} sx={{alignContent : "center" , justifyContent: "center" , mt : 3}}>
          {/* Users Table */}
          <Grid item xs={12} md={10}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom textAlign="center">Pending Users</Typography>
              {isLoadingUsers ? <Typography>Loading Users...</Typography> : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.accountStatus}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => approveUser.mutate(user.id)} color="success">
                              <CheckCircleIcon />
                            </IconButton>
                            <IconButton onClick={() => rejectUser.mutate(user.id)} color="error">
                              <CancelIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>

          {/* Blogs Table */}
          <Grid item xs={12} md={10}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom textAlign="center">Pending Blogs</Typography>
              {isLoadingBlogs ? <Typography>Loading Blogs...</Typography> : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {blogs.map((blog) => (
                        <TableRow key={blog.id}>
                          <TableCell>{blog.title}</TableCell>
                          <TableCell>{blog.content}</TableCell>
                          <TableCell>{blog.blogStatus}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => approveBlog.mutate(blog.id)} color="success">
                              <CheckCircleIcon />
                            </IconButton>
                            <IconButton onClick={() => rejectBlog.mutate(blog.id)} color="error">
                              <CancelIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
