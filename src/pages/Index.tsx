
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import PostForm from "@/components/PostForm";
import ProfileCard from "@/components/ProfileCard";
import { posts as initialPosts, Post as PostType } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const { isAuthenticated } = useAuth();

  const handlePostCreated = (newPost: PostType) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="min-h-screen bg-foodle-background text-foodle-text">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main feed */}
          <div className="md:col-span-2 space-y-6">
            <PostForm onPostCreated={handlePostCreated} />
            
            {posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
            
            {posts.length === 0 && (
              <div className="food-card flex flex-col items-center justify-center p-8">
                <p className="text-lg text-gray-400 mb-4">No posts yet</p>
                {isAuthenticated ? (
                  <p className="text-gray-500">Create the first post!</p>
                ) : (
                  <Button 
                    onClick={() => document.getElementById("auth-trigger")?.click()}
                    className="bg-foodle-accent hover:bg-foodle-accent-hover"
                  >
                    Sign In to Post
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {/* Right sidebar */}
          <div className="space-y-6">
            {isAuthenticated && <ProfileCard />}
            
            <div className="food-card">
              <h3 className="text-lg font-bold mb-4">Welcome to Foodle</h3>
              <p className="text-gray-400 mb-4">
                Share your culinary adventures, discover new recipes, and connect with fellow food enthusiasts.
              </p>
              <div className="bg-gray-800 p-4 rounded-md">
                <h4 className="font-medium mb-2">Today's Tip</h4>
                <p className="text-sm text-gray-400">
                  Add high-quality images to make your food posts stand out in the feed.
                </p>
              </div>
            </div>
            
            <div className="food-card">
              <h3 className="text-lg font-bold mb-4">Trending Topics</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-foodle-accent hover:underline">#HomemadePasta</a>
                  <p className="text-sm text-gray-400">1.2K posts</p>
                </li>
                <li>
                  <a href="#" className="text-foodle-accent hover:underline">#VeganRecipes</a>
                  <p className="text-sm text-gray-400">843 posts</p>
                </li>
                <li>
                  <a href="#" className="text-foodle-accent hover:underline">#BreakfastIdeas</a>
                  <p className="text-sm text-gray-400">625 posts</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
