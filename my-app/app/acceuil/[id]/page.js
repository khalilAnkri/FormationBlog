"use client";  

import { useSelector } from "react-redux";
import { useParams } from 'next/navigation';
import { Avatar, Typography, Paper, Box, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import MyMiniDrawer from "../../../components/MyMiniDrawer";
import { useTheme } from '@mui/material/styles';
import { useBlogById } from "../../../backend/blog"; 
import AuthRequired from "../../../components/AuthRequired";

export default function BlogPost() {
  const { id } = useParams();  
  const theme = useTheme();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  if (!isLoggedIn) {
    return <AuthRequired message="You need to log in to view your this blog ." redirectPath="/connexion" />;
  }


  const { data: post, isLoading, error } = useBlogById(id);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !post) {
    return <Typography variant="h6" textAlign="center">Blog post not found.</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        marginTop: 3,
        p: 3,
      }}
    >
      <MyMiniDrawer />
      <Paper 
        elevation={3} 
        sx={{ 
          maxWidth: 900, 
          width: "100%", 
          mx: "auto", 
          p: 4, 
          borderRadius: 3, 
          mt: 5,
        }}
      >
        {/* Back Button */}
        <Link href="/acceuil" passHref style={{ textDecoration: "none", color: "inherit" }}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>

        {/* Blog Title */}
        <Typography variant="h3" fontWeight="bold" gutterBottom>{post.title}</Typography>

        {/* Author Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar 
            src={post.authorProfilePicture || "/default-avatar.png"} // ✅ Uses default if missing
            sx={{ width: 50, height: 50 }}
          />
          <Typography variant="h6" fontWeight="bold">{post.authorUsername || "Unknown Author"}</Typography>
        </Box>

        {/* Blog Content */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
            {post.content}
          </Typography>
        </Box>

        {/* Comments Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" fontWeight="bold">Comments</Typography>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <Box key={comment.id} sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  {comment.username || "Anonymous"} {/* ✅ If username is null, show "Anonymous" */}
                </Typography>
                <Typography variant="body1">{comment.content}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(comment.createdAt).toLocaleString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ fontStyle: "italic", mt: 2 }}>No comments yet.</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
