
import { toast } from "sonner";
import { Post, Comment } from "@/data/mockData";

export const createPost = async (postData: Omit<Post, "id" | "likes" | "comments" | "createdAt">): Promise<Post> => {
  try {
    const response = await fetch('http://localhost/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    
    const newPost = await response.json();
    toast.success("Post created successfully!");
    return newPost;
  } catch (error) {
    toast.error("Failed to create post");
    throw error;
  }
};

export const deletePost = async (postId: string): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost/api/post/${postId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    
    toast.success("Post deleted successfully!");
    return true;
  } catch (error) {
    toast.error("Failed to delete post");
    throw error;
  }
};

export const createComment = async (commentData: Omit<Comment, "id" | "createdAt">): Promise<Comment> => {
  try {
    const response = await fetch('http://localhost/api/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create comment');
    }
    
    const newComment = await response.json();
    toast.success("Comment added!");
    return newComment;
  } catch (error) {
    toast.error("Failed to add comment");
    throw error;
  }
};

export const deleteComment = async (postId: string, commentId: string): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost/api/comment/${commentId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }
    
    toast.success("Comment deleted!");
    return true;
  } catch (error) {
    toast.error("Failed to delete comment");
    throw error;
  }
};
