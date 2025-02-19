// const blogs = [];  

 
// export async function GET() {
//   try {
//     console.log("📌 Fetching local blogs...");
//     return Response.json(blogs, { status: 200 });
//   } catch (error) {
//     console.error("❌ GET Error:", error);
//     return Response.json({ error: "Failed to fetch blogs" }, { status: 500 });
//   }
// }

 
// export async function POST(req) {
//   try {
//     const { title, body } = await req.json();
//     if (!title || !body) {
//       return Response.json({ error: "Title and body are required" }, { status: 400 });
//     }

//     const newBlog = { id: Date.now().toString(), title, body };
//     blogs.push(newBlog);  
//     console.log("✅ Blog added:", newBlog);

//     return Response.json(newBlog, { status: 201 });
//   } catch (error) {
//     console.error("❌ POST Error:", error);
//     return Response.json({ error: "Failed to add blog" }, { status: 500 });
//   }
// }
