'use client'
import Loader from '@/app/components/Loader/Loader'
import CourseContent from '@/app/components/courses/CourseContent'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
  params: any
}

const CourseAccessPage = ({ params }: Props) => {
  const courseId = params.courseId;

  const { isLoading, error, data: userData } = useLoadUserQuery({})

  useEffect(() => {
    if (userData) {
      const isPurchased: any = userData?.user?.courses.find((course: any) => course._id === courseId)
      if (!isPurchased || error) {
        redirect(`/courses/course/${courseId}`)
      }
    }
  }, [userData, error, courseId])
  return (
    <>
      {
        isLoading ? <Loader /> : <>
          <CourseContent courseId={courseId} user={userData?.user} />
        </>
      }
    </>
  )
}

export default CourseAccessPage