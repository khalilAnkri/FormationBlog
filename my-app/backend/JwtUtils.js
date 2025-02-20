export const getAuthToken = () => {
    return localStorage.getItem("token");
  };
  
  export const decodeToken = (token) => {
    if (!token) return null;
  
    try {
      const base64Url = token.split(".")[1]; // Extract payload
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      console.log("decoded token ", jsonPayload)
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  
  export const getUserIdFromToken = () => {
    const token = getAuthToken();
    const decoded = decodeToken(token);
    return decoded ? decoded.userId : null;  
  };
  