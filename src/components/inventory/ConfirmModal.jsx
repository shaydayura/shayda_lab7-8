function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="confirm-modal">
        <h2>{title}</h2>
        <p>{message}</p>

        <div className="modal-actions">
          <button className="danger-button" onClick={onConfirm}>
            Так, видалити
          </button>

          <button className="secondary-button" onClick={onCancel}>
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;