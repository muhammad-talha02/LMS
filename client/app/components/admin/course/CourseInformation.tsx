"use client"
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import InputField from '../../form/InputField'
import { Box, Grid } from '@mui/material'
import { styles } from '@/app/styles/style'
import Image from 'next/image'
import { NextButton } from '.'
import { useGetLayoutQuery } from '@/redux/features/layout/layoutApi'

type Props = {
    active: number,
    setActive: (active: number) => void,
    courseInfo: any,
    setCourseInfo: (courseInfo: any) => void
}

const CourseInformation: FC<Props> = (props) => {
    const [dargging, setDraggging] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])
    const { active, setActive, courseInfo, setCourseInfo } = props

    //? GET Categories Data API
    const {
        data: getCategoriesData,
        isLoading,
        isSuccess,
        refetch,
    } = useGetLayoutQuery("Categories", { refetchOnMountOrArgChange: true });


    useEffect(() => {
        if (getCategoriesData) {
            setCourseCategories(getCategoriesData.layout.categories)
        }
    }, [getCategoriesData])

    //* Submit to go Next Step

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1)

    }

    // Handle Change for Input Fields
    const handleChange = (e: ChangeEvent<any>) => {

        setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value })
    }
    // Handle Change For File 
    const handleFileChange = (e: any) => {
        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader()

            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result })
                }
            }
            reader.readAsDataURL(file)
        }
    }

    // Drag Over
    const handleDragOver = (e: any) => {
        e.preventDefault()
        setDraggging(true)
    }

    // Drag Leave
    const handleDragLeave = (e: any) => {
        e.preventDefault()
        setDraggging(false)
    }


    const handleDragDrop = (e: any) => {
        e.preventDefault()
        setDraggging(false)

        const file = e.dataTransfer.files?.[0]

        if (file) {
            const reader = new FileReader()

            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                setCourseInfo({ ...courseInfo, thumbnail: reader.result })
                }
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <div className='w-[80%] m-auto mt-24'>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>

                    <InputField
                        style={{ md: 12, lg: 12 }}
                        type="text"
                        name='name'
                        id='name'
                        required
                        placeholder="Please enter course name"
                        label={"Course Name:"}
                        value={courseInfo.name}
                        onChange={handleChange}
                    />
                    <InputField
                        style={{ lg: 12, md: 12 }}
                        name='description'
                        label={"Course Description:"}
                    >
                        <textarea rows={8} className={`${styles.input} !h-auto py-2`} placeholder='Write something amazing' name='description' value={courseInfo.description} onChange={handleChange}>

                        </textarea>
                    </InputField>
                    <InputField
                        style={{ md: 12, lg: 6 }}
                        type="number"
                        name='price'
                        id='price'
                        required
                        placeholder="Please enter course price"
                        label={"Course Price:"}
                        value={courseInfo.price}
                        onChange={handleChange}
                    />
                    <InputField
                        style={{ md: 12, lg: 6 }}
                        type="number"
                        name='estimatedPrice'
                        id='estimatedPrice'
                        placeholder="Please enter estimated price"
                        label={"Estimated Price (Optioanl):"}
                        value={courseInfo.estimatedPrice}
                        onChange={handleChange}
                    />
                    <InputField
                        style={{ md: 12, lg: 6 }}
                        type="text"
                        name='tags'
                        id='tags'
                        placeholder="Next 13, MERN Stack, JavaScript ..."
                        label={"Course tags"}
                        value={courseInfo.tags}
                        onChange={handleChange}
                    />
                    <Grid item xs={12} lg={6}>
                        <label htmlFor="category" className={`${styles.label}`}>Course Category</label>
                        <select name="category" value={courseInfo.category} onChange={(e) => {
                            setCourseInfo({ ...courseInfo, category: e.target.value })
                        }} id="category" className={`${styles.input}`}>
                            <option value="" defaultChecked disabled className='dark:text-white dark:bg-black'>Select Category</option>
                            {
                                courseCategories.map((category: any) => (
                                    <option value={category.title} key={category._id} className='dark:text-white dark:bg-black'>{category.title}</option>

                                ))
                            }
                        </select>
                    </Grid>
                    {/* <InputField
                        style={{ md: 12, lg: 12 }}
                        type="text"
                        name='categories'
                        id='categories'
                        placeholder="Next 13, MERN Stack, JavaScript ..."
                        label={"Course Category"}
                        value={courseInfo.categories}
                        onChange={handleChange}
                    /> */}
                    <InputField
                        style={{ md: 12, lg: 6 }}
                        type="text"
                        name='levels'
                        id='levels'
                        placeholder="Beginner/Intermediate/Expert"
                        label={"Level"}
                        value={courseInfo.levels}
                        onChange={handleChange}
                    />
                    <InputField
                        style={{ md: 12, lg: 6 }}
                        type="text"
                        name='demoUrl'
                        id='demoUrl'
                        placeholder="..........."
                        label={"Demo URL"}
                        value={courseInfo.demoUrl}
                        onChange={handleChange}
                    />
                    <Grid item xs={12}>
                        <input type="file"
                            accept='image/*'
                            id='file'
                            className='hidden'
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file" className={`w-full min-h-[10vh] border-[#0000026] p-3 border dark:border-white flex justify-center items-center cursor-pointer ${dargging ? "bg-blue-500" : "bg-transparent"}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDragDrop}
                        >

                            {
                                courseInfo.thumbnail ? (
                                    <Image src={courseInfo.thumbnail?.url || courseInfo?.thumbnail} alt="thumbnail" className='max-h-[500px] w-full object-cover' width={500} height={200} />
                                ) : (
                                    <span>Drag and Drop Your thumbnail or click to browse</span>
                                )
                            }
                        </label>
                    </Grid>

                </Grid>
                <NextButton nextTitle='Next' handleNext={() => setActive(active + 1)} />
            </form>
        </div>
    )
}

// const NextButton = () => {
//     return <div className="w-full flex justify-end mb-10">

//      <input type='submit' value={'Next'} className='text-white bg-[--t-blue] rounded mt-8 cursor-pointer w-full 800px:w-[150px] h-[40px]' />
//     </div>
// }

export default CourseInformation