import React, { useContext, forwardRef } from "react";

interface ICardContext {}

const cardContext = React.createContext<ICardContext | undefined>(undefined);

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <cardContext.Provider value={{}}>
      <div className="border border-neutral-600/40 rounded w-full p-4 max-w-md bg-neutral-800">
        {children}
      </div>
    </cardContext.Provider>
  );
};

const useCard = () => useContext(cardContext);

type CardHeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: React.ReactNode;
};

type CardFooterProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: React.ReactNode;
};

type CardContentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: React.ReactNode;
};

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      {props.children}
    </div>
  );
});

CardHeader.displayName = "CardHeader";

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      {props.children}
    </div>
  );
});

CardFooter.displayName = "CardFooter";

const CardContainer = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

CardContainer.displayName = "CardContainer";

export { Card, CardHeader, CardFooter, CardContainer };
