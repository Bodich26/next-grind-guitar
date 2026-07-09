import { Tabs, TabsList, TabsTrigger } from "@/shared";
import {
  useTuningStringActions,
  useTuningStringStore,
} from "../model/use-tuning-string-store";

export const StringsFilter = () => {
  const activeCount = useTuningStringStore((state) => state.activeStringsCount);
  const { setStringsCount } = useTuningStringActions();

  return (
    <Tabs
      value={String(activeCount)}
      onValueChange={(v) => setStringsCount(Number(v) as 6 | 7 | 8)}
    >
      <TabsList>
        <TabsTrigger value="6">6 Струн</TabsTrigger>
        <TabsTrigger value="7">7 Струн</TabsTrigger>
        <TabsTrigger value="8">8 Струн</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
