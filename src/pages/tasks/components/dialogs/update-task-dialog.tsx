import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SelectStatus from "../selects/statuses"
import SelectPriority from "../selects/priority"
import { Task, taskSchema } from "@/schemas/task.schema"
import { useMemo, useState } from "react"
import { useTasksStore } from "@/stores/tasks-store"
import { toast } from "sonner"

export type OnSubmit = (task: Task) => void
export type UpdateTaskProps = {
    isOpen: boolean
    onClose: OnSubmit
    initialTask: Task
}

export function UpdateTaskDialog({
    isOpen,
    onClose,
    initialTask,
}: UpdateTaskProps) {
    const updateTaskOnStore = useTasksStore(state => state.updateTask)

    const [upsertedTask, setUpsertedTask] = useState<Task>({
        id: initialTask.id,
        title: initialTask.title,
        status: initialTask.status,
        priority: initialTask.priority,
    })

    function onUpdateTask(task: Task) {
        try {
            taskSchema.parse(task)
            updateTaskOnStore(task.id, task)
            toast.success("Task updated successfully")
        } catch (error) {
            toast.error("Error updating task")
        }
    }

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUpsertedTask((task) => ({ ...task, title: e.target.value }))
    }

    function handleStatusChange(status: string) {
        setUpsertedTask((task) => ({ ...task, status }))
    }

    function handlePriorityChange(priority: string) {
        setUpsertedTask((task) => ({ ...task, priority }))
    }

    const isValid = useMemo(() => {
        try {
            taskSchema.parse(upsertedTask)
            return true
        } catch (error) {
            return false
        }
    }, [upsertedTask])

    return (
        <Dialog open={isOpen}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    onClose(upsertedTask)
                }
            }}
        >
            <DialogContent forceMount className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update task</DialogTitle>
                    <DialogDescription>
                        Update an existing task
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input id="title" value={upsertedTask.title} className="col-span-3" onChange={handleTitleChange} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                            Status
                        </Label>
                        <div className="col-span-3 ">
                            <SelectStatus onValueChange={handleStatusChange} value={upsertedTask.status} />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                            Priority
                        </Label>
                        <div className="col-span-3 ">
                            <SelectPriority onValueChange={handlePriorityChange} value={upsertedTask.priority} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" disabled={!isValid} onClick={() => {
                            onUpdateTask(upsertedTask)
                            onClose(upsertedTask)
                        }} >
                            Update
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
