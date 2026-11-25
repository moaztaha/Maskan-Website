
"use client";

import { Dialog } from "radix-ui";
import { X } from "lucide-react";

type InquiryDialogData = {
    name: string;
    phone: string;
    email: string | null;
    message: string;
    property: {
        title: string;
    };
};

type ViewInquiryDialogProps = {
    selectedInquiry: InquiryDialogData | null;
    onClose: () => void;
};

export function ViewInquiryDialog({
    selectedInquiry,
    onClose,
}: ViewInquiryDialogProps) {
    return (
        <Dialog.Root
            open={selectedInquiry !== null}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-[2px] transition-opacity" />

                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[88vh] w-[calc(100%-32px)] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-bg-surface text-text-primary shadow-lg">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-border bg-bg-subtle px-6 py-4">
                        <div>
                            <span className="mb-3 inline-flex items-center rounded-full border border-primary/20 bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-primary">
                                Property Inquiry
                            </span>

                            <Dialog.Title className="mt-2 text-lg font-semibold tracking-tight text-text-primary">
                                Inquiry Details
                            </Dialog.Title>

                            <Dialog.Description className="mt-0.5 text-xs text-text-secondary">
                                Review customer contact info and requested property details.
                            </Dialog.Description>
                        </div>

                    </div>

                    {/* Body */}
                    {selectedInquiry && (
                        <div className="flex-1 space-y-5 overflow-y-auto bg-bg-page px-6 py-5">
                            {/* Property Highlight Banner */}
                            <div className="rounded-xl border border-border bg-bg-surface p-4 shadow-sm">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                                        Property
                                    </p>

                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-0.5 text-[11px] font-medium text-success">
                                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                        Active Listing
                                    </span>
                                </div>

                                <p className="mt-1.5 text-sm font-semibold text-text-primary">
                                    {selectedInquiry.property.title}
                                </p>
                            </div>

                            {/* Customer Info Grid */}
                            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                                <div className="rounded-xl border border-border bg-bg-surface p-3.5 shadow-sm">
                                    <p className="text-xs font-medium text-text-muted">
                                        Customer Name
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-text-primary">
                                        {selectedInquiry.name}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border bg-bg-surface p-3.5 shadow-sm">
                                    <p className="text-xs font-medium text-text-muted">Phone</p>
                                    <a
                                        href={`tel:${selectedInquiry.phone}`}
                                        className="mt-1 inline-block text-sm font-semibold text-primary transition-colors hover:text-primary-hover hover:underline"
                                    >
                                        {selectedInquiry.phone}
                                    </a>
                                </div>


                            </div>

                            {/* Message */}
                            <div className="rounded-xl border border-border bg-bg-surface p-4 shadow-sm">
                                <div className="mb-2 flex items-center justify-between">
                                    <p className="text-xs font-medium text-text-muted">Message</p>
                                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-medium text-accent">
                                        Customer Note
                                    </span>
                                </div>

                                <div className="rounded-lg border border-border bg-bg-page p-3.5 text-sm leading-6 text-text-secondary">
                                    {selectedInquiry.message || "No additional message."}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-2.5 border-t border-border bg-bg-surface px-6 py-3.5">
                        <Dialog.Close className="rounded-lg border border-border bg-bg-surface px-4 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                            Close
                        </Dialog.Close>

                        {selectedInquiry?.email && (
                            <a
                                href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                                    `Re: ${selectedInquiry.property.title}`,
                                )}`}
                                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-medium text-on-primary shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                Reply via Email
                            </a>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
