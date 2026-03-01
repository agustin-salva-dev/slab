import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export default function LoginLoading() {
  return (
    <div className="mt-20 flex justify-center">
      <Card className="w-3/4 md:w-sm h-fit flex flex-col md:gap-4 backdrop-blur-lg bg-white/1 shadow-xl">
        <CardHeader className="flex flex-col items-center gap-4">
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="h-7 md:h-8 w-48 rounded-md" />
          <div className="flex flex-col items-center gap-2 w-full mt-1">
            <Skeleton className="h-4 md:h-4.5 w-[90%] rounded-md" />
            <Skeleton className="h-4 md:h-4.5 w-[75%] rounded-md" />
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Skeleton className="h-9 w-full rounded-3" />
          <Skeleton className="h-9 w-full rounded-3" />
        </CardBody>
      </Card>
    </div>
  );
}
