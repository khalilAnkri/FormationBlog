import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthToken, getUserIdFromToken } from "./JwtUtils";
import { useRouter } from "next/router";
 
 

const registerUser = async (userData) => {
  const response = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Registration failed");
  }

  return response.json();
};

export const useRegister = () => {
  return useMutation({ mutationFn: registerUser });  
};



const loginUser = async (credentials) => {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Login failed");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);  
  console.log("token : ", data.token)
  return data;
};

export const useLogin = () => {
  return useMutation({ mutationFn: loginUser });
};




 



 

export const useBlogs = () => {
  const token = getAuthToken();  
  console.log("token : ", token);

  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      if (!token) {
        throw new Error("Unauthorized");
      }

      const res = await fetch("http://localhost:8080/api/blogs", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized");
        }
        throw new Error("Failed to fetch blogs");
      }

      const data = await res.json();
      return data.map((blog) => ({
        id: blog.id,
        title: blog.title || "Untitled Post",
        content: typeof blog.content === "string" ? blog.content : "No content available",
        username: blog.authorUsername || "Unknown User",
        createdAt: blog.createdAt || new Date().toISOString(),
        likeCount: blog.likeCount || 0,
        comments: blog.comments.map((comment) => ({
          id: comment.id,
          content: comment.content || "No comment content",
          username: comment.username || "Anonymous",
          createdAt: comment.createdAt,
        })),
      }));
    },
    staleTime: 1000 * 60,
    suspense: false,
  });
};

 
const tryParseContent = (content) => {
  try {
    const parsed = JSON.parse(content);
    return typeof parsed === "object" && parsed.content ? parsed.content : content;
  } catch (error) {
    return content;
  }
};





 


 

export const useAddBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBlog) => {
      const token = getAuthToken();
      const userId = getUserIdFromToken();  
      if (!userId) throw new Error("User not authenticated");

      try {
        const res = await fetch(`http://localhost:8080/api/blogs/create?userId=${userId}`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBlog),
        });

        if (!res.ok) {
          console.error(`Error status: ${res.status}`);
          throw new Error("Failed to add blog");
        }

        const data = await res.json();
        console.log("Blog Added Successfully:", data);
        return data;
      } catch (error) {
        console.error("Error adding blog:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) => [...(oldBlogs || []), data]);
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
  });
};






export const useLikedBlogs = () => {
  return useQuery({
    queryKey: ["likedBlogs"],  
    queryFn: async () => {
      const token = getAuthToken();
      const userId = getUserIdFromToken();  
      if (!userId) throw new Error("User not authenticated");  

      const res = await fetch(`http://localhost:8080/api/likes?userId=${userId}`, {  
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,  
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch liked blogs");
      }

      const data = await res.json();
      console.log("Raw Liked Blogs Data:", data);

 
      return Array.isArray(data) ? data.map((blog) => blog.blogId) : [];
    },
    staleTime: 1000 * 60,  
    suspense: false,
  });
};




export const useMyBlogDetails = () => {
  return useQuery({
    queryKey: ["myBlogs"],  
    queryFn: async () => {
      const token = getAuthToken();
      const userId = getUserIdFromToken();  
      if (!userId) throw new Error("User not authenticated");

      const res = await fetch(`http://localhost:8080/api/blogs/my-blogs?userId=${userId}`, {  
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch your blogs");

      const data = await res.json();
      console.log("Fetched My Blogs:", data);

      return Array.isArray(data) ? data : [];  
    },
    staleTime: 1000 * 60,  
    suspense: false,
  });
};



export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blogId, comment }) => {
      const token = getAuthToken();
      const userId = getUserIdFromToken();  
      if (!userId) throw new Error("User not authenticated");

      try {
        const res = await fetch(`http://localhost:8080/api/comments?userId=${userId}&blogId=${blogId}`, {  
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({ content: comment }),
          mode: "cors",
        });

        if (!res.ok) {
          console.error(`Error status: ${res.status}`);
          throw new Error("Failed to add comment");
        }

        const data = await res.json();
        console.log("Comment Added Successfully:", data);
        return data;
      } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
      }
    },
    onSuccess: (data, { blogId }) => {
      
      queryClient.setQueryData(["blog", blogId], (oldBlog) => {
        if (!oldBlog) return oldBlog;
        return {
          ...oldBlog,
          comments: [...(oldBlog.comments || []), data],
        };
      });

      queryClient.invalidateQueries(["blog", blogId]);  
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
  });
};




