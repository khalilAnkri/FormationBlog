"use client";  

import { useSelector } from "react-redux";
import { useLikedBlogDetails } from "../../backend/blog"; 
import BlogCard from "../../components/BlogCard";
import MyMiniDrawer from "../../components/MyMiniDrawer";
import AuthRequired from "../../components/AuthRequired";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";








export default function LikedBlogsPage() {
  const { data: likedBlogs = [], isLoading, error } = useLikedBlogDetails(); 
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  if (!isLoggedIn) {
    return <AuthRequired message="You need to log in to view your liked blogs." redirectPath="/connexion" />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", p: 3 }}>
      <MyMiniDrawer />
      <Paper elevation={3} sx={{ maxWidth: 1100, width: "100%", p: 3, borderRadius: 3, mt: 7 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
            Your Liked Blogs ❤️
          </Typography>
        </Box>

        {/* Loading state */}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error state */}
        {error && (
          <Typography align="center" color="error">
            Error fetching liked blogs
          </Typography>
        )}

        {/* Display liked blogs instantly */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          {likedBlogs.length > 0 ? (
            likedBlogs.map((post) => (
              <Box
                key={post.id} // ✅ Using `post.id` because full blog details are fetched
                component="a"
                sx={{
                  width: "100%",
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <BlogCard post={post} />
              </Box>
            ))
          ) : (
            !isLoading && (
              <Typography variant="body1" sx={{ textAlign: "center", mt: 2, color: "gray" }}>
                No liked blogs found.
              </Typography>
            )
          )}
        </Box>
      </Paper>
    </Box>
  );
}
