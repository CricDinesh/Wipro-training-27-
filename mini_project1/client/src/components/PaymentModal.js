import React, { useState } from "react";
import API from "../api/api";

const PaymentModal = ({ show, onClose, onSuccess, amount }) => {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("card");

  if (!show) return null;

  const pay = () => {
    setLoading(true);
    setTimeout(async () => {
      // simulate receipt
      const receipt = `RCT-${Date.now()}`;
      // Call onSuccess with receipt to let parent save booking with receipt if needed
      if (onSuccess) await onSuccess(receipt);
      setLoading(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Make Payment</h5></div>
          <div className="modal-body">
            <p>Amount: ₹{amount}</p>
            <div className="mb-2">
              <label>Method</label>
              <select className="form-select" value={method} onChange={e => setMethod(e.target.value)}>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="netbanking">Netbanking</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-3">
                <div className="spinner-border" role="status" />
                <p className="mt-2">Processing payment...</p>
              </div>
            ) : (
              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
                <button className="btn btn-success" onClick={pay}>Pay Now</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
