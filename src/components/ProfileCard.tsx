
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const ProfileCard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="food-card">
      <div className="flex flex-col items-center">
        <img 
          src={currentUser?.profilePicture || "/placeholder.svg"} 
          alt="Profile" 
          className="w-20 h-20 rounded-full object-cover mb-4"
        />
        <h2 className="text-xl font-bold text-foodle-text">{currentUser?.username || "User"}</h2>
        <p className="text-gray-500 mt-1">Foodie Enthusiast</p>
        
        <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
          <div>
            <p className="text-xl font-bold text-foodle-text">12</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div>
            <p className="text-xl font-bold text-foodle-text">148</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div>
            <p className="text-xl font-bold text-foodle-text">104</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-6 bg-transparent border-gray-700 text-gray-400 hover:text-foodle-accent hover:bg-gray-800"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
