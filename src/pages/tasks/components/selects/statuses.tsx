import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { statuses } from "@/data/mock";

export default function SelectStatus() {
    return (<Select
        value={`todo`}
    // onValueChange={(value) => {
    //     table.setPageSize(Number(value))
    // }}
    >
        <SelectTrigger className="h-8 w-[120px]">
            <SelectValue placeholder={statuses[0].value} />
        </SelectTrigger>
        <SelectContent side="top">
            {statuses.map((status, index) => (
                <SelectItem key={index} value={status.value}>
                    {status.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>)
}