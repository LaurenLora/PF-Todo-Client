"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { Priority, Status, Task } from "@/types";
import { fixPriority, fixStatus } from "@/utils/helpers";
import { cn } from "@/lib/utils";
import { attachFileToTask, editTask, getTaskById } from "@/lib/api/taskApi";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string;
  edittedTask: (task: Task) => void;
}

export default function EditTaskModal({
  isOpen,
  onOpenChange,
  taskId,
  edittedTask
}: ModalProps) {
  const [editTaskk, setEditTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: Status.TODO,
    priority: Priority.MEDIUM
  });
  const [attachFiles, setAttachFiles] = useState<File[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAttachFiles(filesArray);
    }
  };

  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        try {
          const taskData = await getTaskById(taskId);
          if (taskData) {
            setEditTask(taskData);
          }
        } catch (error) {
          console.log("Err", error);
        }
      };

      fetchTask();
    }
  }, [taskId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //gereksiz renderlamayak
  const handlePriorityChange = (priority: Priority) => {
    if (editTaskk.priority !== priority) {
      setEditTask((prev) => ({ ...prev, priority }));
    }
  };
  //gereksiz renderlamayak
  const handleStatusChange = (status: Status) => {
    if (editTaskk.status !== status) {
      setEditTask((prev) => ({ ...prev, status }));
    }
  };

  const handleUpload = async () => {
    try {
      if (attachFiles) {
        const res = await attachFileToTask(taskId, attachFiles);
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await editTask(taskId, editTaskk);

      if (res) {
        const fileRes = await handleUpload();
        if (fileRes) {
          onOpenChange(false);
          edittedTask(fileRes);
        } else {
          onOpenChange(false);
          edittedTask(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenFileUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full xl:min-w-[800px] ">
        <DialogTitle>Edit Task </DialogTitle>

        <div className="flex flex-col gap-5 w-full">
          <Input
            className="w-full"
            onChange={handleInputChange}
            value={editTaskk.title}
            placeholder="Title"
            name="title"
          />
          <Input
            onChange={handleInputChange}
            value={editTaskk.description}
            placeholder="Description"
            name="description"
          />
          <div className="xl:flex grid grid-cols-2 xl:w-full pr-10  justify-start xl:items-center gap-5">
            <h1>Priority:</h1>
            {/* şüpheli */}
            {Object.values(Priority).map((item: string, index: number) => (
              <Button
                onClick={() => handlePriorityChange(item as Priority)}
                key={`PRIORITY_${index}`}
                className={cn(
                  "bg-orange-550 xl:w-auto w-24   hover:bg-orange-550 cursor-pointer",
                  editTaskk.priority === item
                    ? "bg-orange-550/50 hover:bg-orange-550/50"
                    : ""
                )}>
                {fixPriority(item)}
              </Button>
            ))}
          </div>
          <div className="xl:flex grid grid-cols-12 xl:w-full pr-10  justify-start xl:items-center gap-5">
            <h1 className="col-span-12">Status:</h1>
            {Object.values(Status).map((item: string, index: number) => (
              <Button
                onClick={() => handleStatusChange(item as Status)}
                key={`STATUS_${index}`}
                className={cn(
                  "bg-orange-550 col-span-6 hover:bg-orange-550 cursor-pointer",
                  editTaskk.status === item
                    ? "bg-orange-550/50 hover:bg-orange-550/50"
                    : ""
                )}>
                {fixStatus(item)}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleOpenFileUpload}
            className="bg-orange-550 text-white hover:bg-transparent hover:duration-150 hover:transition-all">
            Attach File
          </Button>

          <Input
            multiple
            onChange={handleChangeFile}
            className="hidden"
            ref={inputRef}
            type="file"
          />

          <Button
            onClick={() => handleSubmit()}
            className="bg-orange-550 text-white hover:bg-orange-550 active:scale-95 cursor-pointer">
            Update Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
