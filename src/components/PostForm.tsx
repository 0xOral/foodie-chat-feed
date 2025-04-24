
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Send, Image } from "lucide-react";
import { Post } from "@/data/mockData";
import { getUserCourses } from "@/data/coursesData";

interface PostFormProps {
  onPostCreated: (post: Post) => void;
  courseId?: string; // Optional courseId for when on a course page
}

const PostForm = ({ onPostCreated, courseId }: PostFormProps) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Get the user's enrolled courses
  const userCourses = currentUser ? getUserCourses(currentUser.id) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create posts",
        variant: "destructive",
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Empty post",
        description: "Please write something before submitting",
        variant: "destructive",
      });
      return;
    }
    
    // If no course selected and not on a course page, show error
    if (!courseId && userCourses.length > 0) {
      toast({
        title: "Course required",
        description: "Please select a course for your post",
        variant: "destructive",
      });
      return;
    }
    
    // Use the provided courseId or default to the first user course
    const postCourseId = courseId || (userCourses.length > 0 ? userCourses[0].id : "");
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        userId: currentUser.id,
        courseId: postCourseId,
        content: content.trim(),
        image: "/placeholder.svg", // For demo purposes
        likes: 0,
        createdAt: new Date().toISOString(),
        comments: [],
      };
      
      onPostCreated(newPost);
      setContent("");
      setIsSubmitting(false);
      
      toast({
        title: "Post created",
        description: "Your post has been created successfully",
      });
    }, 500); // Simulate network delay
  };

  return (
    <div className="food-card mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <img 
            src={currentUser?.profilePicture || "/placeholder.svg"} 
            alt="Your profile" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <Textarea
              placeholder={isAuthenticated ? "What's on your mind?" : "Sign in to create a post"}
              className="min-h-20 resize-none bg-gray-800 border-gray-700 text-foodle-text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={!isAuthenticated || isSubmitting}
            />
            
            <div className="flex justify-between mt-3">
              <Button
                type="button"
                variant="outline"
                className="bg-transparent border-gray-700 text-gray-400 hover:text-foodle-accent hover:bg-gray-800"
                disabled={!isAuthenticated || isSubmitting}
              >
                <Image className="h-5 w-5 mr-2" />
                <span>Add Image</span>
              </Button>
              
              <Button 
                type="submit" 
                className="bg-foodle-accent hover:bg-foodle-accent-hover"
                disabled={!isAuthenticated || !content.trim() || isSubmitting}
              >
                <Send className="h-5 w-5 mr-2" />
                <span>{isSubmitting ? "Posting..." : "Post"}</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
