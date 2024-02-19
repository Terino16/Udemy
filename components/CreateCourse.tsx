'use client'
import React, { ReactHTML, useState } from 'react';
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

const CreateCourse =() => {
  const cat = [
    { category: "Programming" },
    { category: "Web Development" },
    { category: "Mobile App Development" },
    { category: "Data Science" },
    { category: "Machine Learning" },
    { category: "Artificial Intelligence" },
    { category: "Blockchain" },
    { category: "Cybersecurity" },
    { category: "Game Development" },
    { category: "Graphic Design" },
    { category: "Digital Marketing" },
    { category: "Photography" },
    { category: "Music Production" },
    { category: "Business Management" },
    { category: "Finance" },
    { category: "Health & Fitness" },
    { category: "Cooking & Culinary Arts" },
    { category: "Language Learning" },
    { category: "Art & Craft" },
    { category: "Self-Improvement" }
  ];
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const router=useRouter();
  const initialstate={
    name: "",
    content: "",
    catName: "", // Change the state variable name to match the input name
  }

  const handleImageUpload = (result: CldUploadWidgetResults) => {
    console.log("result: ", result);
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(public_id);
      console.log("url: ", url);
      console.log("public_id: ", public_id);
    }
  };


  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("api/removeImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (res.ok) {
        setImageUrl("");
        setPublicId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [coursedata, setCoursedata] = useState({
    name: "",
    content: "",
    catName: "", // Change the state variable name to match the input name
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCoursedata(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit =async (e:React.SyntheticEvent)=>
  {
    e.preventDefault();
    const  {name,content,catName}=coursedata
    try {
      const res = await fetch("api/post/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,content,catName,
          imageUrl,
          publicId,
        }),
      });
      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
    setCoursedata(initialstate);
  };
    
    
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex'>
          <label>Course Name</label>
          <input name='name' placeholder='Java Programming' className='p-2 text-black' value={coursedata.name} onChange={handleChange} />
        </div>

        <div className='flex'>
          <label>Content</label>
          <input name='content' placeholder='About the Course' className='p-2 text-black' value={coursedata.content} onChange={handleChange} />
        </div>

        <div className='flex'>
          <label>Category</label>
          <select name='catName' value={coursedata.catName} className='p-2 text-black' onChange={handleChange}>
            <option value="">Select a category</option>
            {cat.map((category, index) => (
              <option key={index} value={category.category}>{category.category}</option>
            ))}
          </select>
        </div>

        <button className='p-2 bg-red text-red-500' type="submit">
          Submit
        </button>
        
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          className={`h-48 w-48 border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative ${
            imageUrl && "pointer-events-none"
          }`}
          onUpload={handleImageUpload}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          {imageUrl && (
             <Image
             src={imageUrl}
             fill
             className="absolute object-cover inset-0"
             alt={"Photo"}
           />
          )}
        </CldUploadButton>

        {publicId && (
          <button
            onClick={removeImage}
            className="py-2 px-4 rounded-md font-bold w-fit bg-red-600 text-white mb-4"
          >
            Remove Image
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateCourse;
