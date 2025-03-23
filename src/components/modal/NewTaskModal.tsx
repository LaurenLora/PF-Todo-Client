"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { CreateTaskType, Priority, Status, Task } from "@/types";
import { fixPriority, fixStatus } from "@/utils/helpers";
import { cn } from "@/lib/utils";
import { addTask, addThumbnailToTask } from "@/lib/api/taskApi";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newTaskAdded: (task: Task) => void;
}

export default function NewTaskModal({
  isOpen,
  onOpenChange,
  newTaskAdded
}: ModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newTask, setNewTask] = useState<CreateTaskType>({
    title: "",
    description: "",
    status: Status.TODO,
    priority: Priority.MEDIUM
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnail(e.target.files[0]);
    }
  };

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

      if (res) {
        if (thumbnail) {
          const fileRes = await addThumbnailToTask(res._id, thumbnail);
          console.log(fileRes);

          newTaskAdded(fileRes);
          setNewTask({
            title: "",
            description: "",
            priority: Priority.MEDIUM,
            status: Status.TODO
          });
          onOpenChange(false);
        } else {
          newTaskAdded(res);
          setNewTask({
            title: "",
            description: "",
            priority: Priority.MEDIUM,
            status: Status.TODO
          });
          onOpenChange(false);
        }
      }
    } catch (error) {
      console.log(error);
      onOpenChange(false);
    }
  };
  const handleOpenFileUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="xl:min-w-[800px] w-full">
        <DialogTitle>New Task</DialogTitle>

        <div className="flex flex-col gap-5 ">
          <Input
            required
            className="w-full"
            onChange={handleInputChange}
            value={newTask.title}
            placeholder="Title"
            name="title"
          />
          <Input
            required
            className="w-full"
            onChange={handleInputChange}
            value={newTask.description}
            placeholder="Description"
            name="description"
          />
          <div className="xl:flex grid grid-cols-2 xl:w-full pr-10  justify-start xl:items-center gap-5">
            <h1>Priority:</h1>

            {Object.values(Priority).map((item: string, index: number) => (
              <Button
                onClick={() => handlePriorityChange(item as Priority)}
                key={`PRIORITY_${index}`}
                className={cn(
                  "bg-orange-550 xl:w-auto w-24   hover:bg-orange-550 cursor-pointer",
                  newTask.priority === item
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
                  newTask.status === item
                    ? "bg-orange-550/50 hover:bg-orange-550/50"
                    : ""
                )}>
                {fixStatus(item)}
              </Button>
            ))}
          </div>
          <Input
            type="file"
            onChange={handleChangeFile}
            className="hidden"
            ref={inputRef}
          />
          <Button
            onClick={handleOpenFileUpload}
            className="bg-orange-550 text-white hover:bg-orange-550 active:scale-95 cursor-pointer">
            Add Thumbnail
          </Button>
          <Button
            disabled={!newTask.title || !newTask.description}
            onClick={() => handleSubmit()}
            className="bg-orange-550 text-white hover:bg-orange-550 active:scale-95 cursor-pointer">
            Add New Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
