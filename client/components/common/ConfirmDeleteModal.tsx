import Button from "@/components/forms/Button";
import Modal from "@/components/common/Modal";

export default function ConfirmDeleteModal({ open, itemName, onConfirm, onClose }: { open: boolean; itemName: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <Modal open={open} title="Confirm delete" onClose={onClose}>
      <p className="text-slate-600">Delete {itemName}? This action cannot be undone.</p>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Delete</Button>
      </div>
    </Modal>
  );
}
