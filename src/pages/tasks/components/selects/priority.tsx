import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { priorities } from "@/data/mock";

export type SelectPriorityProps = {
    value: string
    onValueChange: (value: string) => void
}

export default function SelectPriority({ value, onValueChange }: SelectPriorityProps) {
    return (<Select
        value={value}
        onValueChange={onValueChange}
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