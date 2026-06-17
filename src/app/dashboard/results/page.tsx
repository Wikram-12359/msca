"use client";
import { StudentResultsTable } from "@/components/student/StudentResultsTable";
import { useUIStore } from "@/store/ui-store";
import { useEffect } from "react";

const Results = () => {
  const {setActivePage} = useUIStore()
  useEffect(()=>{
      setActivePage("Results")
    },[])
  return (
    <div className="container mx-auto py-8">
      <StudentResultsTable />
    </div>
  );
};

export default Results;