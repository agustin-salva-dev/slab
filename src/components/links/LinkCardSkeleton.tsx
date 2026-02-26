import { Card, CardBody } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Separator } from "@/components/ui/Separator";

export function LinkCardSkeleton() {
  return (
    <Card className="w-full h-fit">
      <CardBody className="flex flex-col gap-y-2.5 sm:gap-y-3.5">
        <Skeleton className="block md:hidden h-4 w-16" />
        <Skeleton className="h-4 w-20" />
        <section className="flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4 w-full">
            <h3 className="flex items-center gap-2 w-1/2">
              <span className="text-my-secondary pr-1">/</span>
              <Skeleton className="h-6 w-3/4" />
            </h3>

            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <div className="flex items-center w-1/2 justify-end gap-2 md:gap-4">
            <Skeleton className="hidden md:block h-4 w-20" />
            <Separator orientation="vertical" className="h-5" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
          </div>
        </section>

        <Skeleton className="w-3/5 md:w-4/5 h-4" />
        <div className="flex justify-between">
          <Skeleton className="w-4/6 md:w-3/5 h-4" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardBody>
    </Card>
  );
}
