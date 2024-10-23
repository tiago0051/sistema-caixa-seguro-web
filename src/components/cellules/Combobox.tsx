import {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

interface ComboboxContextProps {
  close: () => void;
  triggerRef: RefObject<HTMLButtonElement>;
}

const ComboboxContext = createContext({} as ComboboxContextProps);

interface ComboboxTriggerProps {
  children?: ReactNode;
}

const ComboboxTrigger: FC<ComboboxTriggerProps> = ({ children }) => {
  const { triggerRef } = useContext(ComboboxContext);
  return (
    <PopoverTrigger asChild ref={triggerRef}>
      <Button variant="outline" role="combobox" className="justify-between">
        {children ? children : "Selecionar cliente..."}
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
  );
};

interface ComboboxItemProps {
  value?: string;
  onSelect: (valueCB: string) => void;
  children: ReactNode;
  selected: boolean;
}
const ComboboxItem: FC<ComboboxItemProps> = ({
  children,
  onSelect,
  value,
  selected,
}) => {
  const { close } = useContext(ComboboxContext);

  return (
    <CommandItem
      value={value}
      onSelect={(currentValue) => {
        onSelect(currentValue);
        close();
      }}
    >
      {children}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          selected ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
};

interface ComboboxContentProps {
  children: ReactNode;
}

const ComboboxContent: FC<ComboboxContentProps> = ({
  children,
}: ComboboxContentProps) => {
  const popoverContentRef = useRef<HTMLDivElement>(null);

  const { triggerRef } = useContext(ComboboxContext);

  useEffect(() => {
    if (triggerRef.current && popoverContentRef.current) {
      const width = triggerRef.current.clientWidth;

      popoverContentRef.current.style.width = `${width}px`;
    }
  }, []);

  return <div ref={popoverContentRef}>{children}</div>;
};

interface ComboboxProps {
  trigger: ReactElement<typeof ComboboxTrigger>;
  children: ReactElement<typeof ComboboxItem>[];
  searchEmpty: string;
  selectClean?: () => void;
}

const Combobox: FC<ComboboxProps> = ({
  children,
  trigger,
  searchEmpty,
  selectClean,
}) => {
  const popoverTriggerRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      selectClean && selectClean();
    }
  }, [isOpen]);

  return (
    <ComboboxContext.Provider
      value={{ close: () => setIsOpen(false), triggerRef: popoverTriggerRef }}
    >
      <Popover onOpenChange={(state) => setIsOpen(state)} open={isOpen}>
        {trigger}
        <PopoverContent className="p-0 w-full">
          <ComboboxContent>
            <Command>
              <CommandInput placeholder="Buscar cliente..." className="h-9" />
              <CommandEmpty>{searchEmpty}</CommandEmpty>
              <CommandList>
                <CommandGroup>{children}</CommandGroup>
              </CommandList>
            </Command>
          </ComboboxContent>
        </PopoverContent>
      </Popover>
    </ComboboxContext.Provider>
  );
};

export const ComboboxCellule = {
  Root: Combobox,
  Item: ComboboxItem,
  Trigger: ComboboxTrigger,
};
