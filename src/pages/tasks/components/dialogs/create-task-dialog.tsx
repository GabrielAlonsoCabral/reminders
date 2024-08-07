import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
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
import { Task, taskSchema } from "@/schemas/task.schema"
import { useMemo, useState } from "react"
import { useTasksStore } from "@/stores/tasks-store"
import { toast } from "sonner"

export type OnSubmit = (task: Task) => void

export function CreateTaskDialog() {
    const createTaskOnStore = useTasksStore(state => state.createTask)

    const [upsertedTask, setUpsertedTask] = useState<Task>({
        id: `TASK-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        title: "",
        status: "todo",
        priority: "medium",
    })

    function onCreateTask(task: Task) {
        try {
            taskSchema.parse(task)
            createTaskOnStore(task)
            setUpsertedTask({
                id: `TASK-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
                title: "",
                status: "todo",
                priority: "medium",
            })
            toast.success("Task created successfully")
        } catch (error) {
            toast.error("Error creating task")
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
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-8 border-dashed" variant="outline">Create task</Button>
            </DialogTrigger>
            <DialogContent forceMount className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create task</DialogTitle>
                    <DialogDescription>
                        Create a new task
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Title
                        </Label>
                        <Input id="name" value={upsertedTask.title} className="col-span-3" onChange={handleTitleChange} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Status
                        </Label>
                        <div className="col-span-3 ">
                            <SelectStatus onValueChange={handleStatusChange} value={upsertedTask.status} />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Priority
                        </Label>
                        <div className="col-span-3 ">
                            <SelectPriority onValueChange={handlePriorityChange} value={upsertedTask.priority} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" disabled={!isValid} onClick={() => onCreateTask(upsertedTask)} >
                            Create
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
