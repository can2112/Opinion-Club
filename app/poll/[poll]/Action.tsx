"use client";
import { Button } from "@/components/ui/button";
import nextClient from "@/utils/clients/nextClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

function PollAction({
  approver,
  questionId,
}: {
  approver: string | undefined;
  questionId: string;
}) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (body: {
      user: `0x${string}`;
      questionId: string;
      status: "APPROVED" | "REJECTED";
    }) => {
      const response = await nextClient.post("/api/poll-action", body);
      return response.data;
    },
    onSuccess: async (data: { success: boolean; status: string }) => {
      if (data.success) {
        if (data.status === "APPROVED") {
          toast.success(`Market approved sucessfully `);
          setTimeout(() => {
            router.push("/poll");
          }, 2000);
        } else if (data.status === "REJECTED") {
          toast.error(`Market rejected sucessfully `);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      }
    },
  });

  const { address } = useAccount();
  return (
    <div>
      {address === approver && (
        <div className="flex gap-3">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => {
              if (address) {
                mutation.mutate({
                  user: address,
                  questionId: questionId,
                  status: "APPROVED",
                });
              }
            }}
          >
            Approve
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {
              if (address) {
                mutation.mutate({
                  user: address,
                  questionId: questionId,
                  status: "REJECTED",
                });
              }
            }}
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}
export default PollAction;
