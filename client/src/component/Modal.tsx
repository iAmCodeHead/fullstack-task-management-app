
import React, { ReactNode, useState } from 'react';
import { FormData } from '../interfaces/task.interface';
import { TaskPriority, TaskStatus } from '../enums/task.enum';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  children: ReactNode;
  data:FormData;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, children, data }) => {
  const [formData, setFormData] = useState<FormData>({
    title: data.title,
    description: data.description,
    dueDate: data.dueDate,
    status: data.status,
    priority: data.priority,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    // onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="tm-fixed tm-inset-0 tm-overflow-y-auto">
      <div className="tm-flex tm-items-center tm-justify-center tm-min-h-screen">
        <div className="tm-fixed tm-inset-0 tm-transition-opacity" onClick={onClose}>
          <div className="tm-absolute tm-inset-0 tm-bg-black tm-opacity-50"></div>
        </div>

        <div className="tm-z-50 tm-bg-white tm-p-8 tm-max-w-xl tm-mx-xl tm-overflow-y-auto tm-rounded tm-shadow-lg">
          {children}
          <div className="tm-mt-4">
            <label className="tm-block tm-text-gray-700 tm-text-sm tm-font-bold tm-mb-2">
              Title:
              <input
                type="text"
                className="tm-mt-1 tm-p-2 tm-border tm-rounded tm-w-full"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="tm-mt-4">
            <label className="tm-block tm-text-gray-700 tm-text-sm tm-font-bold tm-mb-2">
              Status:
              <select
                className="tm-mt-1 tm-p-2 tm-border tm-rounded tm-w-full"
                defaultValue={TaskStatus.TODO}
                name='status'
                onChange={handleInputChange}
              >
                <option value={TaskStatus.TODO}>To do</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.DONE}>Done</option>
              </select>
            </label>
          </div>
          <div className="tm-mt-4">
            <label className="tm-block tm-text-gray-700 tm-text-sm tm-font-bold tm-mb-2">
              Priority:
              <select
                className="tm-mt-1 tm-p-2 tm-border tm-rounded tm-w-full"
                defaultValue={TaskPriority.LOW}
                name='priority'
                onChange={handleInputChange}
              >
                <option value={TaskPriority.LOW}>{TaskPriority.LOW}</option>
                <option value={TaskPriority.MID}>{TaskPriority.MID}</option>
                <option value={TaskPriority.HIGH}>{TaskPriority.HIGH}</option>
              </select>
            </label>
          </div>
          <div className="tm-mt-4">
            <label className="tm-block tm-text-gray-700 tm-text-sm tm-font-bold tm-mb-2">
              Description:
              <textarea
                className="tm-mt-1 tm-p-2 tm-border tm-rounded tm-w-full"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mt-4">
            <label className="tm-block tm-text-gray-700 tm-text-sm tm-font-bold tm-mb-2">
              Due Date:
              <input
                type="date"
                className="tm-mt-1 tm-p-2 tm-border tm-rounded tm-w-full"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button
            onClick={handleSave}
            className="tm-mt-4 tm-bg-blue-500 tm-text-white tm-px-4 tm-py-2 tm-rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
