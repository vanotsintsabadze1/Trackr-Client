import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent } from "./dialog";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  children: React.ReactNode;
}

export default function CustomDialog({ children, setOpen, open }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogHeader>
      </VisuallyHidden>
      <DialogContent className="flex items-center justify-center w-dvw shadow-none h-fit">{children}</DialogContent>
    </Dialog>
  );
}
