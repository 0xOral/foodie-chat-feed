
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Post as PostType, findUserById } from "@/data/mockData";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Heart } from "lucide-react";

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  const [currentPost, setCurrentPost] = useState<PostType>(post);
  const [showComments, setShowComments] = useState(false);
  const user = findUserById(post.userId);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const handleLike = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentPost(prev => ({
      ...prev,
      likes: prev.likes + 1
    }));
  };
  
  const handleAddComment = (newComment: any) => {
    setCurrentPost(prev => ({
      ...prev,
      comments: [...prev.comments, newComment]
    }));
    
    // Show comments when a new comment is added
    setShowComments(true);
  };

  return (
    <div className="food-card mb-6 animate-enter">
      <div className="flex items-start gap-3">
        <img 
          src={user?.profilePicture || "/placeholder.svg"} 
          alt={user?.username || "User"} 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-foodle-text">{user?.username || "Unknown User"}</h3>
              <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
            </div>
          </div>
          <p className="mt-2 text-foodle-text">{currentPost.content}</p>
          
          {currentPost.image && (
            <div className="mt-3 rounded-md overflow-hidden">
              <img 
                src={currentPost.image} 
                alt="Post content" 
                className="w-full h-auto object-cover max-h-96"
              />
            </div>
          )}
          
          <div className="flex items-center gap-6 mt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className="flex items-center gap-2 text-gray-400 hover:text-foodle-accent hover:bg-transparent"
            >
              <Heart className="h-5 w-5" />
              <span>{currentPost.likes}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-gray-400 hover:text-foodle-accent hover:bg-transparent"
            >
              <MessageSquare className="h-5 w-5" />
              <span>{currentPost.comments.length}</span>
            </Button>
          </div>
          
          {showComments && (
            <div className="mt-4">
              <Separator className="bg-gray-800" />
              <div className="mt-3">
                {currentPost.comments.length > 0 ? (
                  currentPost.comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                  ))
                ) : (
                  <p className="text-sm text-gray-500 py-2">No comments yet. Be the first to comment!</p>
                )}
              </div>
              <CommentForm postId={currentPost.id} onCommentAdded={handleAddComment} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
