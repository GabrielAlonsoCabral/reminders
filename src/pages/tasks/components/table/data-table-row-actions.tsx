import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "../../../../components/ui/button"
import { useTasksStore } from "@/stores/tasks-store"
import { toast } from "sonner"
import { useState } from "react"
import { UpdateTaskDialog } from "../dialogs/update-task-dialog"
import { Task } from "@/schemas/task.schema"

interface DataTableRowActionsProps {
    row: Row<Task>
}

export function DataTableRowActions({
    row,
}: DataTableRowActionsProps) {
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const deleteTask = useTasksStore(state => state.deleteTask)

    return (
        <DropdownMenu>
            <UpdateTaskDialog initialTask={row.original} isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} />
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => setIsUpdateOpen(true)}>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    deleteTask(row.original.id)
                    toast.success("Task deleted successfully")
                }
                } >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}