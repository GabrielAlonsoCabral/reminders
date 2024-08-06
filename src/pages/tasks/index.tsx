// import Image from "next/image"
import { columns } from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"
import { UserNav } from "@/components/navigation/user-nav"
import tasks from "@/data/tasks"
import { UpsertTaskButton } from "./components/table/upsert-task"

export default function TaskPage() {

    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">BTG Reminders</h2>
                        <p className="text-muted-foreground">
                            Your tasks and reminders
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <UserNav />
                    </div>
                </div>
                <DataTable data={tasks} columns={columns} extraButtons={<UpsertTaskButton type="create" />} />
            </div>
        </>
    )
}