"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import NewTaskModal from "../modal/NewTaskModal";
import { Task } from "@/types";

interface NewTaskProps {
  newTaskAdded: (task: Task) => void;
}

const NewTaskButton: React.FC<NewTaskProps> = ({
  newTaskAdded
}: NewTaskProps) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  return (
    <>
      <NewTaskModal
        newTaskAdded={newTaskAdded}
        isOpen={isTaskModalOpen}
        onOpenChange={setIsTaskModalOpen}
      />
      <div className="w-full justify-end flex py-4">
        <Button
          onClick={() => setIsTaskModalOpen(true)}
          className="bg-orange-550 text-white hover:bg-orange-550 cursor-pointer">
          New Task
        </Button>
      </div>
    </>
  );
};

export default NewTaskButton;
