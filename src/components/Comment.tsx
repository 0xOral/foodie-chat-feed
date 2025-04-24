
import { findUserById } from "@/data/mockData";
import type { Comment as CommentType } from "@/data/mockData";

interface CommentProps {
  comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => {
  const user = findUserById(comment.userId);
  
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

  return (
    <div className="flex gap-3 py-3 animate-fade-in">
      <img 
        src={user?.profilePicture || "/placeholder.svg"} 
        alt={user?.username || "User"} 
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foodle-text">{user?.username || "Unknown User"}</span>
          <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="mt-1 text-sm text-gray-300">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
