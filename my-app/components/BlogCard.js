import { useState } from "react";
import Link from "next/link";
import { Box, Typography, Avatar, IconButton, TextField, Button } from "@mui/material";
import { FavoriteBorder, Favorite, ChatBubbleOutline, Send } from "@mui/icons-material";
import { theme } from "@/config/Theme";
import { useAddComment } from "../backend/blog"; 
import { useLike } from "../backend/blog"; 
import { useUnlike } from "../backend/blog"; 
import { useLikedBlogs } from "../backend/blog";

const BlogCard = ({ post, userId }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);

  const addCommentMutation = useAddComment();
  const likeMutation = useLike();
  const unlikeMutation = useUnlike();

  const { data: likedBlogIds = [], isLoading } = useLikedBlogs();
  const isLiked = likedBlogIds.includes(post.id);
  

  const handleLike = () => {
    if (isLiked) {
    
      unlikeMutation.mutate(
        { blogId: post.id },
        {
          onSuccess: () => {
            setLikeCount((prev) => Math.max(0, prev - 1));
          },
        }
      );
    } else {
 
      likeMutation.mutate(
        { blogId: post.id },
        {
          onSuccess: () => {
            setLikeCount((prev) => prev + 1);
          },
        }
      );
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    addCommentMutation.mutate(
      { userId, blogId: post.id, comment: newComment },
      {
        onSuccess: () => {
          setNewComment("");  
        },
      }
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "white", borderRadius: 3, padding: 2, width: 800, boxShadow: 1, marginBottom: 2 }}>
      
     
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Avatar sx={{ width: 30, height: 30, mr: 1 }} />
        <Typography variant="body2" fontWeight="bold">
          {post.username || "Unknown User"}
        </Typography>
      </Box>

      
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        {post.title || "Untitled Post"}
      </Typography>

     
      <Typography variant="body2" sx={{ mb: 2 }}>
        {typeof post.content === "string"
          ? post.content.length > 100
            ? post.content.substring(0, 100) + "..."
            : post.content
          : "No content available"}
      </Typography>

     
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          
          <IconButton size="small" onClick={handleLike} disabled={isLoading}>
            {isLiked ? (
              <Favorite sx={{ color: theme.palette.secondary.main }} />  
            ) : (
              <FavoriteBorder sx={{ color: theme.palette.primary.main }} />  
            )}
          </IconButton>
          <Typography variant="body2">{likeCount}</Typography>

          <IconButton size="small" onClick={() => setShowComments(!showComments)}>
            <ChatBubbleOutline sx={{ color: theme.palette.primary.main }} />
          </IconButton>
          <Typography variant="body2">{post.comments?.length || 0}</Typography>
        </Box>

        <Link href={`/acceuil/${post.id}`} passHref>
          <Button variant="contained" color="primary" size="small">
            <Typography variant="body2" sx={{ color: "white" }}>Read More</Typography>
          </Button>
        </Link>
      </Box>

     
      {/* Comments Section */}
{showComments && (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h5" fontWeight="bold">Comments</Typography>
    {post.comments?.length > 0 ? (
      post.comments.map((comment) => (
        <Box key={comment.id} sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
          <Typography variant="body2" fontWeight="bold">
            {comment.username || "Anonymous"} 
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

    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <IconButton color="primary" onClick={handleAddComment}>
        <Send />
      </IconButton>
    </Box>
  </Box>
)}

    </Box>
  );
};

export default BlogCard;