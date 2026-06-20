import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

type subjectType = {
  _id: string,
  title: string
}

export const SelectSubject = ({ subjects }: { subjects: subjectType[] | null }) => {
  console.log("subjects in SelectSubject:", subjects);
  return (
    <Select name="subject">
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subject</SelectLabel>

          {(subjects ?? []).map((e) => (
            <SelectItem key={e._id} value={e._id}>
              {e.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
