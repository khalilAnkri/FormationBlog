"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useBlogs, useAddBlog } from "../../backend/blog";
import BlogCard from "../../components/BlogCard";
import MyMiniDrawer from "../../components/MyMiniDrawer";
import AuthRequired from "../../components/AuthRequired";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  TextField,
  Container
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { theme } from "@/config/Theme";

export default function BlogPage() {
 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);  
  const { data: blogs = [], isLoading } = useBlogs();
  const { mutate: addBlog } = useAddBlog();

  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewTitle("");
    setNewDescription("");
  };

  const handleAddBlog = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Title and description cannot be empty!");
      return;
    }

    addBlog(
      { title: newTitle, content: newDescription },
      {
        onSuccess: () => {
          setOpenSnackbar(true);
          handleCloseModal();
        },
        onError: (error) => {
          console.error("Error adding blog:", error);
        },
      }
    );
  };

   if (!isLoggedIn) {
    return <AuthRequired message="You need to log in to view blogs." redirectPath="/connexion" />;
  }

 
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", p: 3 }}>
      <MyMiniDrawer />
      <Paper elevation={3} sx={{ maxWidth: 1100, width: "100%", p: 3, borderRadius: 3, mt: 7 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
            Latest Blog Posts
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ color: "white" }} />}
            onClick={handleOpenModal}
            sx={{ mt: 2, backgroundColor: theme.palette.secondary.main }}
          >
            <Typography sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}> Add Blog </Typography>
          </Button>
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            {blogs.map((post) => (
              <Box
                key={post.id}
                component="a"
                sx={{
                  width: "100%",
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "black"
                }}
              >
                <BlogCard post={post} />
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New Blog</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
          <Button onClick={handleAddBlog} color="primary" variant="contained" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Blog"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={(event, reason) => {
          if (reason === "clickaway") return;
          setOpenSnackbar(false);
        }}
      >
        <Alert severity="success">Blog added successfully!</Alert>
      </Snackbar>
    </Box>
  );
}
