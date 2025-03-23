"use client";

import { Priority, Status, Task } from "@/types";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import TaskModal from "../modal/TaskModal";
import { fixPriority, fixStatus } from "@/utils/helpers";
import { Button } from "../ui/button";
import EditTaskModal from "../modal/EditTaskModal";
import { removeTask } from "@/lib/api/taskApi";
import Filter from "./Filter";
import Image from "next/image";
import NewTaskButton from "./NewTaskButton";

interface TasksProps {
  data: Task[];
}
const TaskList = ({ data }: TasksProps) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [selectEditTaskId, setSelectedEditTaskId] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(data);

  const [tasks] = useState<Task[]>(data);

  const handleEditTaskModal = (taskId: string) => {
    setSelectedEditTaskId(taskId);
    setIsEditTaskModalOpen(true);
  };

  console.log(filteredTasks, "tasks");
  const handleOpenTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleRemoveTask = async (taskId: string) => {
    try {
      const res = await removeTask(taskId);
      console.log(res);
      const newList = tasks.filter((task) => task._id !== taskId);

      setFilteredTasks(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleFilter = (query: string) => {
    const filteredVal = sortedTasks.filter(
      (task: Task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase()) ||
        fixStatus(task.status as Status)
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        fixPriority(task.priority as Priority)
          .toLowerCase()
          .includes(query.toLowerCase())
    );

    setFilteredTasks(filteredVal);
  };

  const handleTaskAdded = (newTask: Task) => {
    console.log(newTask);
    setFilteredTasks((prev) => [...prev, newTask]);
  };

  return (
    <>
      <TaskModal
        isOpen={isTaskModalOpen}
        onOpenChange={setIsTaskModalOpen}
        selectedTask={selectedTask}
      />
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        onOpenChange={setIsEditTaskModalOpen}
        taskId={selectEditTaskId}
      />
      <NewTaskButton newTaskAdded={handleTaskAdded} />
      <div className="w-full py-4">
        <Filter onChange={handleFilter} />
      </div>
      {tasks.length > 0 ? (
        <Table className="">
          <TableHeader className="">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-40">Thumbnail</TableHead>
              <TableHead className="w-40">Title</TableHead>
              <TableHead className="w-40">Description</TableHead>
              <TableHead className="w-40">Recommendatitons</TableHead>
              <TableHead
                onClick={() => console.log("asd")}
                className="text-right">
                Status
              </TableHead>
              <TableHead className="text-right">Priority</TableHead>
              <TableHead className="text-right">Edit</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((item: Task, index: number) => (
              <TableRow
                className="hover:bg-orange-550 cursor-pointer"
                onClick={() => handleOpenTaskModal(item)}
                key={`TABLEITEM_${index}`}>
                <TableCell>
                  {item.thumbnail ? (
                    <div>
                      <Image
                        className="rounded-full"
                        width={40}
                        height={40}
                        alt="thumb
                    "
                        src={`https://playable-factory.b-cdn.net/${item.thumbnail}`}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {item.recommendations.length > 50
                    ? item.recommendations.slice(0, 50) + ".."
                    : item.recommendations}
                </TableCell>
                <TableCell className="text-right">
                  {fixStatus(item.status!)}
                </TableCell>
                <TableCell className="text-right">
                  {fixPriority(item.priority!)}
                </TableCell>
                <TableCell className="text-right p-4 z-50">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditTaskModal(item._id);
                    }}
                    className="bg-white text-black cursor-pointer z-50 hover:bg-white">
                    Edit
                  </Button>
                </TableCell>
                <TableCell className="text-right p-4 z-50">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTask(item._id);
                    }}
                    className="bg-white text-black cursor-pointer z-50 hover:bg-white">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No tasks</div>
      )}
    </>
  );
};

export default TaskList;
