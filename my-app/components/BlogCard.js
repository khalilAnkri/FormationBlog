import { useState } from "react";
import Link from "next/link";
import {
    Box, Typography, Avatar, IconButton, TextField, Button
} from "@mui/material";
import { FavoriteBorder, Favorite, ChatBubbleOutline, Send } from "@mui/icons-material";
import { useAddComment, useLike, useUnlike, useLikedBlogs } from "../backend/blog";
import { useTheme } from "@mui/material/styles"; // ✅ Import useTheme

const BlogCard = ({ post, userId }) => {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [likeCount, setLikeCount] = useState(post.likeCount || 0);

    const addCommentMutation = useAddComment();
    const likeMutation = useLike();
    const unlikeMutation = useUnlike();

    const { data: likedBlogIds = [], isLoading } = useLikedBlogs();
    const isLiked = likedBlogIds.includes(post.id);
    const theme = useTheme(); // ✅ Get theme

    const isDarkMode = theme.palette.mode === "dark"; // ✅ Check dark mode

    const handleLike = () => {
        if (isLiked) {
            unlikeMutation.mutate(
                { blogId: post.id },
                { onSuccess: () => setLikeCount((prev) => Math.max(0, prev - 1)) }
            );
        } else {
            likeMutation.mutate(
                { blogId: post.id },
                { onSuccess: () => setLikeCount((prev) => prev + 1) }
            );
        }
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        addCommentMutation.mutate(
            { userId, blogId: post.id, comment: newComment },
            { onSuccess: () => setNewComment("") }
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: isDarkMode ? "black" : "white", // ✅ Invert colors in dark mode
                color: isDarkMode ? "white" : "black", // ✅ Adjust text color
                borderRadius: 3,
                padding: 2,
                width: 800,
                boxShadow: 1,
                marginBottom: 2,
            }}
        >
            {/* User Info */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Avatar sx={{ width: 30, height: 30, mr: 1 }} />
                <Typography variant="body2" fontWeight="bold">
                    {post.username || "Unknown User"}
                </Typography>
            </Box>

            {/* Blog Title */}
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {post.title || "Untitled Post"}
            </Typography>

            {/* Blog Content */}
            <Typography variant="body2" sx={{ mb: 2 }}>
                {typeof post.content === "string"
                    ? post.content.length > 100
                        ? post.content.substring(0, 100) + "..."
                        : post.content
                    : "No content available"}
            </Typography>

            {/* Like and Comment Buttons */}
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
                            <Box
                                key={comment.id}
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    border: "1px solid",
                                    borderColor: isDarkMode ? "white" : "#ddd", // ✅ Adjust border color
                                    borderRadius: 2,
                                    backgroundColor: isDarkMode ? "#222" : "white", // ✅ Adjust comment background
                                }}
                            >
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
                        <Typography variant="body2" sx={{ fontStyle: "italic", mt: 2 }}>
                            No comments yet.
                        </Typography>
                    )}

                    {/* Comment Input */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            sx={{
                                backgroundColor: isDarkMode ? "#333" : "white", // ✅ Adjust input background
                                color: isDarkMode ? "white" : "black",
                                input: { color: isDarkMode ? "white" : "black" }, // ✅ Adjust input text color
                            }}
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
