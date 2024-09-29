
import Loader from '@/components/shared/Loader';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import PostCard from '@/components/shared/PostCard';
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const {user} = useUserContext();
  console.log(user);
  
  useEffect(()=>{
   if(user.name===""){
    navigate("/sign-in");
  console.log("user not available ");
  
   } 
  });
  

  const {data:posts,isPending : isPostLoading,}= useGetRecentPosts();

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
            <h2 className='h3-bold md:h2-bold text-left w-full'>
                Home Feed
            </h2>
            {
              isPostLoading?(
                <Loader/>
              ):(
                <ul className='flex flex-col flex-1 gap-9 w-full'>
                  {posts?.documents.map((post:Models.Document)=>(
                    
                    <PostCard post={post}/>
                  ))}
                </ul>
              )
            }
        </div>
      </div>
    </div>
  )
}

export default Home