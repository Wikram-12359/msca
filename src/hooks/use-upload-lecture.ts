import api from "@/lib/axios";
import { toast } from "sonner";


export const uploadLectures = async (name: string, course: string, subject:string, link:string) => {
  if(!course || !name || !subject || !link){
    toast.error("Error while assigning subject")
    return
  }
  const data = {name, course, subject, link}
  const res = await api.post("/admin/lecture", data);
  return res.data;
};