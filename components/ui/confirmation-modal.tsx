"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

interface Props {
  callback: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export default function ConfirmationModal({ callback, setOpen, open }: Props) {
  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    callback();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="fixed left-0 top-0 w-dvw h-dvh bg-black/50 flex items-center justify-center text-xs">
        <VisuallyHidden>
          <DialogTitle>Are you sure you want to delete this transaction?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </VisuallyHidden>
        <Card>
          <CardHeader>
            <CardTitle>Are you sure you?</CardTitle>
            <CardDescription className="text-xs">This action cannot be undone.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center gap-x-4">
            <Button onClick={handleSubmit}>Submit</Button>
            <Button className="bg-white text-black border border-black hover:bg-black hover:text-white" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
