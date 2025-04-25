
import { toast } from "sonner";
import { Post, posts, Comment, findUserById } from "@/data/mockData";

// Mock API responses
export const createPost = async (postData: Omit<Post, "id" | "likes" | "comments" | "createdAt">): Promise<Post> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!postData.userId || !postData.content) {
    throw new Error("Invalid post data");
  }
  
  // Create a new post
  const newPost: Post = {
    id: `post-${Date.now()}`,
    userId: postData.userId,
    courseId: postData.courseId,
    content: postData.content,
    image: postData.image,
    likes: 0,
    createdAt: new Date().toISOString(),
    comments: [],
  };
  
  // Add to beginning of posts array (mock database)
  posts.unshift(newPost);
  
  toast.success("Post created successfully!");
  return newPost;
};

export const deletePost = async (postId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const postIndex = posts.findIndex(post => post.id === postId);
  
  if (postIndex === -1) {
    toast.error("Post not found");
    throw new Error("Post not found");
  }
  
  // Remove post from array (mock database)
  posts.splice(postIndex, 1);
  
  toast.success("Post deleted successfully!");
  return true;
};

export const createComment = async (commentData: Omit<Comment, "id" | "createdAt">): Promise<Comment> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!commentData.userId || !commentData.postId || !commentData.content) {
    throw new Error("Invalid comment data");
  }
  
  const postIndex = posts.findIndex(post => post.id === commentData.postId);
  
  if (postIndex === -1) {
    toast.error("Post not found");
    throw new Error("Post not found");
  }
  
  // Create a new comment
  const newComment: Comment = {
    id: `comment-${Date.now()}`,
    userId: commentData.userId,
    postId: commentData.postId,
    content: commentData.content,
    createdAt: new Date().toISOString(),
  };
  
  // Add comment to post
  posts[postIndex].comments.push(newComment);
  
  toast.success("Comment added!");
  return newComment;
};

export const deleteComment = async (postId: string, commentId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const postIndex = posts.findIndex(post => post.id === postId);
  
  if (postIndex === -1) {
    toast.error("Post not found");
    throw new Error("Post not found");
  }
  
  const commentIndex = posts[postIndex].comments.findIndex(comment => comment.id === commentId);
  
  if (commentIndex === -1) {
    toast.error("Comment not found");
    throw new Error("Comment not found");
  }
  
  // Remove comment from post
  posts[postIndex].comments.splice(commentIndex, 1);
  
  toast.success("Comment deleted!");
  return true;
};
