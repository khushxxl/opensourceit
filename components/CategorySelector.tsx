import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CategorySelector() {
  return (
    <Select>
      <SelectTrigger className="ring-0 w-fit focus:ring-0">
        <SelectValue placeholder="Select a Category" className="w-fit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="apple">AI</SelectItem>
          <SelectItem value="banana">Nextjs</SelectItem>
          <SelectItem value="blueberry">Vue</SelectItem>
          <SelectItem value="grapes">React Native</SelectItem>
          <SelectItem value="pineapple">Flutter</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
