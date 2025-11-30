import type { ReactNode } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-slate-100 border border-slate-300 text-slate-800 shadow-xl max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-slate-900">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">{children}</div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
