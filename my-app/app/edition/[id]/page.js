"use client";  

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TextField, Button, Paper, Typography, Box, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const blogPosts = [
  {
    "id": 1,
    "title": "Understanding Asynchronous JavaScript: Callbacks, Promises, and Async/Await",
    "body": "Asynchronous JavaScript is crucial for handling operations such as API requests, file reading, and database queries efficiently. The traditional callback method often leads to callback hell, making code harder to maintain. Promises solve this issue by providing `.then()` and `.catch()` methods, but chaining can still become complex. The introduction of `async/await` simplifies asynchronous code, making it more readable and easier to debug. Proper error handling with `try...catch` is essential when using `async/await`, ensuring smooth execution and better debugging capabilities."
  },
  {
    "id": 2,
    "title": "Microservices Architecture: Benefits, Challenges, and Best Practices",
    "body": "Microservices architecture enables the development of scalable, maintainable, and loosely coupled services that can be deployed independently. Unlike monolithic architectures, microservices offer enhanced fault isolation and better scalability. However, they come with challenges such as increased complexity, inter-service communication overhead, and the need for proper API gateway management. Best practices include using containerization (Docker, Kubernetes), implementing robust monitoring and logging, and adopting event-driven communication patterns to minimize service dependencies."
  },
  {
    "id": 3,
    "title": "Deep Dive into RESTful API Design: Principles and Implementation",
    "body": "RESTful APIs follow the principles of Representational State Transfer (REST), ensuring stateless communication between clients and servers. A well-designed API should have clear resource naming conventions using nouns, support HTTP methods (`GET`, `POST`, `PUT`, `DELETE`), and implement proper status codes for response handling. Versioning strategies, such as URI versioning or header-based versioning, ensure backward compatibility. Security best practices include using OAuth2 for authentication, enforcing HTTPS, and rate limiting API requests to prevent abuse."
  },
  {
    "id": 4,
    "title": "Containerization with Docker: Building, Deploying, and Managing Applications",
    "body": "Docker revolutionized software deployment by allowing applications to be packaged with their dependencies in isolated containers. Using a `Dockerfile`, developers can define build instructions and create lightweight, portable images. Running containers with `docker-compose` simplifies multi-container applications, ensuring seamless service orchestration. Kubernetes extends container management by providing automatic scaling, self-healing, and load balancing. Key security practices include using minimal base images, avoiding root users, and regularly scanning images for vulnerabilities."
  },
  {
    "id": 5,
    "title": "Serverless Computing: Advantages, Use Cases, and Limitations",
    "body": "Serverless computing enables developers to deploy applications without managing infrastructure, leveraging cloud providers like AWS Lambda, Azure Functions, and Google Cloud Functions. It reduces operational costs by charging only for execution time, enhancing scalability. Use cases include event-driven processing, real-time data analytics, and API backends. However, challenges such as cold start latency, vendor lock-in, and execution time limitations must be considered when designing serverless architectures."
  },
  {
    "id": 6,
    "title": "GraphQL vs REST: Key Differences and When to Use Each",
    "body": "GraphQL provides a flexible alternative to REST by allowing clients to request only the required data, reducing over-fetching and under-fetching issues. Unlike REST, which relies on multiple endpoints, GraphQL exposes a single endpoint, enabling efficient data retrieval. Its schema-based approach facilitates type validation and introspection. However, GraphQL introduces complexity in caching and performance optimization. REST remains a better choice for simpler applications, whereas GraphQL excels in scenarios with complex data relationships and dynamic frontend requirements."
  }
];

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();
  const postId = parseInt(id, 10);

  const existingPost = blogPosts.find(blog => blog.id === postId);
  const [title, setTitle] = useState(existingPost?.title || "");
  const [description, setDescription] = useState(existingPost?.body || "");
  const [openDialog, setOpenDialog] = useState(false);  
  const [openSnackbar, setOpenSnackbar] = useState(false);  
 
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmSave = () => {
    setOpenDialog(false);  
    setOpenSnackbar(true);  
    console.log("Updated Blog Post:", { id, title, description });
    setTimeout(() => router.push(`/acceuil/${id}`), 2000);  
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 500, mx: "auto", p: 3, borderRadius: 3, mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Edit Blog Post
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField 
          label="Title" 
          variant="outlined" 
          fullWidth 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <TextField 
          label="Description" 
          variant="outlined" 
          fullWidth 
          multiline 
          rows={3} 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Save Changes
        </Button>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to save these changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleConfirmSave} color="primary" variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity="success" sx={{ width: '100%' }}>Changes saved successfully!</Alert>
      </Snackbar>
    </Paper>
  );
}
