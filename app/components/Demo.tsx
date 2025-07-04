"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ConfigPanel } from "./ConfigPanel";
import { DemoPanel } from "./DemoPanel";
import { SDKDebugger } from "./SDKDebugger";
import { DemoHeader } from "./DemoHeader";
import { DemoTabTrigger } from "./DemoTabTrigger";
import {
  useSDKLoggerCallCount,
  useSDKLoggerPendingCount,
} from "@/lib/sdk-logger";
import {
  IoSettingsOutline,
  IoFlashOutline,
  IoCodeSlashOutline,
  IoChevronDown,
} from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useQueryParams } from "@/lib/use-query-params";

const TABS = [
  { value: "config", icon: IoSettingsOutline, label: "Config" },
  { value: "code", icon: IoCodeSlashOutline, label: "Code" },
  { value: "debug", icon: IoFlashOutline, label: "Debug" },
] as const;

function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 sm:px-6 py-8 sm:py-12 border-b bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
          Pipedream Connect
        </h1>
      </div>
    </div>
  );
}

function DescriptionParagraph({ className }: { className?: string }) {
  return <></>;
}

function LoadingSkeleton({
  withContainer = false,
}: {
  withContainer?: boolean;
}) {
  const content = (
    <div className="p-6 space-y-6">
      <div className="space-y-3">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
      </div>
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="pt-4 border-t">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-32" />
      </div>
    </div>
  );

  return withContainer ? (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
      {content}
    </div>
  ) : (
    content
  );
}

function TabsContainer({
  activeTab,
  onTabChange,
  callCount,
  pendingCount,
  isMobile,
  className,
  tabsListClassName,
  isLoading,
}: {
  activeTab: string;
  onTabChange: (value: string) => void;
  callCount: number;
  pendingCount: number;
  isMobile?: boolean;
  className?: string;
  tabsListClassName?: string;
  isLoading?: boolean;
}) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className={cn("flex flex-col", className)}
    >
      <div className={cn("border-b", isMobile && "flex-shrink-0")}>
        <TabsList
          className={cn(
            "h-12 w-full rounded-none bg-transparent p-0",
            tabsListClassName
          )}
        >
          {TABS.map((tab) => (
            <DemoTabTrigger
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={tab.label}
              callCount={callCount}
              pendingCount={pendingCount}
              isMobile={isMobile}
            />
          ))}
        </TabsList>
      </div>

      {isLoading ? (
        <>
          <TabsContent value="config" className="m-0" forceMount as any>
            <div style={{ display: activeTab === "config" ? "block" : "none" }}>
              {isMobile ? (
                <div className="flex flex-col">
                  <LoadingSkeleton />
                  <div className="border-t">
                    <LoadingSkeleton />
                  </div>
                </div>
              ) : (
                <LoadingSkeleton />
              )}
            </div>
          </TabsContent>

          <TabsContent value="code" className="m-0" forceMount>
            <div style={{ display: activeTab === "code" ? "block" : "none" }}>
              <LoadingSkeleton />
            </div>
          </TabsContent>

          <TabsContent value="debug" className="m-0" forceMount>
            <div style={{ display: activeTab === "debug" ? "block" : "none" }}>
              <LoadingSkeleton />
            </div>
          </TabsContent>
        </>
      ) : (
        <>
          <TabsContent value="config" className="m-0" forceMount as any>
            <div style={{ display: activeTab === "config" ? "block" : "none" }}>
              {isMobile ? (
                <div className="flex flex-col">
                  <ConfigPanel />
                  <div className="border-t">
                    <DemoPanel />
                  </div>
                </div>
              ) : (
                <ConfigPanel />
              )}
            </div>
          </TabsContent>

          <TabsContent value="debug" className="m-0" forceMount>
            <div style={{ display: activeTab === "debug" ? "block" : "none" }}>
              <SDKDebugger />
            </div>
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}

export default function Demo({ isLoading = false }: { isLoading?: boolean }) {
  const { queryParams, setQueryParam } = useQueryParams();
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const callCount = useSDKLoggerCallCount();
  const pendingCount = useSDKLoggerPendingCount();

  const validTabs = ["config", "code", "debug"] as const;
  const tabFromQuery = queryParams.tab as string;
  const activeTab = validTabs.includes(tabFromQuery as any)
    ? tabFromQuery
    : "config";

  const setActiveTab = (tab: string) => {
    setQueryParam("tab", tab === "config" ? undefined : tab);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DemoHeader />

      <HeroSection>
        <div className="hidden sm:block space-y-6">
          <DescriptionParagraph className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto" />
        </div>

        <div className="sm:hidden">
          <Collapsible open={showMoreInfo} onOpenChange={setShowMoreInfo}>
            <CollapsibleTrigger className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <span>More info</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
              <div className="pt-3">
                <DescriptionParagraph className="text-sm text-gray-600" />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </HeroSection>

      <div className="md:hidden flex flex-col">
        <TabsContainer
          activeTab={activeTab}
          onTabChange={setActiveTab}
          callCount={callCount}
          pendingCount={pendingCount}
          isMobile
          tabsListClassName="justify-center"
          isLoading={isLoading}
        />
      </div>

      <div className="flex justify-center">
        <div className="flex gap-6 px-6 py-6">
          {isLoading ? (
            <LoadingSkeleton withContainer />
          ) : (
            <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
              <DemoPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
