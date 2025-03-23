/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Task } from "@/types";
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

interface TasksProps {
  data: Task[];
}
const TaskList = ({ data }: TasksProps) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleOpenTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };
  console.log(data);
  return (
    <>
      <TaskModal
        isOpen={isTaskModalOpen}
        onOpenChange={setIsTaskModalOpen}
        selectedTask={selectedTask}
      />
      <Table className="">
        <TableHeader className="">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Recommendatitons</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: Task, index: number) => (
            <TableRow
              className="hover:bg-orange-550 cursor-pointer"
              onClick={() => handleOpenTaskModal(item)}
              key={`TABLEITEM_${index}`}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TaskList;
