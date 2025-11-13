import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  Code,
  FileJson,
  Settings,
  Text,
  File,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  FileExplorerProps,
  ProjectFile,
  TreeNodeProps,
  VirtualNode,
} from "@/type/fileExplorerType";

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  onSelect,
  selectedPath,
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = selectedPath === node.path;

  const isFolder = node.type === "folder";

  const toggle = () => {
    if (isFolder) {
      const newState = !isOpen;
      setIsOpen(newState);
      onToggle?.();
    }
  };

  const handleClick = () => {
    if (isFolder) {
      toggle();
    } else {
      onSelect(node.path, node.content);
    }
  };

  const getIcon = (fileName: string, isFolder: boolean, isOpen?: boolean) => {
    if (isFolder) {
      return isOpen ? (
        <FolderOpen className="h-4 w-4" />
      ) : (
        <Folder className="h-4 w-4" />
      );
    }

    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    switch (ext) {
      case "md":
      case "txt":
        return <Text className="h-4 w-4" />;
      case "json":
        return <FileJson className="h-4 w-4" />;
      case "ts":
      case "tsx":
      case "js":
      case "jsx":
      case "html":
      case "css":
        return <Code className="h-4 w-4" />;
      case "config":
      case "env":
        return <Settings className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1 px-2 cursor-pointer rounded-md hover:bg-accent ${
          isSelected ? "bg-accent font-medium" : ""
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
        tabIndex={0}
        role={isFolder ? "button" : "option"}
        aria-expanded={isFolder ? isOpen : undefined}
        aria-selected={isSelected}
      >
        {isFolder && (
          <ChevronRight
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
        {getIcon(node.name, isFolder, isOpen)}
        <span className="text-sm truncate">{node.name}</span>
      </div>

      {isFolder && isOpen && (
        <div>
          {Object.entries(node.children)
            .sort((a, b) => {
              // Folders first, then files
              const aIsFolder = a[1].type === "folder";
              const bIsFolder = b[1].type === "folder";
              if (aIsFolder && !bIsFolder) return -1;
              if (!aIsFolder && bIsFolder) return 1;
              return a[0].localeCompare(b[0]);
            })
            .map(([_, childNode]) => (
              <TreeNode
                key={childNode.path}
                node={childNode}
                level={level + 1}
                onSelect={onSelect}
                selectedPath={selectedPath}
              />
            ))}
        </div>
      )}
    </div>
  );
};

// Helper: build virtual tree from flat list
function buildTreeFromFiles(files: ProjectFile[]): VirtualNode[] {
  const root: Record<string, VirtualNode> = {};

  for (const file of files) {
    const parts = file?.name?.split("/");
    let current = root;

    for (let i = 0; i < parts?.length; i++) {
      const part = parts[i];
      const currentPath = parts?.slice(0, i + 1).join("/");

      if (i === parts.length - 1) {
        // It's a file
        current[part] = {
          type: "file",
          name: part,
          path: file.name,
          content: file.content,
        };
      } else {
        // It's a folder (may already exist)
        if (!current[part]) {
          current[part] = {
            type: "folder",
            name: part,
            path: currentPath,
            children: {},
          };
        }
        current = (current[part] as { children: Record<string, VirtualNode> })
          .children;
      }
    }
  }

  return Object.entries(root)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([_, node]) => node);
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ files }) => {
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");

  // Build tree once
  const treeNodes = useMemo(() => buildTreeFromFiles(files), [files]);

  // Find default file: README.md > package.json > first file
  const defaultFile = useMemo(() => {
    const readme = files.find((f) => f.name === "README.md");
    if (readme) return readme;

    const pkg = files.find((f) => f.name === "package.json");
    if (pkg) return pkg;

    return files[0]; // fallback
  }, [files]);

  useEffect(() => {
    if (defaultFile) {
      setSelectedPath(defaultFile.name);
      setFileContent(defaultFile.content);
    }
  }, [defaultFile]);

  const handleSelect = (path: string, content: string) => {
    setSelectedPath(path);
    setFileContent(content);
  };

  const fileName = selectedPath?.split("/")?.pop() || "untitled";

  return (
    <PanelGroup
      direction="horizontal"
      className="h-full border rounded-md overflow-hidden"
    >
      <Panel defaultSize={30} minSize={15}>
        <div className="border-r h-full flex flex-col">
          <div className="p-3 border-b font-medium text-sm">Project Files</div>
          <ScrollArea className="flex-1">
            <div className="py-2">
              {treeNodes.map((node) => (
                <TreeNode
                  key={node.path}
                  node={node}
                  level={0}
                  onSelect={handleSelect}
                  selectedPath={selectedPath}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </Panel>

      <PanelResizeHandle className="w-2 bg-border hover:bg-accent flex items-center justify-center group">
        <div className="w-1 h-6 bg-muted rounded-full group-hover:bg-foreground/20" />
      </PanelResizeHandle>

      <Panel defaultSize={70}>
        <div className="h-full flex flex-col">
          <div className="p-3 border-b flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm truncate">{fileName}</span>
          </div>
          <ScrollArea className="flex-1 p-4 bg-muted/30">
            <pre className="text-sm whitespace-pre-wrap font-mono">
              {fileContent || "No content to display"}
            </pre>
          </ScrollArea>
        </div>
      </Panel>
    </PanelGroup>
  );
};
