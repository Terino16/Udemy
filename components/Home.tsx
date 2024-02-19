"use client"
import { TCourse } from '@/app/types';
import CourseCard from './CourseCard';

const getPosts = async (): Promise<TCourse[] | null> => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post`, {
      });
      if (res.ok) {
        const posts = await res.json();
        return posts;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };


  import React from 'react'
  
  const Home = async () => {
    // const posts = await getPosts();
    return (
        <>
        {/* {posts && posts.length > 0 ? (
          posts.map((post: TCourse) => (
     
            <CourseCard
            key={post.id}
                id={post.id}
                author={post.author}
                authorEmail={post.authorEmail}
                date={post.createdAt}
                imageUrl={post.imageUrl}
                catName={post.catName}
                name={post.name}
                content={post.content} createdAt={""}          />
          ))
        ) : (
          <div className="py-6">No posts to display</div>
        )} */}
      </>
    )
  }
  
  export default Home
  