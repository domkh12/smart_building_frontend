export const spinnerTheme = {
  color: {
    primary: "fill-primary",
  },
};

export const Cardtheme = {
  root: {
    base: "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
    children: "flex h-full flex-col justify-center p-0", // Changed p-6 to p-0
    horizontal: {
      off: "flex-col",
      on: "flex-col md:max-w-xl md:flex-row",
    },
    href: "hover:bg-gray-100 dark:hover:bg-gray-700",
  },
  img: {
    base: "",
    horizontal: {
      off: "rounded-t-lg",
      on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
    },
  },
};

export const TooltipTheme = {
  "base": "absolute z-10 inline-block rounded-xl text-gray-50 px-3 py-1 text-[0.8rem] font-medium shadow-sm",
  "style": {
    "dark": "bg-gray-500 dark:bg-gray-700",
  },
};
