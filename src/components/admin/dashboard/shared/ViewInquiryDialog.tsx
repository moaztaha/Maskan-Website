
"use client";

import { Dialog } from "radix-ui";

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
                <Dialog.Overlay className="fixed inset-0 z-50 bg-[#0f172a]/45 backdrop-blur-[2px] transition-opacity" />

                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[88vh] w-[calc(100%-32px)] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-[#e2e8f0] bg-[#ffffff] text-[#0f172a] shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">
                        <div>
                            <span className="mb-3 inline-flex items-center rounded-full border border-[#dbeafe] bg-[#eff6ff] px-2.5 py-0.5 text-xs font-medium text-[#1e3a8a]">
                                Property Inquiry
                            </span>

                            <Dialog.Title className="mt-2 text-lg font-semibold tracking-tight text-[#0f172a]">
                                Inquiry Details
                            </Dialog.Title>

                            <Dialog.Description className="mt-0.5 text-xs text-[#64748b]">
                                Review customer contact info and requested property details.
                            </Dialog.Description>
                        </div>

                        <Dialog.Close
                            aria-label="Close modal"
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-[#64748b] transition-colors hover:border-[#cbd5e1] hover:bg-[#f1f5f9] hover:text-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]"
                        >
                            ✕
                        </Dialog.Close>
                    </div>

                    {/* Body */}
                    {selectedInquiry && (
                        <div className="flex-1 space-y-5 overflow-y-auto bg-[#f8fafc]/60 px-6 py-5">
                            {/* Property Highlight Banner */}
                            <div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                        Property
                                    </p>

                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-[11px] font-medium text-[#15803d]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                                        Active Listing
                                    </span>
                                </div>

                                <p className="mt-1.5 text-sm font-semibold text-[#0f172a]">
                                    {selectedInquiry.property.title}
                                </p>
                            </div>

                            {/* Customer Info Grid */}
                            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                                <div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                                    <p className="text-xs font-medium text-[#64748b]">
                                        Customer Name
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-[#0f172a]">
                                        {selectedInquiry.name}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                                    <p className="text-xs font-medium text-[#64748b]">Phone</p>
                                    <a
                                        href={`tel:${selectedInquiry.phone}`}
                                        className="mt-1 inline-block text-sm font-semibold text-[#1e3a8a] transition-colors hover:text-[#1e40af] hover:underline"
                                    >
                                        {selectedInquiry.phone}
                                    </a>
                                </div>

                                <div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:col-span-2">
                                    <p className="text-xs font-medium text-[#64748b]">Email</p>

                                    {selectedInquiry.email ? (
                                        <a
                                            href={`mailto:${selectedInquiry.email}`}
                                            className="mt-1 inline-block break-all text-sm font-semibold text-[#1e3a8a] transition-colors hover:text-[#1e40af] hover:underline"
                                        >
                                            {selectedInquiry.email}
                                        </a>
                                    ) : (
                                        <p className="mt-1 text-sm italic text-[#94a3b8]">
                                            Not provided
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                                <div className="mb-2 flex items-center justify-between">
                                    <p className="text-xs font-medium text-[#64748b]">Message</p>
                                    <span className="rounded-full bg-[#ffedd5] px-2.5 py-0.5 text-[11px] font-medium text-[#c2410c]">
                                        Customer Note
                                    </span>
                                </div>

                                <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-3.5 text-sm leading-6 text-[#334155]">
                                    {selectedInquiry.message || "No additional message."}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-2.5 border-t border-[#e2e8f0] bg-[#ffffff] px-6 py-3.5">
                        <Dialog.Close className="rounded-lg border border-[#cbd5e1] bg-[#ffffff] px-4 py-2 text-xs font-medium text-[#334155] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]">
                            Close
                        </Dialog.Close>

                        {selectedInquiry?.email && (
                            <a
                                href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                                    `Re: ${selectedInquiry.property.title}`,
                                )}`}
                                className="inline-flex items-center justify-center rounded-lg bg-[#1e3a8a] px-4 py-2 text-xs font-medium text-[#ffffff] shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition-colors hover:bg-[#1e40af]"
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
