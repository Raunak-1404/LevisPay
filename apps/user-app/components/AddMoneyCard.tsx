"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { onRampTransactions } from "../app/lib/actions/onRampTransactions";

type Bank = { name: string; redirectURL: string };

const SUPPORTED_BANKS: Bank[] = [
  {
    name: "HDFC Bank",
    redirectURL: "https://netbanking.hdfcbank.com",
  },
  {
    name: "AXIS Bank",
    redirectURL: "https://www.axisbank.com",
  },
];

export const AddMoney = () => {
  const [redirectURL, setRedirectURL] = useState(
    SUPPORTED_BANKS[0]?.redirectURL
  );

  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [amount, setAmount] = useState(0);

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(val) => {
            setAmount(Number(val));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectURL(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectURL || ""
            );

            setProvider(
              SUPPORTED_BANKS.find((x)=> x.name === value)?.name || ""
            )
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async() => {
              await onRampTransactions(provider, amount);
              window.location.href = redirectURL || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
