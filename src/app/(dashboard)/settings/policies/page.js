"use client";

import React, { useState } from "react";
import { initialPoliciesData } from "./policiesData";
import PolicyForm from "./PolicyForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuPlus, LuPencil } from "react-icons/lu";
import Image from "next/image";

const PoliciesPage = () => {
  const [policies, setPolicies] = useState(initialPoliciesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPolicyId, setCurrentPolicyId] = useState(null);
  const [modalData, setModalData] = useState({});

  const handleAddData = (policyId) => {
    const policy = policies.find((p) => p.id === policyId);
    setCurrentPolicyId(policyId);
    setModalData({ title: policy.title, description: "", updateDate: "" });
    setModalData({});
    setIsModalOpen(true);
  };

  const handleEditData = (policyId) => {
    const policy = policies.find((p) => p.id === policyId);
    setCurrentPolicyId(policyId);
    setModalData({
      title: policy.data.title || policy.title,
      description: policy.data.description,
      updateDate: policy.data.updateDate,
    });
    setIsModalOpen(true);
  };

  const handleSavePolicy = (newData) => {
    setPolicies((prevPolicies) =>
      prevPolicies.map((policy) => {
        if (policy.id === currentPolicyId) {
          return {
            ...policy,
            hasData: true,
            data: { ...newData },
          };
        }
        return policy;
      })
    );
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pt-4 h-full md:h-[calc(100vh-9rem)] overflow-y-auto custom-scroll">
      {policies.map((policy) => (
        <Card
          key={policy.id}
          className="w-full bg-white shadow-sm border border-(--border-admin)"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-1 border-b border-(--border-admin)">
            <CardTitle className="text-lg font-bold text-black">
              {policy.title}
            </CardTitle>
            <div>
              {!policy.hasData ? (
                <Button
                  variant="outline"
                  onClick={() => handleAddData(policy.id)}
                  className="text-secondary1 border-secondary1 gap-2 cursor-pointer"
                >
                  <Image
                    src="/assets/icon/addbutton.svg"
                    alt="Add Store"
                    width={18}
                    height={18}
                    style={{ brightness: 1, invert: 0 }}
                  />
                  <span className="text-secondary1">Add Data</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => handleEditData(policy.id)}
                  className="text-secondary1 border-secondary1  gap-2 cursor-pointer"
                >
                  <Image
                    src="/assets/icon/editbutton.svg"
                    alt="Add Store"
                    width={18}
                    height={18}
                    style={{ brightness: 1, invert: 0 }}
                  />
                  <span className="text-secondary1">Edit Data</span>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="min-h-[200px]">
            {!policy.hasData ? (
              <div className="text-center text-placeholder-color">
                No Data Available
              </div>
            ) : (
              <div className="space-y-4">
                {policy.data.title && (
                  <h3 className="text-md font-semibold text-placeholder-color">
                    {policy.data.title}
                  </h3>
                )}
                <div className="text-placeholder-color text-sm whitespace-pre-wrap leading-relaxed">
                  {policy.data.description}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <PolicyForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePolicy}
        initialData={modalData}
        sectionTitle={
          policies.find((p) => p.id === currentPolicyId)?.title || ""
        }
      />
    </div>
  );
};

export default PoliciesPage;
