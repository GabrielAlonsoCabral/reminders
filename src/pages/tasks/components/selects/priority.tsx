import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { priorities } from "@/data/mock";

export default function SelectPriority() {
    return (<Select
        value={`medium`}
    // onValueChange={(value) => {
    //     table.setPageSize(Number(value))
    // }}
    >
        <SelectTrigger className="h-8 w-[120px]">
            <SelectValue placeholder={priorities[0].value} />
        </SelectTrigger>
        <SelectContent side="top">
            {priorities.map((status, index) => (
                <SelectItem key={index} value={status.value}>
                    {status.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>)
}