"use client"
import React, { Children, useEffect, useState, Suspense } from "react";
import type { ReactNode } from "react";
import * as ReactDOMServer from "react-dom/server";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import styles from "./Tabs.module.css";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// Exports
export const TabsContainer = TabsPrimitive.Root;
export const TabsList = TabsPrimitive.List;
export const TabsTrigger = TabsPrimitive.Trigger;
export const TabsContent = TabsPrimitive.Content;

export function WrapContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function TabsInner({ children, tabs }: { children: ReactNode; tabs: string[] }) {
  const childList = Children.toArray(children);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [tab, setTab] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTab(searchParams.get("tab") ?? undefined);
  }, [searchParams]);

  // Check the content inside tabs with the url and activate the right tab
  useEffect(() => {
    const matchableChildren = Children.toArray(children);

    const checkContentMatch = (url: string, pushURL: boolean) => {
      const match = url.split("#")[1];
      if (!match) return;

      let checkMatch: number | null = null;
      for (let i = 0; i < matchableChildren.length; i++) {
        const content = ReactDOMServer.renderToString(matchableChildren[i]);

        if (content.includes(match)) {
          checkMatch = i;
          break;
        }
      }

      if (checkMatch !== null) {
        if (pushURL) {
          const params = new URLSearchParams(searchParams.toString());
          params.set("tab", slugify(tabs[checkMatch]));
          const hash = url.split("#")[1];
          router.push(`${pathname}?${params.toString()}#${hash}`, {
            scroll: false,
          });
        }
        setTab(slugify(tabs[checkMatch]));
      }
    };

    const onHashChanged = (event: HashChangeEvent) => {
      checkContentMatch(event.newURL, true);
    };

    window.addEventListener("hashchange", onHashChanged);

    if (window.location.hash) {
      checkContentMatch(window.location.href, false);
    }

    return () => {
      window.removeEventListener("hashchange", onHashChanged);
    };
  }, [router, searchParams, pathname, children, tabs]);

  return (
    <TabsContainer
      value={tab}
      defaultValue={slugify(tabs[0])}
      className={styles.container}
      onValueChange={(value) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", value);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }}
    >
      <TabsList className={styles.tabList}>
        {tabs.map((title: string, index: number) => (
          <TabsTrigger
            value={slugify(title)}
            className={styles.tabTrigger}
            key={`tab-${slugify(title)}-${index}`}
          >
            {title}
          </TabsTrigger>
        ))}
      </TabsList>
      {childList.map((child, index) => (
        <TabsContent
          value={slugify(tabs[index])}
          className={styles.tabContent}
          key={`content-${slugify(tabs[index])}-${index}`}
        >
          {child}
        </TabsContent>
      ))}
    </TabsContainer>
  );
}

export function Tabs({ children, tabs }: { children: ReactNode; tabs: string[] }) {
  return (
    <Suspense>
      <TabsInner children={children} tabs={tabs} />
    </Suspense>
  );
}

const slugify = (text: string) =>
  text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
