import React, { Dispatch, SetStateAction } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

type subjectType = {
  _id: string,
  title: string
}


type courseType = {
  _id: string,
  title: string,
  subjects: subjectType[]
}

export const SelectCourse = ({courses, setSubjects}: {courses: courseType[], setSubjects: Dispatch<SetStateAction<subjectType[] | null>>}) => {
  const handleChange = (e)=>{
    console.log(e);
    const course = courses.find((c)=> c._id == e)
    setSubjects(course?.subjects ?? []);
  }
  return (
    <Select  onValueChange={(e)=>handleChange(e)} name='course'>
      <SelectTrigger className='w-full max-w-48'>
        <SelectValue placeholder='Select a course' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Courses</SelectLabel>
          {courses?.map((e: courseType) => (
            <SelectItem key={e?._id} value={e?._id}>
              {e?.title}{' '}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
