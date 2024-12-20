import React, { useEffect, useState } from "react";
import "./RequestMethodForm.css";

export type RequestMethodConditionInput = {
  type: "include" | "exclude";
  requestMethods: string[];
};

const requestMethodsList = [
  "get",
  "post",
  "put",
  "delete",
  "patch",
  "options",
  "head",
];

interface RequestMethodFormProps {
  initialCondition: RequestMethodConditionInput;
  onChange: (condition: RequestMethodConditionInput) => void;
  setSaveEnabled: (enabled: boolean) => void;
}

export const RequestMethodForm = ({
  initialCondition,
  onChange,
  setSaveEnabled,
}: RequestMethodFormProps) => {
  const [condition, setCondition] =
    useState<RequestMethodConditionInput>(initialCondition);

  useEffect(() => {
    setSaveEnabled(true);
  }, []);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCondition = {
      ...condition,
      type: e.target.value as "include" | "exclude",
    };
    setCondition(newCondition);
    onChange(newCondition);
  };

  const handleRequestMethodChange = (method: string) => {
    const updatedMethods = condition.requestMethods.includes(method)
      ? condition.requestMethods.filter((m) => m !== method)
      : [...condition.requestMethods, method];
    const newCondition = { ...condition, requestMethods: updatedMethods };
    setCondition(newCondition);
    onChange(newCondition);
  };

  return (
    <>
      <div className="form-group">
        <label>
          <input
            type="radio"
            name="type"
            value="include"
            checked={condition.type === "include"}
            onChange={handleTypeChange}
          />
          Include
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="exclude"
            checked={condition.type === "exclude"}
            onChange={handleTypeChange}
          />
          Exclude
        </label>
      </div>
      <div className="form-group">
        <label>Request Methods:</label>
        <div className="checkbox-group">
          {requestMethodsList.map((method) => (
            <label key={method} className="checkbox-label">
              <input
                type="checkbox"
                checked={condition.requestMethods.includes(method)}
                onChange={() => handleRequestMethodChange(method)}
              />
              {method.toUpperCase()}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};
