"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { onSendMoneyAction } from "../app/lib/actions/onSendMoneyAction";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import { redirect } from "next/navigation";

export default function SendMoneyCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

  return (
    <div className="h-[84vh] ">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2 px-5">
            <TextInput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  const result = await onSendMoneyAction(
                    number,
                    Number(amount) * 100
                  );
                  {
                    result.status === 403
                      ? setShowAnimation(false)
                      : setShowAnimation(true);
                  }
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>

      {showAnimation && (
        <SendMoneyAnimation
          onClose={() => {
            setShowAnimation(false);
            redirect("/dashboard");
          }}
        />
      )}
    </div>
  );
}

const SendMoneyAnimation = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg text-center flex justify-center flex-col items-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-20 h-20 rounded-full relative bg-white border-4 border-green-500 flex items-center justify-center"
        >
          <FaCheck className="text-4xl text-green-700" />
        </motion.div>
        <p className="text-green-500 font-bold text-lg mb-5">
          Payment Successful!
        </p>
        <Button onClick={onClose}>OK</Button>
      </motion.div>
    </motion.div>
  );
};
