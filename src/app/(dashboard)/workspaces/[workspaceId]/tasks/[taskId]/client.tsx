"use client"

import { DottedSeparator } from "@/components/dotted-separator"
import { PageError } from "@/components/page-error"
import { PageLoader } from "@/components/page-loader"

import { useGetTask } from "@/features/tasks/api/use-get-task"
import { useTaskId } from "@/features/tasks/hooks/use-task-id"
import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrumnbs"
import { TaskDescription } from "@/features/tasks/components/task-description"
import { TaskOverview } from "@/features/tasks/components/task-overview"

export const TaskIdClient = () => {
  const taskId = useTaskId()
  const { data, isLoading } = useGetTask({ taskId })

  if(isLoading) {
    return <PageLoader />
  }

  if(!data) {
    return <PageError message="Task not found"/>
  }

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs project={data.project} task={data} />
      <DottedSeparator className="my-6"/>
      <div className="grid grid-cols lg:grid-cols-2 gap-4">
        <TaskOverview task={data}/>
        <TaskDescription task={data}/>
      </div>
    </div>
  )
}