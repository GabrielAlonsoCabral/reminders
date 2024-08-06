import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SelectStatus from "../selects/statuses"
import SelectPriority from "../selects/priority"

export type UpsertTaskButtonTypes = "create" | "update"
export type UpsertTaskButtonProps = {
    type: UpsertTaskButtonTypes
}

export function UpsertTaskButton({
    type
}: UpsertTaskButtonProps) {

    const texts: Record<UpsertTaskButtonTypes, { title: string, subtitle: string, submit: string }> = {
        create: {
            title: "Create task",
            subtitle: "Create a new task",
            submit: "Create"
        },
        update: {
            title: "Edit task",
            subtitle: "Edit an existing task",
            submit: "Save changes"
        }
    }

    const text = texts[type]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-8 border-dashed" variant="outline">{text.title}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{text.title}</DialogTitle>
                    <DialogDescription>
                        {text.subtitle}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Title
                        </Label>
                        <Input id="name" value="" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Status
                        </Label>
                        <div className="col-span-3 ">
                            <SelectStatus />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Priority
                        </Label>
                        <div className="col-span-3 ">
                            <SelectPriority />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">
                        {text.submit}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
