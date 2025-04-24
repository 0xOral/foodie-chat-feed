
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { getPostsByUserId, Post as PostType } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Image } from "lucide-react";

const Profile = () => {
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const [activeTab, setActiveTab] = useState("posts");
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    
    // Load user posts
    if (currentUser) {
      const posts = getPostsByUserId(currentUser.id);
      setUserPosts(posts);
    }
  }, [currentUser, isAuthenticated, navigate]);

  if (!isAuthenticated || !currentUser) {
    return null; // Handled by the useEffect redirect
  }

  return (
    <div className="min-h-screen bg-foodle-background text-foodle-text">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        {/* Profile header */}
        <div className="food-card mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img 
              src={currentUser.profilePicture || "/placeholder.svg"} 
              alt={currentUser.username} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-foodle-text">{currentUser.username}</h1>
                  <p className="text-gray-500">@{currentUser.username.toLowerCase()}</p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="mt-4 md:mt-0 bg-transparent border-gray-700 text-gray-400 hover:text-foodle-accent hover:bg-gray-800"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  <span>Edit Profile</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 max-w-xs">
                <div className="text-center">
                  <p className="text-xl font-bold text-foodle-text">{userPosts.length}</p>
                  <p className="text-sm text-gray-500">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foodle-text">148</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foodle-text">104</p>
                  <p className="text-sm text-gray-500">Following</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium">Bio</h3>
            <p className="mt-2 text-gray-400">
              Food enthusiast and home chef. I love experimenting with new recipes and sharing my culinary adventures.
            </p>
          </div>
        </div>
        
        {/* Profile content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-gray-800 w-full">
            <TabsTrigger value="posts" className="flex-1 data-[state=active]:bg-foodle-accent data-[state=active]:text-white">
              Posts
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex-1 data-[state=active]:bg-foodle-accent data-[state=active]:text-white">
              Saved
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex-1 data-[state=active]:bg-foodle-accent data-[state=active]:text-white">
              Liked
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            {userPosts.length > 0 ? (
              <div className="space-y-6">
                {userPosts.map(post => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="food-card flex flex-col items-center justify-center p-8">
                <Image className="w-16 h-16 text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-foodle-text mb-2">No Posts Yet</h3>
                <p className="text-gray-500 mb-4 text-center">
                  You haven't created any posts yet. Share your food journey with the community!
                </p>
                <Button 
                  onClick={() => navigate("/")}
                  className="bg-foodle-accent hover:bg-foodle-accent-hover"
                >
                  Create Your First Post
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="food-card flex flex-col items-center justify-center p-8">
              <Image className="w-16 h-16 text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-foodle-text mb-2">No Saved Posts</h3>
              <p className="text-gray-500 text-center">
                You haven't saved any posts yet. Browse the feed and save posts you like!
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="liked">
            <div className="food-card flex flex-col items-center justify-center p-8">
              <Image className="w-16 h-16 text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-foodle-text mb-2">No Liked Posts</h3>
              <p className="text-gray-500 text-center">
                You haven't liked any posts yet. Show some appreciation to other foodies!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