export const useLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blogId }) => {
      const token = getAuthToken();
      const userId = getUserIdFromToken();  
      if (!userId) throw new Error("User not authenticated");  

      try {
        const res = await fetch(`http://localhost:8080/api/likes?userId=${userId}&blogId=${blogId}`, {  
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,  
            "Content-Type": "application/json",
            "Accept": "application/json, plain/text",
          },
          mode: "cors",
        });

        if (!res.ok) {
          console.error(`Error status: ${res.status}`);
          throw new Error("Failed to like blog");
        }

        return await res.json();
      } catch (error) {
        console.error("Error liking blog:", error);
        throw error;
      }
    },
    onSuccess: (data, { blogId }) => {
      queryClient.setQueryData(["blog", blogId], (oldBlog) => {
        if (!oldBlog) return oldBlog;
        return {
          ...oldBlog,
          likeCount: oldBlog.likeCount + 1,  
          likedByUser: true, 
        };
      });

      queryClient.invalidateQueries(["blog", blogId]);  
    },
    onError: (error) => {
      console.error("Like Mutation Error:", error);
    },
  });
};

 

 

export const useUnlike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blogId }) => {
      const token = getAuthToken();
      const userId = getUserIdFromToken();  
      if (!userId) throw new Error("User not authenticated");

      try {
        const res = await fetch(`http://localhost:8080/api/likes?userId=${userId}&blogId=${blogId}`, {  
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,  
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          mode: "cors",
        });

        if (!res.ok) {
          console.error(`Error status: ${res.status}`);
          throw new Error("Failed to unlike blog");
        }

        return await res.json();
      } catch (error) {
        console.error("Error unliking blog:", error);
        throw error;
      }
    },
    onSuccess: (data, { blogId }) => {
      queryClient.setQueryData(["blog", blogId], (oldBlog) => {
        if (!oldBlog) return oldBlog;
        return {
          ...oldBlog,
          likeCount: Math.max(0, oldBlog.likeCount - 1), 
          likedByUser: false,  
        };
      });

      queryClient.invalidateQueries(["blog", blogId]);  
    },
    onError: (error) => {
      console.error("Unlike Mutation Error:", error);
    },
  });
};

 

export const useLikedBlogDetails = () => {
  return useQuery({
    queryKey: ["likedBlogDetails"],
    queryFn: async () => {
      const token = getAuthToken();
      const userId = getUserIdFromToken();  
      if (!userId) throw new Error("User not authenticated");

    
      const res = await fetch(`http://localhost:8080/api/likes?userId=${userId}`, { 
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,  
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch liked blogs");
      const likedData = await res.json();

     
      const likedBlogIds = Array.isArray(likedData) ? likedData.map((blog) => blog.blogId) : [];

       
      const blogRequests = likedBlogIds.map(async (blogId) => {
        const blogRes = await fetch(`http://localhost:8080/api/blogs/${blogId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,  
            "Content-Type": "application/json",
          },
        });

        if (!blogRes.ok) return null;
        return blogRes.json();
      });

       
      const fullBlogData = await Promise.all(blogRequests);
      return fullBlogData.filter((blog) => blog !== null);  
    },
    staleTime: 1000 * 60,  
    suspense: false,
  });
};


 

 

export const useBlogById = (blogId) => {
  return useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      if (!blogId) return null;

      const token = localStorage.getItem("token");  

      const res = await fetch(`http://localhost:8080/api/blogs/${blogId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,  
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch blog post");

      return res.json();
    },
    enabled: !!blogId,  
    staleTime: 1000 * 60 * 5,  
    suspense: false,
  });
};





  

