"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { CreateTaskType, Priority, Status } from "@/types";
import { fixPriority, fixStatus } from "@/utils/helpers";
import { cn } from "@/lib/utils";
import { addTask } from "@/lib/api/taskApi";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewTaskModal({ isOpen, onOpenChange }: ModalProps) {
  const [newTask, setNewTask] = useState<CreateTaskType>({
    title: "",
    description: "",
    status: Status.TODO,
    priority: Priority.MEDIUM
  });

  console.log(newTask);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //gereksiz renderlamayak
  const handlePriorityChange = (priority: Priority) => {
    if (newTask.priority !== priority) {
      setNewTask((prev) => ({ ...prev, priority }));
    }
  };

  //gereksiz renderlamayak
  const handleStatusChange = (status: Status) => {
    if (newTask.status !== status) {
      setNewTask((prev) => ({ ...prev, status }));
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await addTask(newTask);

      console.log("res", res);
      if (res?.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[800px]">
        <DialogTitle>New Task</DialogTitle>

        <div className="flex flex-col gap-5 w-full">
          <Input
            onChange={handleInputChange}
            value={newTask.title}
            placeholder="Title"
            name="title"
          />
          <Input
            onChange={handleInputChange}
            value={newTask.description}
            placeholder="Description"
            name="description"
          />
          <div className="flex w-full justify-start items-center gap-5">
            <h1>Priority:</h1>
            {Object.values(Priority).map((item: string, index: number) => (
              <Button
                onClick={() => handlePriorityChange(item as Priority)}
                key={`PRIORITY_${index}`}
                className={cn(
                  "bg-orange-550 hover:bg-orange-550 cursor-pointer",
                  newTask.priority === item
                    ? "bg-orange-550/50 hover:bg-orange-550/50"
                    : ""
                )}>
                {fixPriority(item)}
              </Button>
            ))}
          </div>
          <div className="flex w-full justify-start items-center gap-5">
            <h1>Status:</h1>
            {Object.values(Status).map((item: string, index: number) => (
              <Button
                onClick={() => handleStatusChange(item as Status)}
                key={`STATUS_${index}`}
                className={cn(
                  "bg-orange-550 hover:bg-orange-550 cursor-pointer",
                  newTask.status === item
                    ? "bg-orange-550/50 hover:bg-orange-550/50"
                    : ""
                )}>
                {fixStatus(item)}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleSubmit}
            className="bg-orange-550 text-white hover:bg-orange-550 active:scale-95 cursor-pointer">
            Add New Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
