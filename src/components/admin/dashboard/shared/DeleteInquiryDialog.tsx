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
                <Dialog.Overlay className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-[2px] transition-opacity" />

                <Dialog.Content className="fixed left-1/2 top-1/2 z-[60] w-[calc(100%-32px)] max-w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white px-6 py-7 text-center shadow-xl focus:outline-none">

                    {/* Centered Icon */}
                    <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <AlertTriangle size={22} strokeWidth={2.2} />
                    </div>

                    {/* Centered Title */}
                    <Dialog.Title className="text-base font-semibold tracking-normal text-slate-900">
                        Delete Inquiry?
                    </Dialog.Title>

                    {/* Centered Description with better spacing */}
                    <Dialog.Description className="mt-3 text-xs leading-6 text-slate-500">
                        Are you sure you want to permanently delete the inquiry from{" "}
                        <span className="font-semibold text-slate-800">
                            {inquiryName}
                        </span>
                        ? This action cannot be undone.
                    </Dialog.Description>

                    {/* Centered Compact Buttons */}
                    <div className="mt-7 flex items-center justify-center gap-3">
                        <Dialog.Close
                            disabled={isDeleting}
                            className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50"
                        >
                            Cancel
                        </Dialog.Close>

                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-1.5 text-xs font-medium !text-white transition-colors hover:bg-red-700 active:scale-[0.98] disabled:opacity-60"
                        >
                            <Trash2 size={14} className="shrink-0 !text-white" />
                            <span className="!text-white">
                                {isDeleting ? "Deleting..." : "Delete"}
                            </span>
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}