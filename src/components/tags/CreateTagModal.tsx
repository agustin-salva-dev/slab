"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createTagSchema, type CreateTagInput } from "@/server/schemas/tags";
import { useCreateTag } from "@/hooks/tags/useCreateTag";
import { Tag } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTagModal({ isOpen, onClose }: Props) {
  const form = useForm<CreateTagInput>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const { handleCreate, isCreating } = useCreateTag();

  const onSubmit = async (values: CreateTagInput) => {
    await handleCreate(values, () => {
      onClose();
      reset();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-4/5 md:w-md p-0 border-none bg-transparent shadow-none max-w-md">
        <Card>
          <CardHeader className="flex items-center gap-2.5">
            <div className="flex items-center gap-2.5">
              <DialogTitle className="text-2xl font-power-ultra">
                Create new tag
              </DialogTitle>
              <Tag size={20} />
            </div>
            <CardDescription className="text-center">
              Create a custom tag to organize your links.
            </CardDescription>
          </CardHeader>
          <CardBody className="flex flex-col gap-y-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-1.5">
                  <label htmlFor="name" className="text-sm text-my-secondary">
                    Tag Name
                  </label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="e.g. Work, Social, Important"
                    disabled={isCreating}
                    className={errors.name ? "border-my-accents-red" : ""}
                  />
                  {errors.name && (
                    <span className="text-sm text-my-accents-red">
                      {errors.name.message as string}
                    </span>
                  )}
                </div>
              </div>
              <CardFooter className="flex justify-end gap-x-4 mt-6 p-0">
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  disabled={isCreating}
                  onClick={() => onClose()}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create"}
                </Button>
              </CardFooter>
            </form>
          </CardBody>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
