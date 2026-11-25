"use client";

import { Dialog } from "radix-ui";
import { AlertTriangle, Trash2 } from "lucide-react";

type DeleteInquiryDialogProps = {
    open: boolean;
    inquiryName: string;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting?: boolean;
};

export function DeleteInquiryDialog({
    open,
    inquiryName,
    onClose,
    onConfirm,
    isDeleting = false,
}: DeleteInquiryDialogProps) {
    return (
        <Dialog.Root
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen && !isDeleting) onClose();
            }}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-[2px] transition-opacity" />

                <Dialog.Content className="fixed left-1/2 top-1/2 z-[60] w-[calc(100%-32px)] max-w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-bg-surface px-6 py-7 text-center text-text-primary shadow-xl focus:outline-none">

                    {/* Centered Icon */}
                    <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger">
                        <AlertTriangle size={22} strokeWidth={2.2} />
                    </div>

                    {/* Centered Title */}
                    <Dialog.Title className="text-base font-semibold tracking-normal text-text-primary">
                        Delete Inquiry?
                    </Dialog.Title>

                    {/* Centered Description with better spacing */}
                    <Dialog.Description className="mt-3 text-xs leading-6 text-text-secondary">
                        Are you sure you want to permanently delete the inquiry from{" "}
                        <span className="font-semibold text-text-primary">
                            {inquiryName}
                        </span>
                        ? This action cannot be undone.
                    </Dialog.Description>

                    {/* Centered Compact Buttons */}
                    <div className="mt-7 flex items-center justify-center gap-3">
                        <Dialog.Close
                            disabled={isDeleting}
                            className="rounded-lg border border-border bg-bg-surface px-4 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                        >
                            Cancel
                        </Dialog.Close>

                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-danger px-4 py-1.5 text-xs font-medium text-on-primary transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger active:scale-[0.98] disabled:opacity-60 dark:bg-danger/15 dark:text-danger"
                        >
                            <Trash2 size={14} className="shrink-0 text-on-primary dark:text-danger" />
                            <span className="text-on-primary dark:text-danger">
                                {isDeleting ? "Deleting..." : "Delete"}
                            </span>
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
