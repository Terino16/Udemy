import React from 'react'
import CreateCourse from '@/components/CreateCourse'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
const page =  async () => {
    const session= await getServerSession(authOptions);
    if(!session)
    return redirect("sign-in");

  return (
   <CreateCourse/>
  )
}

export default page