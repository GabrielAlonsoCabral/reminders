import tasks from '@/data/tasks'
import { Task } from '@/schemas/task.schema'
import { create } from 'zustand'

type TasksStore = {
    tasks: Task[]
    createTask: (task: Task) => void
    deleteTask: (id: string) => void
    updateTask: (id: string, updatedTask: Task) => void
    setAsDone: (ids: string[]) => void
}

const tasksOnLocalStorage = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem('tasks') || '[]') : tasks

export const useTasksStore = create<TasksStore>((set) => ({
    tasks: tasksOnLocalStorage,
    createTask: (task: Task) => set((state: TasksStore) => {
        const newTasks = [...state.tasks, task]
        localStorage.setItem('tasks', JSON.stringify(newTasks))
        return {
            tasks: newTasks,
        }
    }),
    deleteTask: (id: string) => set((state: TasksStore) => {
        const tasks = state.tasks.filter((task) => task.id !== id)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        return {
            tasks,
        }
    }),
    setAsDone: (ids: string[]) => set((state) => {
        const updatedTasks = state.tasks.map((task) => {
            if (ids.some(taskId => taskId === task.id)) {
                return {
                    ...task,
                    status: 'done',
                }
            }
            return task
        })
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        return {
            tasks: updatedTasks,
        }
    }),
    updateTask: (id: string, updatedTask: Task) => set((state) => {
        const updatedTasks = state.tasks.map((task) => {
            if (task.id === id) {
                return updatedTask
            }
            return task
        })
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        return {
            tasks: updatedTasks,
        }
    }),
}))