"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
{
  /* import {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/Select"; */
}
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLinkSchema, type CreateLinkInput } from "@/server/schemas/link";
import { createLink } from "@/server/actions/links";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateLinkModal({ isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkInput>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      originalUrl: "",
      shortSlug: "",
      description: "",
    },
  });

  const onSubmit = async (values: CreateLinkInput) => {
    const result = await createLink(values);

    if (result.success) {
      console.log("Link created!");
      reset();
      onClose();
    } else {
      console.error(result.error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-4/5 md:w-md p-0 border-none bg-transparent shadow-none max-w-md">
        <Card>
          <CardHeader className="flex items-center gap-2.5">
            <div className="flex items-center gap-2.5">
              <DialogTitle className="text-2xl font-power-ultra">
                Create new link
              </DialogTitle>
              <Image src="/logo.webp" alt="Slab Logo" width={25} height={25} />
            </div>
            <CardDescription className="text-center">
              We will analyze the destination link to verify if it is secure.
            </CardDescription>
          </CardHeader>
          <CardBody className="flex flex-col gap-y-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-1.5">
                  <label htmlFor="destination-url" className="text-3.5">
                    Destination URL
                  </label>
                  <Input
                    id="destination-url"
                    {...register("originalUrl")}
                    placeholder="https://example.com"
                    className={
                      errors.originalUrl ? "border-my-accents-red" : ""
                    }
                    type="text"
                    disabled={isSubmitting}
                  />
                  {errors.originalUrl && (
                    <span className="text-my-accents-red text-xs">
                      {errors.originalUrl.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-y-1.5">
                  <label htmlFor="short-link" className="text-3.5">
                    Short link (opcional)
                  </label>
                  <Input
                    id="short-link"
                    {...register("shortSlug")}
                    placeholder="mylink"
                    className={
                      errors.originalUrl ? "border-my-accents-red" : ""
                    }
                    type="text"
                    disabled={isSubmitting}
                  />
                  {errors.shortSlug && (
                    <span className="text-my-accents-red text-xs">
                      {errors.shortSlug.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-y-1.5">
                  <label htmlFor="short-link" className="text-3.5">
                    Description
                  </label>
                  <Textarea
                    {...register("description")}
                    placeholder="What is this link for?"
                    className={`resize-none ${errors.originalUrl ? "border-my-accents-red" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.description && (
                    <span className="text-my-accents-red text-xs">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>
              <CardFooter className="flex justify-end gap-x-4">
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  disabled={isSubmitting}
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </CardFooter>
            </form>
            {/* <div className="flex flex-col gap-y-1.5">
                    <label htmlFor="short-link" className="text-3.5">Add tags</label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a tag" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectGroup>
                                <SelectItem value="apple">Tag</SelectItem>
                                <SelectItem value="banana">Tag 2</SelectItem>
                                <SelectItem value="blueberry">Third tag</SelectItem>
                                <SelectItem value="grapes">Tag 4</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div> */}
          </CardBody>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
