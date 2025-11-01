"use client";

import { IconExternalLink } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface Tool {
  id: number;
  documentId: string;
  name: string;
  description: string;
  website: string;
  tags: string[];
  createdat: string;
  popularity: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  logo?: {
    id: number;
    documentId: string;
    url: string;
    name: string;
  };
  illustration?: {
    id: number;
    documentId: string;
    url: string;
    name: string;
  };
}

export interface CardToolProps {
  tool: Tool;
  className?: string;
}

const STRAPI_URL = "http://localhost:1337";

export function CardTool({ tool, className }: CardToolProps) {
  return (
    <Card key={tool.documentId} className={`@container/card ${className ?? ""}`}>
          {tool.illustration?.url && (
            <img
              src={`${STRAPI_URL}${tool.illustration.url}`}
              alt={tool.illustration.name}
            />
          )}

          <CardHeader className="relative z-10">
            <div className="flex items-center gap-3">
              {tool.logo?.url ? (
                <img
                  src={`${STRAPI_URL}${tool.logo.url}`}
                  alt={tool.logo.name ?? tool.name}
                  className="h-12 w-12 rounded-md object-contain"
                />
              ) : (
                <div className="h-12 w-12 rounded-md bg-muted" />
              )}

              <div className="flex-1">
                <CardTitle className="text-lg font-semibold">
                  {tool.name}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {tool.website ? (
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      {new URL(tool.website).hostname}
                      <IconExternalLink className="size-4" />
                    </a>
                  ) : (
                    tool.description && (
                      <span className="whitespace-pre-line">
                        {tool.description}
                      </span>
                    )
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <div className="relative z-10 px-4 pb-4">
            {tool.description && (
              <p className="text-sm text-foreground">{tool.description}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {tool.tags?.slice(0, 3).map((t: string) => (
                <Badge key={t} variant="secondary" className="text-xs">
                  {t}
                </Badge>
              ))}
              {tool.tags && tool.tags.length > 3 && (
                <Badge className="text-xs">+{tool.tags.length - 3} more</Badge>
              )}
            </div>

            <CardFooter className="mt-4 flex items-center justify-between gap-2 text-sm">
              <div className="text-muted-foreground">
                Added {new Date(tool.createdAt).toLocaleDateString()}
              </div>
              <CardAction>
                {tool.website && (
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium"
                  >
                    Visit
                    <IconExternalLink className="size-4" />
                  </a>
                )}
              </CardAction>
            </CardFooter>
          </div>
        </Card>
  );
}