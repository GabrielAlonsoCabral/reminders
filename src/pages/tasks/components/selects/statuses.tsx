import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { statuses } from "@/data/mock";

export type SelectStatusesProps = {
    value: string
    onValueChange: (value: string) => void
}

export default function SelectStatus({ value, onValueChange }: SelectStatusesProps) {
    return (<Select
        value={value}
        onValueChange={onValueChange}
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