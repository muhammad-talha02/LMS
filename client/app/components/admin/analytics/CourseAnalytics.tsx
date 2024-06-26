import { styles } from '@/app/styles/style';
import { useGetCourseAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Label, LabelList, ResponsiveContainer } from 'recharts';
import { DataLoader } from '../../Loader/Loader';

type Props = {}

const CourseAnalytics = (props: Props) => {

    const { data: courseAnalytics, isLoading } = useGetCourseAnalyticsQuery({})

    const analyticsData: any = []
    courseAnalytics && courseAnalytics?.AnalyticsData?.last12Months?.forEach((element: any) => {
        analyticsData.push({ name: element.month, uv: element.count })
    });
    const minValue = 0
    return (
        <div className='h-screen'>
            <div>

                <h1 className={`${styles.title}`}>Courses Analytics</h1>
                <p className='text-center'>Last 12 Months analytics data</p>
            </div>
            <div className="w-full mt-5">
                {
                    isLoading ? <DataLoader /> :
                        <ResponsiveContainer width={"90%"} height={500}>
                            <BarChart width={150} height={300} data={analyticsData}>
                                <XAxis dataKey={"name"}>
                                    <Label offset={0} position={"insideBottom"} />
                                </XAxis>
                                <YAxis domain={[minValue, 5]} />
                                <Bar dataKey={"uv"} fill='#3faf82'>
                                    <LabelList dataKey={"uv"} position={"top"} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                }
            </div>
        </div>
    )
}

export default CourseAnalytics