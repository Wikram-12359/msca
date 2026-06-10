import api from "@/lib/axios";
import { toast } from "sonner";

export const getSubjects = async () => {
  const res = await api.get("/admin");
  return res.data;
};


export const createSubject = async (title: string, teacherId: string) => {
  console.log(title, teacherId);
  if(!title || !teacherId){
    toast.error("Error while assigning subject")
    return
  }
  const data = {title, teacher:teacherId}
  const res = await api.post("/admin/subject", data);
  return res.data;
};