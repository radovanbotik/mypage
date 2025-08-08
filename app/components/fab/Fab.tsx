import {
  Popover,
  Transition,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import IconButton from "../ui/buttons/icon-button";
import { Github } from "@/public/images/social/github";
import { Gmail } from "@/public/images/social/gmail";
import { LinkedIn } from "@/public/images/social/linkedin";

export function FabMagnetic() {
  return (
    <Popover className="relative">
      <PopoverButton className="fixed right-10 bottom-10 text-white">
        {`ws://`}
      </PopoverButton>
      <PopoverPanel
        anchor={{ to: "top", gap: "16px" }}
        className="flex flex-col gap-4 text-white"
      >
        <IconButton className="overflow-hidden bg-white" size="lg">
          <LinkedIn className="size-9" />
        </IconButton>
        <IconButton className="overflow-hidden bg-white" size="lg">
          <Gmail className="size-9" />
        </IconButton>
        <IconButton className="overflow-hidden bg-white" size="lg">
          <Github className="size-9" />
        </IconButton>
      </PopoverPanel>
    </Popover>
  );
}
