"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Task } from "@/types";
import { fixPriority, fixStatus } from "@/utils/helpers";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTask: Task | null;
}

export default function TaskModal({
  isOpen,
  onOpenChange,
  selectedTask
}: ModalProps) {
  return (
    <div className="w-full h-full overflow-y-scroll">
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="xl:min-w-[800px] w-full  ">
          <DialogTitle className="text-3xl text-orange-200/80">
            {selectedTask?.title || "No task"}
          </DialogTitle>

          {selectedTask ? (
            <div className="grid gap-4 py-4">
              <div className="xl:grid xl:grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium text-orange-550 text-xl">
                  Title:
                </Label>
                <span className="col-span-3">{selectedTask.title}</span>
              </div>
              <div className="grid xl:grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium text-orange-550 text-xl">
                  Description:
                </Label>
                <span className="col-span-3">{selectedTask.description}</span>
              </div>
              <div className="xl:grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium text-orange-550 text-xl h-auto w-auto ">
                  Recommendations:
                </Label>
                <span className="col-span-3 h-auto">
                  {selectedTask.recommendations}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium text-orange-550 text-xl">
                  Status:
                </Label>
                <span className="col-span-3">
                  {fixStatus(selectedTask.status!)}
                </span>
              </div>

              {selectedTask.priority && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium text-orange-550 text-xl">
                    Priority:
                  </Label>
                  <span className="col-span-3">
                    {fixPriority(selectedTask.priority)}
                  </span>
                </div>
              )}

              {selectedTask.files && (
                <div className="xl:grid grid-cols-4 items-center gap-4 h-40">
                  <Label className="text-right font-medium text-orange-550 text-xl">
                    Attached Files:
                  </Label>
                  <div className="flex justify-center items-center w-full ">
                    {selectedTask.files.map((item: string, index: number) => (
                      <Link
                        target="_blank"
                        key={`attached-${index}`}
                        href={`https://playable-factory.b-cdn.net/${item}`}>
                        <Image
                          src={`https://playable-factory.b-cdn.net/${item}`}
                          width={120}
                          height={120}
                          alt="item"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="py-4">No task selected.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
